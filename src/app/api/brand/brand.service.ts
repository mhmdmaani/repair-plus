import { randomUUID } from 'crypto';
import { Brand, PrismaClient } from 'prisma/prisma-client';
import { v4 as uuidv4 } from 'uuid';

export class BrandService {
  static async getAll() {
    const prisma = new PrismaClient();
    const results = await prisma.brand.findMany({
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
    const currentIsAsc = isAsc !== 'desc' ? 'asc' : 'desc';
    const skip = page * perPage;
    const brands = await prisma.brand.findMany({
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
        [currentSortBy]: isAsc === 'true' ? 'asc' : 'desc',
      },
      skip: skip,
      take: parseInt(perPage),
    });
    const total = await prisma.brand.count({
      where: {
        isActive: true,
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
    const result = await prisma.brand.findUnique({
      where: { id },
      include: {
        devices: {
          where: {
            isActive: true,
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

  static async getBrandTree(id: string | null) {
    if (!id) {
      return null;
    }

    const prisma = new PrismaClient();
    const result = await prisma.brand.findUnique({
      where: { id },
      include: {
        devices: {
          where: {
            isActive: true,
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
    const inserted = await prisma.brand.create({
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
    const updated = await prisma.brand.update({
      where: { id },
      data,
    });
    await prisma.$disconnect();
    return updated;
  }

  static async delete(id: string) {
    const prisma = new PrismaClient();

    // get all devices of this brand
    const devices = await prisma.device.findMany({
      where: {
        brandId: id,
      },
      orderBy: {
        order: 'desc',
      },
    });
    // get all repairs of these devices
    const repairs = await prisma.repair.findMany({
      where: {
        isActive: true,
        deviceId: {
          in: devices.map((d) => d.id),
        },
      },
      orderBy: {
        order: 'desc',
      },
    });
    // delete all repairs of these devices
    await prisma.repair.deleteMany({
      where: {
        id: {
          in: repairs.map((r) => r.id),
        },
      },
    });
    // delete all devices of this brand
    await prisma.device.deleteMany({
      where: {
        brandId: id,
      },
    });
    // delete the brand
    const deleted = await prisma.brand.delete({
      where: { id },
    });
    await prisma.$disconnect();
    return deleted;
  }

  static async getFeatured() {
    const prisma = new PrismaClient();
    const results = await prisma.brand.findMany({
      where: {
        isFeatured: true,
        isActive: true,
      },
      orderBy: {
        order: 'desc',
      },
    });
    await prisma.$disconnect();
    console.log('results', results);
    return results;
  }
}
