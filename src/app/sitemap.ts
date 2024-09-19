import { FRONT_END_URL } from '@/api/settings';
import { MetadataRoute } from 'next';
import { PrismaClient } from 'prisma/prisma-client';

// Function to fetch dynamic brand data
async function getAllBrands() {
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

async function getAllCategories() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      updatedAt: true,
    },
    orderBy: {
      order: 'desc',
    },
  });
  await prisma.$disconnect();
  return categories;
}

async function getAllModels() {
  const prisma = new PrismaClient();
  const models = await prisma.device.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      updatedAt: true,
    },
    orderBy: {
      order: 'desc',
    },
  });
  await prisma.$disconnect();
  return models;
}

async function getAllRepairs() {
  const prisma = new PrismaClient();
  const repairs = await prisma.repair.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      updatedAt: true,
    },
    orderBy: {
      order: 'desc',
    },
  });
  await prisma.$disconnect();
  return repairs;
}

// Function to generate the sitemap, combining static and dynamic entries
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static links
  const staticLinks = [
    {
      url: `${FRONT_END_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${FRONT_END_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${FRONT_END_URL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${FRONT_END_URL}/fix/brands`,
      lastModified: new Date(),
    },
    {
      url: `${FRONT_END_URL}/fix/categories`,
      lastModified: new Date(),
    },
    {
      url: `${FRONT_END_URL}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${FRONT_END_URL}/privacy`,
      lastModified: new Date(),
    },

    {
      url: `${FRONT_END_URL}/faq`,
      lastModified: new Date(),
    },
  ];

  // Dynamic links from the database
  const brands = await getAllBrands();
  const brandsLink = brands.map((brand) => ({
    url: `${FRONT_END_URL}/fix/brand/${brand.id}`,
    lastModified: brand.updatedAt,
  }));

  const categories = await getAllCategories();
  const categoriesLink = categories.map((category) => ({
    url: `${FRONT_END_URL}/fix/category/${category.id}`,
    lastModified: category.updatedAt,
  }));

  const models = await getAllModels();
  const modelsLink = models.map((model) => ({
    url: `${FRONT_END_URL}/fix/model/${model.id}`,
    lastModified: model.updatedAt,
  }));

  const repairs = await getAllRepairs();
  const repairsLink = repairs.map((repair) => ({
    url: `${FRONT_END_URL}/fix/repair/${repair.id}`,
    lastModified: repair.updatedAt,
  }));

  // Combine static and dynamic links
  return [
    ...staticLinks,
    ...brandsLink,
    ...categoriesLink,
    ...modelsLink,
    ...repairsLink,
  ];
}
