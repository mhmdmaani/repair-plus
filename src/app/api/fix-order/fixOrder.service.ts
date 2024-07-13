import { FixOrder, PrismaClient } from 'prisma/prisma-client';

export class FixOrderService {
  static async getAll() {
    const prisma = new PrismaClient();
    const results = await prisma.fixOrder.findMany();
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
    const currentSortBy = !sortBy || sortBy === '' ? 'order' : sortBy;
    const currentIsAsc = isAsc !== 'desc' ? 'asc' : 'desc';
    const skip = page * perPage;
    const brands = await prisma.fixOrder.findMany({
      where: {
        OR:
          searchKey && searchKey !== ''
            ? [
                {
                  user: {
                    name: {
                      contains: searchKey,
                      mode: 'insensitive',
                    },
                  },
                },
                {
                  reference: isNaN(parseInt(searchKey))
                    ? undefined
                    : parseInt(searchKey),
                },
              ]
            : undefined,
      },
      orderBy: {
        [currentSortBy]: isAsc === 'true' ? 'asc' : 'desc',
      },
      skip: skip,
      take: parseInt(perPage),
    });
    const total = await prisma.fixOrder.count({
      where: {
        OR:
          searchKey && searchKey !== ''
            ? [
                {
                  user: {
                    name: {
                      contains: searchKey,
                      mode: 'insensitive',
                    },
                  },
                },
                {
                  reference: isNaN(parseInt(searchKey))
                    ? undefined
                    : parseInt(searchKey),
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

  static async insert(data: FixOrder) {
    const prisma = new PrismaClient();
    const inserted = await prisma.fixOrder.create({
      data,
    });
    await prisma.$disconnect();
    return inserted;
  }

  static async update(id: string, data: FixOrder) {
    const prisma = new PrismaClient();
    const updated = await prisma.fixOrder.update({
      where: { id },
      data,
    });
    await prisma.$disconnect();
    return updated;
  }

  static async delete(id: string) {
    const prisma = new PrismaClient();
    const deleted = await prisma.fixOrder.delete({
      where: { id },
    });
    await prisma.$disconnect();
    return deleted;
  }

  static async getById(id: string | null) {
    if (!id) {
      return null;
    }

    const prisma = new PrismaClient();
    const result = await prisma.fixOrder.findUnique({
      where: { id },
      include: {
        repairs: true,
        user: true,
      },
    });
    await prisma.$disconnect();
    return result;
  }
}
