import { NextResponse } from 'next/server';
import { BrandService } from '@/app/api/brand/brand.service';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get('id');
  const res = await BrandService.getById(id);
  return NextResponse.json(res);
}
