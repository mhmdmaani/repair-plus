import BrandPageAlt from '@/modules/brands/BrandPageAlt';
import { PrismaClient } from 'prisma/prisma-client';
import React from 'react';

import type { Metadata, ResolvingMetadata } from 'next';

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
  const brand = await prisma.brand.findFirst({
    where: {
      id: id,
    },
  });

  await prisma.$disconnect();
  return {
    title: `Repair Plus | ${brand?.name}`,
    description:
      'Repair Plus offers professional and fast repair services for mobile phones, tablets, laptops, and other electronic devices. Our expert technicians provide reliable fixes for all major brands, ensuring your gadgets are back in perfect working order. Convenient, affordable, and trusted across Sweden.',
    keywords: `${brand?.name}, Repair Plus, fix, electronics, gadgets, Sweden, Trollhattan`,
  };
}

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
          order: 'desc',
        },
      },
    },
  });

  await prisma.$disconnect();

  return (
    <>
      <BrandPageAlt
        brandId={params.id}
        brand={brand}
        categories={brand?.categories || []}
      />
    </>
  );
}

export default Brand;
