import { NextResponse } from 'next/server';
import { RepairService } from '../repair.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchKey = searchParams.get('searchKey');
  const page = searchParams.get('page');
  const perPage = searchParams.get('perPage');
  const sortBy = searchParams.get('sortBy');
  const isAsc = searchParams.get('isAsc');
  const deviceId = searchParams.get('deviceId');
  const isAdmin = searchParams.get('isAdmin');
  const categoryId = searchParams.get('categoryId');
  const brandId = searchParams.get('brandId');
  const res = await RepairService.searchAll({
    searchKey,
    page,
    perPage,
    sortBy,
    isAsc,
    deviceId,
    isAdmin,
    categoryId,
    brandId,
  });
  return NextResponse.json(res);
}
