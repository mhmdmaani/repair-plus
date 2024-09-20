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
    const prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });

    console.log('dt', dt);
    const { searchKey, page, perPage, sortBy, isAsc, deviceId, isAdmin } = dt;
    const skip = parseInt(page) * parseInt(perPage);
    const currentSort = sortBy ? sortBy : 'order';
    const currentIsASC = isAsc ? isAsc : false;

    const whereClause: any = {
      isActive: isAdmin === 'true' ? undefined : true,
    };

    if (deviceId) {
      whereClause.deviceId = deviceId;
    }

    if (searchKey && searchKey !== '') {
      whereClause.OR = [
        {
          name: {
            contains: searchKey,
            mode: 'insensitive',
          },
        },
        {
          device: {
            name: {
              contains: searchKey,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    const repairs = await prisma.repair.findMany({
      where: whereClause,
      orderBy:
        currentSort && currentIsASC
          ? { [currentSort]: currentIsASC === 'true' ? 'asc' : 'desc' }
          : undefined,

      skip: skip,
      take: parseInt(perPage),
    });

    const total = await prisma.repair.count({
      where: whereClause,
    });

    await prisma.$disconnect();

    return {
      data: repairs,
      total,
    };
  }

  static async searchAll(dt: {
    searchKey: any;
    page: any;
    perPage: any;
    sortBy?: any;
    isAsc?: any;
    deviceId?: string | null;
    isAdmin?: any;
    categoryId?: string | null;
    brandId?: string | null;
  }) {
    const prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
    let devicesIds: string[] = [];
    if (dt.deviceId) {
      devicesIds = [dt.deviceId];
    } else if (dt.categoryId) {
      const catDevices = await prisma.device.findMany({
        where: {
          categoryId: dt.categoryId,
        },
      });
      devicesIds = catDevices.map((d) => d.id);
    } else if (dt.brandId) {
      const brandDevices = await prisma.device.findMany({
        where: {
          brandId: dt.brandId,
        },
      });
      devicesIds = brandDevices.map((d) => d.id);
    }

    const { searchKey, page, perPage, sortBy, isAsc, isAdmin } = dt;
    const skip = parseInt(page) * parseInt(perPage);
    const currentSort = sortBy ? sortBy : 'order';
    const currentIsASC = isAsc ? isAsc : false;

    const whereClause: any = {
      isActive: isAdmin === 'true' ? undefined : true,
    };

    if (devicesIds.length > 0) {
      whereClause.deviceId = {
        in: devicesIds,
      };
    }

    if (searchKey && searchKey !== '') {
      whereClause.OR = [
        {
          name: {
            contains: searchKey,
            mode: 'insensitive',
          },
        },
        {
          device: {
            name: {
              contains: searchKey,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    const repairs = await prisma.repair.findMany({
      where: whereClause,
      include: {
        device: true,
      },
      orderBy:
        currentSort && currentIsASC
          ? { [currentSort]: currentIsASC === 'true' ? 'asc' : 'desc' }
          : undefined,

      skip: skip,
      take: parseInt(perPage),
    });

    const total = await prisma.repair.count({
      where: whereClause,
    });

    await prisma.$disconnect();
    console.log('repairs', repairs);
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
        order: data.order,
        image: data.image,
        description: data.description,
        buyPrice: data.buyPrice,
        sellPrice: data.sellPrice,
        repairingPrice: data.repairingPrice,
        repairingTimeMinutes: data.repairingTimeMinutes,
        quantity: data.quantity,
        quality: data.quality,
        isActive: data.isActive,
        momsPercent: data.momsPercent,
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
        order: data.order,
        description: data.description,
        buyPrice: data.buyPrice,
        sellPrice: data.sellPrice,
        repairingPrice: data.repairingPrice,
        repairingTimeMinutes: data.repairingTimeMinutes,
        quantity: data.quantity,
        quality: data.quality,
        isActive: data.isActive,
        momsPercent: data.momsPercent,
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
        order: 'desc',
      },
    });
    await prisma.$disconnect();

    console.log('repairs', repairs);
    return repairs;
  }

  static async importRepairs(data: { targetId: string; sourceId: string }) {
    const prisma = new PrismaClient();
    const repairs = await prisma.repair.findMany({
      where: {
        deviceId: data.sourceId,
      },
    });

    const inserted = await prisma.repair.createMany({
      data: repairs.map((r) => ({
        id: randomUUID(),
        name: r.name,
        deviceId: data.targetId,
        order: r.order,
        image: r.image,
        description: r.description,
        buyPrice: r.buyPrice,
        sellPrice: r.sellPrice,
        repairingPrice: r.repairingPrice,
        repairingTimeMinutes: r.repairingTimeMinutes,
        quantity: r.quantity,
        quality: r.quality,
        isActive: false,
        momsPercent: r.momsPercent,
      })),
    });

    return inserted;
  }
}
