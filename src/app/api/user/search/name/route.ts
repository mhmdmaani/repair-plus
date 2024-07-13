import { NextResponse } from 'next/server';
import { UserService } from '../../user.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchKey = searchParams.get('name');
  const res = await UserService.getSearchByName(searchKey);
  return NextResponse.json(res);
}
