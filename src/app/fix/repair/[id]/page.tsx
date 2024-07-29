import RepairPage from '@/modules/repair/RepairPage';
import { PrismaClient } from 'prisma/prisma-client';
import React from 'react';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function Repair({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const prisma = new PrismaClient();
  const repair = await prisma.repair.findFirst({
    where: {
      id: params.id,
    },
    include: {
      device: {
        include: {
          brand: true,
        },
      },
    },
  });

  await prisma.$disconnect();

  return <RepairPage repair={repair} />;
}

export default Repair;
