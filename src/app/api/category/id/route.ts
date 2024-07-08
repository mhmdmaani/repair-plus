import { NextResponse } from 'next/server';
import { CategoryService } from '../category.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get('id');
  const res = await CategoryService.getById(id);
  return NextResponse.json(res);
}
