import { NextRequest, NextResponse } from 'next/server';
import { ReviewService } from '../review.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const res = await ReviewService.getActive();
  return NextResponse.json(res);
}
