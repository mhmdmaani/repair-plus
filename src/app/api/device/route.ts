import { NextRequest, NextResponse } from 'next/server';
import { DeviceService } from './device.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const res = await DeviceService.getAll();
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const created = await DeviceService.insert(body);
  return NextResponse.json(created);
}

// update
export async function PUT(request: NextRequest) {
  const body = await request.json();

  const updated = await DeviceService.update(body.id, body);
  return NextResponse.json(updated);
}

// delete

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const deleted = await DeviceService.delete(id as string);
  return NextResponse.json(deleted);
}
