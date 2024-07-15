import { randomUUID } from 'crypto';
import { Repair, PrismaClient } from 'prisma/prisma-client';

export class RepairService {
  static async getAll() {
    const prisma = new PrismaClient();
    const results = await prisma.repair.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    await prisma.$disconnect();
    return results;
  }

  static async getById(id: string | null) {
    if (!id) {
      return null;
    }

    const prisma = new PrismaClient();
    const result = await prisma.repair.findUnique({
      where: { id },
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
    deviceId?: string | null;
    isAdmin?: any;
  }) {
    const prisma = new PrismaClient();
    const { searchKey, page, perPage, sortBy, isAsc, deviceId } = dt;
    const skip = page * perPage;
    console.log('deviceId', deviceId);
    const repairs = await prisma.repair.findMany({
      where: {
        isActive: dt.isAdmin === 'true' ? undefined : true,
        deviceId: deviceId || '',
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
        [sortBy]: isAsc === 'true' ? 'asc' : 'desc',
      },
      skip: skip,
      take: parseInt(perPage),
    });
    const total = await prisma.repair.count({
      where: {
        isActive: dt.isAdmin === 'true' ? undefined : true,
        deviceId: dt.deviceId ? dt.deviceId : undefined,
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
      data: repairs,
      total,
    };
  }

  static async insert(data: Repair) {
    const prisma = new PrismaClient();
    const inserted = await prisma.repair.create({
      data: {
        id: randomUUID(),
        name: data.name,
        deviceId: data.deviceId,
        image: data.image,
        description: data.description,
        buyPrice: data.buyPrice,
        sellPrice: data.sellPrice,
        repairingPrice: data.repairingPrice,
        repairingTimeMinutes: data.repairingTimeMinutes,
        quantity: data.quantity,
        quality: data.quality,
        isActive: data.isActive,
      },
    });
    await prisma.$disconnect();
    return inserted;
  }

  static async update(id: string, data: Repair) {
    const prisma = new PrismaClient();
    const updated = await prisma.repair.update({
      where: { id },
      data: {
        name: data.name,
        deviceId: data.deviceId,
        image: data.image,
        description: data.description,
        buyPrice: data.buyPrice,
        sellPrice: data.sellPrice,
        repairingPrice: data.repairingPrice,
        repairingTimeMinutes: data.repairingTimeMinutes,
        quantity: data.quantity,
        quality: data.quality,
        isActive: data.isActive,
      },
    });
    await prisma.$disconnect();
    return updated;
  }

  static async delete(id: string) {
    const prisma = new PrismaClient();
    const deleted = await prisma.repair.delete({
      where: { id },
    });
    await prisma.$disconnect();
    return deleted;
  }

  // searchByDevices;
  static async searchByDevices({
    searchKey,
    devices,
  }: {
    searchKey: string | undefined | null;
    devices: string[];
  }) {
    console.log('searchByDevices', searchKey, devices);
    const prisma = new PrismaClient();
    const repairs = await prisma.repair.findMany({
      where: {
        deviceId: {
          in: devices,
        },
        name:
          searchKey === null ||
          searchKey === undefined ||
          searchKey.length === 0
            ? undefined
            : {
                contains: searchKey,
                mode: 'insensitive',
              },
      },
      orderBy: {
        name: 'asc',
      },
    });
    await prisma.$disconnect();

    console.log('repairs', repairs);
    return repairs;
  }
}
