import React from 'react';
import CategoryPage from '@/modules/categories/CategoryPage';
import Appbar from '@/shared/layout/Appbar';
import TopHeader from '@/modules/home/TopHeader';
import ModelPage from '@/modules/Model/ModelPage';
import { PrismaClient } from 'prisma/prisma-client';

async function Model({ id }: any) {
  const prisma = new PrismaClient();
  const repairs = await prisma.repair.findMany({
    where: {
      deviceId: id,
    },
  });
  await prisma.$disconnect();

  return (
    <>
      <TopHeader />
      <Appbar />
      <ModelPage repairs={repairs} />
    </>
  );
}

export default Model;
