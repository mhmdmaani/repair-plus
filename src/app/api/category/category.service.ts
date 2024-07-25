import { randomUUID } from 'crypto';
import { Brand, PrismaClient } from 'prisma/prisma-client';
import { v4 as uuidv4 } from 'uuid';

export class CategoryService {
  static async getAll() {
    const prisma = new PrismaClient();
    const results = await prisma.category.findMany({
      orderBy: {
        order: 'desc',
      },
    });
    await prisma.$disconnect();
    return results;
  }

  static async getSearch(dt: {
    searchKey: any;
    page: any;
    perPage: any;
    sortBy?: any;
    isAsc?: any;
    isAdmin?: any;
  }) {
    const prisma = new PrismaClient();
    const { searchKey, page, perPage, sortBy, isAsc } = dt;
    const currentSortBy = !sortBy || sortBy === '' ? 'order' : sortBy;
    const skip = page * perPage;
    const brands = await prisma.category.findMany({
      where: {
        isActive: dt.isAdmin === 'true' ? undefined : true,
        OR:
          searchKey && searchKey !== ''
            ? [
                {
                  name: {
                    contains: searchKey,
                    mode: 'insensitive',
                  },
                },
              ]
            : undefined,
      },
      orderBy: {
        [currentSortBy]: isAsc !== 'false' ? 'asc' : 'desc',
      },
      skip: skip,
      take: parseInt(perPage),
    });
    const total = await prisma.category.count({
      where: {
        isActive: dt.isAdmin === 'true' ? undefined : true,
        OR:
          searchKey && searchKey !== ''
            ? [
                {
                  name: {
                    contains: searchKey,
                    mode: 'insensitive',
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
    const result = await prisma.category.findUnique({
      where: { id },
      include: {
        devices: {
          orderBy: {
            order: 'asc',
          },
        },
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
    const result = await prisma.category.findUnique({
      where: { id },
      include: {
        devices: {
          include: {
            repairs: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
    await prisma.$disconnect();
    return result;
  }

  static async insert(data: Brand) {
    const prisma = new PrismaClient();
    const inserted = await prisma.category.create({
      data: {
        ...data,
        id: uuidv4(),
      },
    });
    await prisma.$disconnect();
    return inserted;
  }

  static async update(id: string, data: Brand) {
    const prisma = new PrismaClient();
    const updated = await prisma.category.update({
      where: { id },
      data,
    });
    await prisma.$disconnect();
    return updated;
  }

  static async delete(id: string) {
    const prisma = new PrismaClient();
    // get all devices of this category
    const devices = await prisma.device.findMany({
      where: {
        categoryId: id,
      },
      orderBy: {
        order: 'desc',
      },
    });
    // get all repairs of these devices
    const repairs = await prisma.repair.findMany({
      where: {
        deviceId: {
          in: devices.map((device) => device.id),
        },
      },
      orderBy: {
        order: 'desc',
      },
    });
    // delete all repairs
    await prisma.repair.deleteMany({
      where: {
        id: {
          in: repairs.map((repair) => repair.id),
        },
      },
    });

    // delete all devices
    await prisma.device.deleteMany({
      where: {
        id: {
          in: devices.map((device) => device.id),
        },
      },
    });

    const deleted = await prisma.category.delete({
      where: { id },
    });
    await prisma.$disconnect();
    return deleted;
  }

  static async getFeatured() {
    const prisma = new PrismaClient();
    const results = await prisma.category.findMany({
      where: {
        isFeatured: true,
        isActive: true,
      },
      orderBy: {
        order: 'desc',
      },
    });
    await prisma.$disconnect();
    return results;
  }

  static async getByBrandId(id: string | null) {
    if (!id) {
      return null;
    }
    const prisma = new PrismaClient();
    const results = await prisma.category.findMany({
      where: {
        brandId: id,
        isActive: true,
      },
      orderBy: {
        order: 'desc',
      },
    });
    await prisma.$disconnect();
    return results;
  }
}
