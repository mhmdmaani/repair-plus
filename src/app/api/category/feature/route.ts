import { NextResponse } from 'next/server';
import { CategoryService } from '../category.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  const res = await CategoryService.getFeatured();
  return NextResponse.json(res);
}
