import { NextResponse } from 'next/server';
import { DeviceService } from '../device.service';
export async function GET() {
  const res = await DeviceService.getFeatured();
  return NextResponse.json(res);
}
