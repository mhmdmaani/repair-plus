// app/api/documents/route.ts
import { NextRequest, NextResponse } from 'next/server';

import {
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

const Bucket = process.env.AMPLIFY_BUCKET;
const Region = process.env.AWS_REGION;
const s3 = new S3Client({
  region: Region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

// endpoint to get the list of files in the bucket
export async function GET() {
  const response = await s3.send(new ListObjectsCommand({ Bucket }));
  return NextResponse.json(response?.Contents ?? []);
}

// endpoint to upload a file to the bucket
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll('file') as File[]; // Assuming these are coming as Files

  // Map each file to a Promise that uploads the file and then returns the URL
  const uploadPromises = files.map(async (file) => {
    const Body = await file.arrayBuffer();
    const Key = file.name;
    const ContentType = file.type || 'application/octet-stream';
    // Construct the URL for the uploaded file
    const fileUrl = `https://${Bucket}.s3.${Region}.amazonaws.com/${Key}`;

    // Attempt to send the command to S3
    await s3.send(
      new PutObjectCommand({
        Bucket,
        Key,
        Body: new Uint8Array(Body),
        ContentType,
      })
    );

    // Return the file URL after uploading
    return fileUrl;
  });

  // Wait for all the uploads to complete and collect the URLs
  const fileUrls = await Promise.all(uploadPromises);

  // Return the file URLs in the response
  return NextResponse.json({ urls: fileUrls });
}
