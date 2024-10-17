import CategoryPage from '@/modules/categories/CategoryPage';
import React from 'react';
import Appbar from '@/shared/layout/Appbar';
import TopHeader from '@/modules/home/TopHeader';
import Footer from '@/shared/layout/Footer';
import { PrismaClient } from 'prisma/prisma-client';
import { flattenCategories } from '@/utils/flatenCategories';
import { Metadata, ResolvingMetadata } from 'next';

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
  const category = await prisma.category.findUnique({
    where: {
      id: params.id,
    },
    include: {
      children: {
        orderBy: {
          order: 'desc',
        },
        include: {
          children: {
            orderBy: {
              order: 'desc',
            },
            include: {
              children: {
                orderBy: {
                  order: 'desc',
                },
                include: {
                  children: {
                    orderBy: {
                      order: 'desc',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const flatedCategories = flattenCategories(category?.children);
  const generatedKeywords = flatedCategories.map((cat) => cat.name).join(', ');

  await prisma.$disconnect();
  return {
    title: `Repair Plus | ${category?.name}`,
    description:
      'Repair Plus offers professional and fast repair services for mobile phones, tablets, laptops, and other electronic devices. Our expert technicians provide reliable fixes for all major brands, ensuring your gadgets are back in perfect working order. Convenient, affordable, and trusted across Sweden.',
    keywords: `Repair Plus, ${category?.name}, ${generatedKeywords}, About Us, laga, mobil, surfplatta, dator, elektronik, reparation, service, fix, electronics, gadgets, Sweden, Trollhattan`,
    openGraph: {
      title: `Repair Plus | ${category?.name}`,
      description:
        'Repair Plus offers professional and fast repair services for mobile phones, tablets, laptops, and other electronic devices. Our expert technicians provide reliable fixes for all major brands, ensuring your gadgets are back in perfect working order.',
      images: [
        {
          url: category?.image || '/default-image.jpg', // Fallback image if brand image is unavailable
          width: 1200,
          height: 630,
          alt: `Image of ${category?.name}`,
        },
      ],
    },
  };
}

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
      children: {
        where: {
          isActive: true,
        },
        orderBy: {
          order: 'desc',
        },
        include: {
          children: {
            where: {
              isActive: true,
            },
            orderBy: {
              order: 'desc',
            },
            include: {
              children: {
                where: {
                  isActive: true,
                },
                orderBy: {
                  order: 'desc',
                },
                include: {
                  children: {
                    where: {
                      isActive: true,
                    },
                    orderBy: {
                      order: 'desc',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  await prisma.$disconnect();

  const flettenedCategories = flattenCategories(category?.children);

  return (
    <>
      <CategoryPage category={category} subCategories={flettenedCategories} />
    </>
  );
}

export default Category;
