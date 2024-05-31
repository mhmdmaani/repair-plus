import { NextResponse } from 'next/server';
import { RepairService } from '../repair.service';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get('id');
  const res = await RepairService.getById(id);
  return NextResponse.json(res);
}
