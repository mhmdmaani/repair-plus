import BrandsPage from '@/modules/brands/BrandsPage';
import { Prisma, PrismaClient } from 'prisma/prisma-client';
import React from 'react';
import Appbar from '@/shared/layout/Appbar';
import TopHeader from '@/modules/home/TopHeader';
import { styled } from '@mui/material';

async function Brands() {
  const prisma = new PrismaClient();
  const brands = await prisma.brand.findMany();
  await prisma.$disconnect();

  return (
    <>
      <TopHeader />
      <Appbar />
      <BrandsPage brands={brands} />
    </>
  );
}

export default Brands;
