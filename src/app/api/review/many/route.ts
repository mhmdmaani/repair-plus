import { NextRequest, NextResponse } from 'next/server';
import { ReviewService } from '../review.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const res = await ReviewService.importFromGoogleMaps();
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const created = await ReviewService.createMany(body.data);
  return NextResponse.json(created);
}
