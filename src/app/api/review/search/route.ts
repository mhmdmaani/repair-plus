import { ReviewService } from './../review.service';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchKey = searchParams.get('searchKey');
  const page = searchParams.get('page');
  const perPage = searchParams.get('perPage');
  const sortBy = searchParams.get('sortBy');
  const isAsc = searchParams.get('isAsc');
  const isAdmin = searchParams.get('isAdmin');
  const res = await ReviewService.getSearch({
    searchKey,
    page,
    perPage,
    sortBy,
    isAsc,
    isAdmin,
  });
  return NextResponse.json(res);
}
