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
  });

  const activeBrands = await prisma.brand.findMany({
    where: {
      isActive: true,
    },
  });

  await prisma.$disconnect();

  return (
    <>
      <CategoryPage
        categoryId={params.id}
        category={category}
        brands={activeBrands}
      />
    </>
  );
}

export default Category;
