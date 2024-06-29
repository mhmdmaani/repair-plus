import { Repair, PrismaClient } from 'prisma/prisma-client';

export class RepairService {
  static async getAll() {
    const prisma = new PrismaClient();
    const results = await prisma.repair.findMany();
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
  }) {
    const prisma = new PrismaClient();
    const { searchKey, page, perPage, sortBy, isAsc } = dt;
    const skip = page * perPage;
    const repairs = await prisma.repair.findMany({
      where: {
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
      orderBy: {
        [sortBy]: isAsc === 'true' ? 'asc' : 'desc',
      },
      skip: skip,
      take: parseInt(perPage),
    });
    const total = await prisma.repair.count({
      where: {
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
}
