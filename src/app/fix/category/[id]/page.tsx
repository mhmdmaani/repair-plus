import CategoryPage from '@/modules/categories/CategoryPage';
import React from 'react';
import Appbar from '@/shared/layout/Appbar';
import TopHeader from '@/modules/home/TopHeader';
import Footer from '@/shared/layout/Footer';
import { PrismaClient } from 'prisma/prisma-client';
import { flattenCategories } from '@/utils/flatenCategories';

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
        orderBy: {
          order: 'asc',
        },
        include: {
          children: {
            orderBy: {
              order: 'asc',
            },
            include: {
              children: {
                orderBy: {
                  order: 'asc',
                },
                include: {
                  children: {
                    orderBy: {
                      order: 'asc',
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
