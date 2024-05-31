import { NextRequest, NextResponse } from 'next/server';
import { BrandService } from './brand.service';

export async function GET(req: Request) {
  const res = await BrandService.getAll();
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const created = await BrandService.insert(body);
  return NextResponse.json(created);
}

// update
export async function PUT(request: NextRequest) {
  const body = await request.json();

  const updated = await BrandService.update(body.id as string, body);
  return NextResponse.json(updated);
}

// delete

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const deleted = await BrandService.delete(id as string);
  return NextResponse.json(deleted);
}
