import { Device, PrismaClient } from 'prisma/prisma-client';

export class DeviceService {
  static async getAll() {
    const prisma = new PrismaClient();
    const results = await prisma.device.findMany();
    await prisma.$disconnect();
    return results;
  }

  static async getById(id: string | null) {
    if (!id) {
      return null;
    }
    const prisma = new PrismaClient();
    const result = await prisma.device.findUnique({
      where: { id },
      include: {
        repairs: true,
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
    const result = await prisma.device.findUnique({
      where: { id },
      include: {
        repairs: true,
      },
    });
    await prisma.$disconnect();
    return result;
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
    const devices = await prisma.device.findMany({
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
    const total = await prisma.device.count({
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
      data: devices,
      total,
    };
  }

  static async insert(data: Device) {
    const prisma = new PrismaClient();
    const inserted = await prisma.device.create({
      data,
    });
    await prisma.$disconnect();
    return inserted;
  }

  static async update(id: string, data: Device) {
    const prisma = new PrismaClient();
    const updated = await prisma.device.update({
      where: { id },
      data,
    });
    await prisma.$disconnect();
    return updated;
  }

  static async delete(id: string) {
    const prisma = new PrismaClient();
    const deleted = await prisma.device.delete({
      where: { id },
    });
    await prisma.$disconnect();
    return deleted;
  }
}
