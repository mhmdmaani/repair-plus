import { NextResponse } from 'next/server';
import { SendEmailService } from './sendEmail.service';

export async function POST(request: Request) {
  const body = await request.json();
  const created = await SendEmailService.sendEmail(body);
  return NextResponse.json(created);
}
