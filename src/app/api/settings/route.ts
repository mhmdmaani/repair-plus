import { NextResponse } from 'next/server';
import { SettingsService } from './settings.service';

export async function GET() {
  const res = await SettingsService.getSettings();
  return NextResponse.json(res);
}
export async function POST(request: Request) {
  const body = await request.json();

  const created = await SettingsService.changeSettings(body);
  return NextResponse.json(created);
}
