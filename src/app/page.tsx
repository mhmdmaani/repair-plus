import HomePage from '@/modules/home/HomePage';
import { PrismaClient } from 'prisma/prisma-client';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function Home() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    include: {
      devices: {
        where: {
          isActive: true,
          isFeatured: true,
        },
        orderBy: {
          order: 'desc',
        },
      },
    },
  });
  const brands = await prisma.brand.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    orderBy: {
      order: 'desc',
    },
  });

  const activeBrands = await prisma.brand.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      order: 'desc',
    },
  });

  const activeReviews = await prisma.review.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  await prisma.$disconnect();

  return (
    <HomePage
      categories={categories}
      featuredBrands={brands}
      activeBrands={activeBrands}
      reviews={activeReviews}
    />
  );
}
