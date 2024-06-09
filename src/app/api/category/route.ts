import { CategoryService } from './category.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request) {
  const res = await CategoryService.getAll();
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const created = await CategoryService.insert(body);
  return NextResponse.json(created);
}

// update
export async function PUT(request: NextRequest) {
  const body = await request.json();

  const updated = await CategoryService.update(body.id as string, body);
  return NextResponse.json(updated);
}

// delete

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const deleted = await CategoryService.delete(id as string);
  return NextResponse.json(deleted);
}
