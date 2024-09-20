import { NextRequest, NextResponse } from 'next/server';
import { RepairService } from '../repair.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const created = await RepairService.importRepairs(body);
  return NextResponse.json(created);
}
