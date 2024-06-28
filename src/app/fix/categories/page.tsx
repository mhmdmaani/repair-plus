import CategoriesPage from '@/modules/categories/CategoriesPage';
import TopHeader from '@/modules/home/TopHeader';
import Appbar from '@/shared/layout/Appbar';
import { PrismaClient } from 'prisma/prisma-client';
import React from 'react';

async function Categories() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany();
  await prisma.$disconnect();
  return (
    <>
      <TopHeader />
      <Appbar />
      <CategoriesPage categories={categories} />
    </>
  );
}

export default Categories;
