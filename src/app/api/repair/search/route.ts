import { NextResponse } from 'next/server';
import { RepairService } from '../repair.service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchKey = searchParams.get('searchKey');
  const page = searchParams.get('page');
  const perPage = searchParams.get('perPage');
  const sortBy = searchParams.get('sortBy');
  const isAsc = searchParams.get('isAsc');
  const res = await RepairService.getSearch({
    searchKey,
    page,
    perPage,
    sortBy,
    isAsc,
  });
  return NextResponse.json(res);
}
