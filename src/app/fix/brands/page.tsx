import BrandsPage from '@/modules/brands/BrandsPage';
import { Prisma, PrismaClient } from 'prisma/prisma-client';
import React from 'react';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function Brands() {
  const prisma = new PrismaClient();
  const brands = await prisma.brand.findMany({
    where: {
      isActive: true,
    },
  });
  await prisma.$disconnect();

  return (
    <>
      <BrandsPage brands={brands} />
    </>
  );
}

export default Brands;
