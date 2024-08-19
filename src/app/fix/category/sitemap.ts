import { FRONT_END_URL } from '@/api/settings';
import { MetadataRoute } from 'next';
import { PrismaClient } from 'prisma/prisma-client';

async function getAll() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      order: 'desc',
    },
  });
  await prisma.$disconnect();
  return categories;
}
export async function generateSitemaps() {
  const categories = await getAll();
  return categories;
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const categories = await getAll();
  return categories.map((category) => ({
    url: `${FRONT_END_URL}/fix/category/${category.id}`,
    lastModified: category.updatedAt,
  }));
}
