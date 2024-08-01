import CategoryPage from '@/modules/categories/CategoryPage';
import React from 'react';
import Appbar from '@/shared/layout/Appbar';
import TopHeader from '@/modules/home/TopHeader';
import Footer from '@/shared/layout/Footer';
import { PrismaClient } from 'prisma/prisma-client';

async function Category({
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
    include: {
      devices: {
        orderBy: {
          order: 'desc',
        },
      },
    },
  });

  const activeBrands = await prisma.brand.findMany({
    where: {
      isActive: true,
    },
  });

  await prisma.$disconnect();

  return (
    <>
      <CategoryPage category={category} />
    </>
  );
}

export default Category;
