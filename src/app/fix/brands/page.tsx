import BrandsPage from '@/modules/brands/BrandsPage';
import { Metadata, ResolvingMetadata } from 'next';
import { Prisma, PrismaClient } from 'prisma/prisma-client';
import React from 'react';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const prisma = new PrismaClient();
  const brands = await prisma.brand.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      order: 'desc',
    },
  });

  await prisma.$disconnect();

  const generatedKeywords = brands.map((brand) => brand.name).join(', ');
  return {
    title: `Repair Plus | Brands`,
    description:
      'Repair Plus offers professional and fast repair services for mobile phones, tablets, laptops, and other electronic devices. Our expert technicians provide reliable fixes for all major brands, ensuring your gadgets are back in perfect working order. Convenient, affordable, and trusted across Sweden.',
    keywords: ` Repair Plus, Repair, ${generatedKeywords}`,
  };
}

async function Brands() {
  const prisma = new PrismaClient();
  const brands = await prisma.brand.findMany({
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
      <BrandsPage brands={brands} />
    </>
  );
}

export default Brands;
