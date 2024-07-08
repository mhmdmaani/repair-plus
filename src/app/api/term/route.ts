import { NextRequest, NextResponse } from 'next/server';
import { TermService } from './Term.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const res = await TermService.get();
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const created = await TermService.create(body);
  return NextResponse.json(created);
}
