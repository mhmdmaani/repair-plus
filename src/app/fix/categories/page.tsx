import CategoriesPage from '@/modules/categories/CategoriesPage';
import { PrismaClient } from 'prisma/prisma-client';
import React from 'react';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function Categories() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      order: 'desc',
    },
  });
  await prisma.$disconnect();
  return (
    <>
      <CategoriesPage categories={categories} />
    </>
  );
}

export default Categories;
