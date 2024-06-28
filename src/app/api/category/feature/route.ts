import { NextResponse } from 'next/server';
import { CategoryService } from '../category.service';
export async function GET() {
  const res = await CategoryService.getFeatured();
  return NextResponse.json(res);
}
