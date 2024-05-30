import { NextRequest, NextResponse } from 'next/server';
import { OfferService } from '@/app/api/offer/offer.service';
import bcrypt from 'bcrypt';
import { PrismaClient } from 'prisma/prisma-client';

export async function POST(request: NextRequest) {
  const adminEmail = process.env.ADMIN_EMAIL || '';
  const adminPassword = process.env.ADMIN_PASSWORD || '';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const prisma = new PrismaClient();
  const admin = await prisma.admin.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Admin',
    },
  });
  prisma.$disconnect();
  return NextResponse.json(admin);
}
