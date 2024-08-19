import RepairPage from '@/modules/repair/RepairPage';
import { Metadata, ResolvingMetadata } from 'next';
import { PrismaClient } from 'prisma/prisma-client';
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
  const repair = await prisma.repair.findFirst({
    where: {
      id: params.id,
    },
    include: {
      device: {
        include: {
          brand: true,
        },
      },
    },
  });

  await prisma.$disconnect();
  return {
    title: `Repair Plus | ${repair?.name}`,
    description:
      'Repair Plus offers professional and fast repair services for mobile phones, tablets, laptops, and other electronic devices. Our expert technicians provide reliable fixes for all major brands, ensuring your gadgets are back in perfect working order. Convenient, affordable, and trusted across Sweden.',
    keywords: `${repair?.name}, ${repair?.device?.name}, ${repair?.device?.brand?.name}, Repair Plus, fix, electronics, gadgets, Sweden, Trollhattan`,
  };
}

async function Repair({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const prisma = new PrismaClient();
  const repair = await prisma.repair.findFirst({
    where: {
      id: params.id,
    },
    include: {
      device: {
        include: {
          brand: true,
        },
      },
    },
  });

  await prisma.$disconnect();

  return <RepairPage repair={repair} />;
}

export default Repair;
