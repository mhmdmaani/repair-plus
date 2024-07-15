import { NextRequest, NextResponse } from 'next/server';
import { UserService } from './user.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const res = await UserService.getAll();
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const created = await UserService.insert(body);
  return NextResponse.json(created);
}

// update
export async function PUT(request: NextRequest) {
  const body = await request.json();

  const updated = await UserService.update(body.id as string, body);
  return NextResponse.json(updated);
}

// delete

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const deleted = await UserService.delete(id as string);
  return NextResponse.json(deleted);
}
