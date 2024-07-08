import { CategoryService } from './../category.service';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get('id');
  const res = await CategoryService.getBrandTree(id);
  return NextResponse.json(res);
}
