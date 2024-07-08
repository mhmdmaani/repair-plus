import { NextResponse } from 'next/server';
import { DeviceService } from '../device.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  const res = await DeviceService.getFeatured();
  return NextResponse.json(res);
}
