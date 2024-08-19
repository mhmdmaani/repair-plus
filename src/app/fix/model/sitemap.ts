import { FRONT_END_URL } from '@/api/settings';
import { MetadataRoute } from 'next';
import { PrismaClient } from 'prisma/prisma-client';

async function getAll() {
  const prisma = new PrismaClient();
  const devices = await prisma.device.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      order: 'desc',
    },
  });
  await prisma.$disconnect();
  return devices;
}
export async function generateSitemaps() {
  const devices = await getAll();
  return devices;
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const devices = await getAll();
  return devices.map((model) => ({
    url: `${FRONT_END_URL}/fix/model/${model.id}`,
    lastModified: model.updatedAt,
  }));
}
