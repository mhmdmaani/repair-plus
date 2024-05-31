import { NextResponse } from 'next/server';
import { DeviceService } from '../device.service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchKey = searchParams.get('searchKey');
  const page = searchParams.get('page');
  const perPage = searchParams.get('perPage');
  const sortBy = searchParams.get('sortBy');
  const isAsc = searchParams.get('isAsc');
  const brandId = searchParams.get('brandId');
  const res = await DeviceService.getSearch({
    searchKey,
    page,
    perPage,
    sortBy,
    isAsc,
    brandId,
  });
  return NextResponse.json(res);
}
