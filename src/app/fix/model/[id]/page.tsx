import React from 'react';
import ModelPage from '@/modules/Model/ModelPage';
import { PrismaClient } from 'prisma/prisma-client';
import { Metadata, ResolvingMetadata } from 'next';

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
  const device = await prisma.device.findFirst({
    where: {
      id: id,
    },
    include: {
      repairs: {
        where: {
          isActive: true,
        },
        orderBy: {
          order: 'desc',
        },
      },
    },
  });

  const generatedKeywords = device?.repairs
    .map((repair) => repair.name)
    .join(', ');

  const previousImages = device?.repairs?.map((repair) => repair.image) as any;

  await prisma.$disconnect();
  return {
    title: `Repair Plus | ${device?.name}`,
    description:
      'Repair Plus offers professional and fast repair services for mobile phones, tablets, laptops, and other electronic devices. Our expert technicians provide reliable fixes for all major brands, ensuring your gadgets are back in perfect working order. Convenient, affordable, and trusted across Sweden.',
    keywords: `${device?.name}, ${generatedKeywords}, Repair Plus, fix, electronics, gadgets, Sweden, Trollhattan`,
    openGraph: {
      images: previousImages
        ? [device?.image || '', ...previousImages]
        : [device?.image || ''],
    },
  };
}

async function Model({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const prisma = new PrismaClient();
  const repairs = await prisma.repair.findMany({
    where: {
      deviceId: params.id,
      isActive: true,
    },
    orderBy: {
      order: 'desc',
    },
  });
  await prisma.$disconnect();

  return <ModelPage repairs={repairs} deviceId={params.id} />;
}

export default Model;
