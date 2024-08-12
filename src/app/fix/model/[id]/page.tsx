import React from 'react';
import ModelPage from '@/modules/Model/ModelPage';
import { PrismaClient } from 'prisma/prisma-client';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function Model({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const prisma = new PrismaClient();
  const repairs = await prisma.repair.findMany({
    where: {
      deviceId: params.id,
      isActive: true,
    },
    orderBy: {
      order: 'desc',
    },
  });
  await prisma.$disconnect();

  return <ModelPage repairs={repairs} deviceId={params.id} />;
}

export default Model;
