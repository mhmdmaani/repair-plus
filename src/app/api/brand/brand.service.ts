import { Brand, PrismaClient } from 'prisma/prisma-client';

export class BrandService {
  static async getAll() {
    const prisma = new PrismaClient();
    const results = await prisma.brand.findMany();
    await prisma.$disconnect();
    return results;
  }

  static async getSearch(dt: {
    searchKey: any;
    page: any;
    perPage: any;
    sortBy?: any;
    isAsc?: any;
  }) {
    const prisma = new PrismaClient();
    const { searchKey, page, perPage, sortBy, isAsc } = dt;
    const skip = page * perPage;
    const brands = await prisma.brand.findMany({
      where: {
        OR:
          searchKey && searchKey !== ''
            ? [
                {
                  name: {
                    contains: searchKey,
                  },
                },
              ]
            : undefined,
      },
      orderBy: {
        [sortBy]: isAsc === 'true' ? 'asc' : 'desc',
      },
      skip: skip,
      take: parseInt(perPage),
    });
    const total = await prisma.brand.count({
      where: {
        OR:
          searchKey && searchKey !== ''
            ? [
                {
                  name: {
                    contains: searchKey,
                  },
                },
              ]
            : undefined,
      },
    });
    prisma.$disconnect();
    return {
      data: brands,
      total,
    };
  }

  static async getById(id: string | null) {
    if (!id) {
      return null;
    }

    const prisma = new PrismaClient();
    const result = await prisma.brand.findUnique({
      where: { id },
      include: {
        devices: true,
      },
    });
    await prisma.$disconnect();
    return result;
  }

  static async getBrandTree(id: string | null) {
    if (!id) {
      return null;
    }

    const prisma = new PrismaClient();
    const result = await prisma.brand.findUnique({
      where: { id },
      include: {
        devices: {
          include: {
            repairs: true,
          },
        },
      },
    });
    await prisma.$disconnect();
    return result;
  }

  static async insert(data: Brand) {
    const prisma = new PrismaClient();
    const inserted = await prisma.brand.create({
      data,
    });
    await prisma.$disconnect();
    return inserted;
  }

  static async update(id: string, data: Brand) {
    const prisma = new PrismaClient();
    const updated = await prisma.brand.update({
      where: { id },
      data,
    });
    await prisma.$disconnect();
    return updated;
  }

  static async delete(id: string) {
    const prisma = new PrismaClient();
    const deleted = await prisma.brand.delete({
      where: { id },
    });
    await prisma.$disconnect();
    return deleted;
  }
}
