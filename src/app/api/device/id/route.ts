import { NextResponse } from 'next/server';
import { DeviceService } from '../device.service';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get('id');
  const res = await DeviceService.getById(id);
  return NextResponse.json(res);
}
