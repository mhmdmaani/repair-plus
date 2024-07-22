import { NextResponse } from 'next/server';
import { CategoryService } from '../category.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const brandId = searchParams.get('brandId');
  const res = await CategoryService.getByBrandId(brandId);
  return NextResponse.json(res);
}
