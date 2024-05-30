import { NextRequest, NextResponse } from 'next/server';
import { SubscriptionService } from './Subscription.service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchKey = searchParams.get('searchKey');
  const page = searchParams.get('page');
  const perPage = searchParams.get('perPage');
  const sortBy = searchParams.get('sortBy');
  const isAsc = searchParams.get('isAsc');
  const res = await SubscriptionService.getAll({
    searchKey,
    page,
    perPage,
    sortBy,
    isAsc,
  });
  return NextResponse.json(res);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const updated = await SubscriptionService.update(body.id, body);
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  const deleted = await SubscriptionService.delete(body.id);

  return NextResponse.json(deleted);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const created = await SubscriptionService.create(body);
  return NextResponse.json(created);
}
