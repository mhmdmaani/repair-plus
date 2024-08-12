import { NextResponse } from 'next/server';
import { ItemService } from '../item.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  console.log('searchParams', searchParams);
  const searchKey = searchParams.get('searchKey');
  const devices = searchParams.getAll('devices[]');
  const res = await ItemService.searchByDevices({
    searchKey,
    devices,
  });
  return NextResponse.json(res);
}
