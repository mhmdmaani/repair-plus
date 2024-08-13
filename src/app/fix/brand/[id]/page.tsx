import BrandPage from '@/modules/brands/BrandPage';
import BrandPageAlt from '@/modules/brands/BrandPageAlt';
import { PrismaClient } from 'prisma/prisma-client';
import React from 'react';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function Brand({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const prisma = new PrismaClient();
  const brand = await prisma.brand.findFirst({
    where: {
      id: params.id,
    },
    include: {
      categories: {
        where: {
          isActive: true,
          parentId: null,
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  await prisma.$disconnect();

  return (
    <BrandPageAlt
      brandId={params.id}
      brand={brand}
      categories={brand?.categories || []}
    />
  );
}

export default Brand;
