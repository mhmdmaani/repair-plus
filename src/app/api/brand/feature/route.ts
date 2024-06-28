import { NextResponse } from 'next/server';
import { BrandService } from '@/app/api/brand/brand.service';

export async function GET() {
  const res = await BrandService.getFeatured();
  return NextResponse.json(res);
}
