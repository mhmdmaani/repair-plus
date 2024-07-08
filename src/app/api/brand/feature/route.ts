import { NextResponse } from 'next/server';
import { BrandService } from '@/app/api/brand/brand.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  const res = await BrandService.getFeatured();
  return NextResponse.json(res);
}
