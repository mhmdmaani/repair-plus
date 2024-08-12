import CategoryDevices from '@/modules/admin/categories/devices/CategoryDevices';
import { PrismaClient } from 'prisma/prisma-client';
import React from 'react';

async function CategoryDevicesPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const prisma = new PrismaClient();
  const category = await prisma.category.findUnique({
    where: {
      id: params.id,
    },
  });

  await prisma.$disconnect();

  return <CategoryDevices category={category} />;
}

export default CategoryDevicesPage;
