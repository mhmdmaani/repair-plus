import { NextResponse } from 'next/server';
import { DeviceService } from '../device.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get('id');
  const res = await DeviceService.getBrandTree(id);
  return NextResponse.json(res);
}
