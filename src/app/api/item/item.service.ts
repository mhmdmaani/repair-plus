import { randomUUID } from 'crypto';
import { Repair, PrismaClient, Item } from 'prisma/prisma-client';

export class ItemService {
  static async getAll() {
    const prisma = new PrismaClient();
    const results = await prisma.item.findMany({
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
    const result = await prisma.item.findUnique({
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
    modelId?: string | null;
    isAdmin?: any;
  }) {
    const prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });

    console.log('dt', dt);
    const { searchKey, page, perPage, sortBy, isAsc, modelId, isAdmin } = dt;
    const skip = parseInt(page) * parseInt(perPage);
    const currentSort = sortBy ? sortBy : 'order';
    const currentIsASC = isAsc ? isAsc : false;

    const whereClause: any = {
      isActive: isAdmin === 'true' ? undefined : true,
    };

    if (modelId) {
      whereClause.modelId = modelId;
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
          model: {
            name: {
              contains: searchKey,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    const repairs = await prisma.item.findMany({
      where: whereClause,
      orderBy:
        currentSort && currentIsASC
          ? { [currentSort]: currentIsASC === 'true' ? 'asc' : 'desc' }
          : undefined,

      skip: skip,
      take: parseInt(perPage),
    });

    const total = await prisma.item.count({
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
    modelId?: string | null;
    isAdmin?: any;
    categoryId?: string | null;
    brandId?: string | null;
  }) {
    const prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
    let devicesIds: string[] = [];
    if (dt.modelId) {
      devicesIds = [dt.modelId];
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
      whereClause.devices = {
        some: {
          id: {
            in: devicesIds,
          },
        },
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
          model: {
            name: {
              contains: searchKey,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    const repairs = await prisma.item.findMany({
      where: whereClause,
      include: {
        devices: true,
      },
      orderBy:
        currentSort && currentIsASC
          ? { [currentSort]: currentIsASC === 'true' ? 'asc' : 'desc' }
          : undefined,

      skip: skip,
      take: parseInt(perPage),
    });

    const total = await prisma.item.count({
      where: whereClause,
    });

    await prisma.$disconnect();
    console.log('repairs', repairs);
    return {
      data: repairs,
      total,
    };
  }

  static async insert(data: any) {
    const prisma = new PrismaClient();
    const { categories, devices, ...rest } = data;
    const inserted = await prisma.item.create({
      data: {
        ...rest,
        id: randomUUID(),
        devices: {
          connect: devices.map((id: string) => ({ id })),
        },
        categories: {
          connect: categories.map((id: string) => ({ id })),
        },
      },
    });
    await prisma.$disconnect();
    return inserted;
  }

  static async update(id: string, data: Item) {
    const prisma = new PrismaClient();
    const updated = await prisma.item.update({
      where: { id },
      data,
    });
    await prisma.$disconnect();
    return updated;
  }

  static async delete(id: string) {
    const prisma = new PrismaClient();
    const deleted = await prisma.item.delete({
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
    const repairs = await prisma.item.findMany({
      where: {
        devices: {
          some: {
            id: {
              in: devices,
            },
          },
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
}
