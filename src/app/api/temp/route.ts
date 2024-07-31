import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from 'prisma/prisma-client';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(req: Request) {
  const prisma = new PrismaClient();
  const iphoneRepairs = await prisma.device.findFirst({
    where: {
      id: 'd680d4e4-a0df-4946-bdc4-a7007172c041',
    },
    include: {
      repairs: true,
    },
  });
  if (!iphoneRepairs) {
    return NextResponse.json({ error: 'No repairs found for this device' });
  }
  // copy repairs to other devices
  const allDevices = await prisma.device.findMany({
    where: {
      NOT: {
        id: 'd680d4e4-a0df-4946-bdc4-a7007172c041',
      },
    },
  });
  allDevices.forEach(async (device) => {
    iphoneRepairs.repairs.forEach(async (repair) => {
      await prisma.repair.create({
        data: {
          name: repair.name,
          image: repair.image,
          description: repair.description,
          buyPrice: repair.buyPrice,
          sellPrice: repair.sellPrice,
          repairingPrice: repair.repairingPrice,
          repairingTimeMinutes: repair.repairingTimeMinutes,
          quantity: repair.quantity,
          quality: repair.quality,
          createdAt: repair.createdAt,
          updatedAt: repair.updatedAt,
          isActive: repair.isActive,
          color: repair.color,
          momsPercent: repair.momsPercent,
          device: {
            connect: {
              id: device.id,
            },
          },
        },
      });
    });
  });
  await prisma.$disconnect();
  return NextResponse.json(iphoneRepairs);
}
