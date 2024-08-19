import { FRONT_END_URL } from '@/api/settings';
import { MetadataRoute } from 'next';
import { PrismaClient } from 'prisma/prisma-client';

async function getAll() {
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
  return brands;
}
export async function generateSitemaps() {
  const brands = await getAll();
  return brands;
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const brands = await getAll();
  return brands.map((brand) => ({
    url: `${FRONT_END_URL}/fix/brand/${brand.id}`,
    lastModified: brand.updatedAt,
  }));
}
