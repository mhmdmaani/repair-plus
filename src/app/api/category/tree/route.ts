import { CategoryService } from './../category.service';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get('id');
  const res = await CategoryService.getBrandTree(id);
  return NextResponse.json(res);
}
