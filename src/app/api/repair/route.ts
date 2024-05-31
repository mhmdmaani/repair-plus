import { NextRequest, NextResponse } from 'next/server';
import { RepairService } from './repair.service';

export async function GET(req: Request) {
  const res = await RepairService.getAll();
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const created = await RepairService.insert(body);
  return NextResponse.json(created);
}

// update
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const body = await request.json();

  const updated = await RepairService.update(id as string, body);
  return NextResponse.json(updated);
}

// delete

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const deleted = await RepairService.delete(id as string);
  return NextResponse.json(deleted);
}
