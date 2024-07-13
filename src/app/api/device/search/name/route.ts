import { NextResponse } from 'next/server';
import { DeviceService } from '../../device.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  const res = await DeviceService.getSearchByName(name);
  return NextResponse.json(res);
}
