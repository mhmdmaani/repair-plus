import { FRONT_END_URL } from '@/api/settings';
import { MetadataRoute } from 'next';
import { PrismaClient } from 'prisma/prisma-client';

async function getAll() {
  const prisma = new PrismaClient();
  const repairs = await prisma.repair.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      order: 'desc',
    },
    take: 50000,
  });
  await prisma.$disconnect();
  return repairs;
}
export async function generateSitemaps() {
  const repairs = await getAll();
  return repairs;
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const repairs = await getAll();
  return repairs.map((repair) => ({
    url: `${FRONT_END_URL}/fix/repair/${repair.id}`,
    lastModified: repair.updatedAt,
  }));
}
