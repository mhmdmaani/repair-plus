import { NextRequest, NextResponse } from 'next/server';
import { FixOrderService } from './fixOrder.service';

export async function GET(req: Request) {
  const res = await FixOrderService.getAll();
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const created = await FixOrderService.insert(body);
  return NextResponse.json(created);
}

// update
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const body = await request.json();

  const updated = await FixOrderService.update(id as string, body);
  return NextResponse.json(updated);
}

// delete

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const deleted = await FixOrderService.delete(id as string);
  return NextResponse.json(deleted);
}
