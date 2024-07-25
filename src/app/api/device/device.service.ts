import { Device, PrismaClient } from 'prisma/prisma-client';

export class DeviceService {
  static async getAll() {
    const prisma = new PrismaClient();
    const results = await prisma.device.findMany({
      orderBy: {
        order: 'desc',
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
    const result = await prisma.device.findUnique({
      where: { id },
      include: {
        repairs: {
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
    const result = await prisma.device.findUnique({
      where: { id },
      include: {
        repairs: {
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

  static async getSearch(dt: {
    searchKey: any;
    page: any;
    perPage: any;
    sortBy?: any;
    isAsc?: any;
    brandId?: any;
    categoryId?: any;
    isAdmin?: any;
  }) {
    const prisma = new PrismaClient();
    const { searchKey, page, perPage, sortBy, isAsc, brandId } = dt;
    const currentSortBy = sortBy || 'order';
    console.log(currentSortBy, 'sort by');
    const currentIsAsc = isAsc || 'true';
    const skip = page * perPage;
    const devices = await prisma.device.findMany({
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
        brandId: brandId && brandId?.length > 0 ? brandId : undefined,
        categoryId:
          dt.categoryId && dt.categoryId?.length > 0
            ? dt.categoryId
            : undefined,
      },
      include: {
        brand: true,
        category: true,
      },
      orderBy: {
        [currentSortBy]: currentIsAsc === 'true' ? 'asc' : 'desc',
      },
      skip: skip,
      take: parseInt(perPage),
    });
    const total = await prisma.device.count({
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
      data: devices,
      total,
    };
  }

  static async insert(data: Device) {
    const prisma = new PrismaClient();
    const inserted = await prisma.device.create({
      data: {
        name: data.name,
        image: data.image,
        brandId: data.brandId,
        categoryId: data.categoryId,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        order: data.order,
      },
    });
    await prisma.$disconnect();
    return inserted;
  }

  static async update(id: string, data: Device) {
    const prisma = new PrismaClient();
    const updated = await prisma.device.update({
      where: { id },
      data: {
        name: data.name,
        image: data.image,
        brandId: data.brandId,
        categoryId: data.categoryId,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        order: data.order,
      },
    });
    await prisma.$disconnect();
    return updated;
  }

  static async delete(id: string) {
    const prisma = new PrismaClient();
    // get all repairs of this device
    const repairs = await prisma.repair.findMany({
      where: { deviceId: id },
    });
    // delete all repairs
    await prisma.repair.deleteMany({
      where: { deviceId: id },
    });
    // delete device
    const deleted = await prisma.device.delete({
      where: { id },
    });
    await prisma.$disconnect();
    return deleted;
  }

  static async getFeatured() {
    const prisma = new PrismaClient();
    const devices = await prisma.device.findMany({
      where: {
        isFeatured: true,
        isActive: true,
      },
      include: {
        brand: true,
        category: true,
      },
      orderBy: {
        order: 'desc',
      },
    });
    await prisma.$disconnect();
    return devices;
  }

  static async getSearchByName(name: string | null) {
    if (!name) {
      return [];
    }
    const prisma = new PrismaClient();
    const devices = await prisma.device.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        brand: true,
        category: true,
      },
      orderBy: {
        order: 'desc',
      },
    });
    await prisma.$disconnect();
    return devices;
  }

  static async getByCategoryId(categoryId: string | null) {
    if (!categoryId) {
      return [];
    }
    const prisma = new PrismaClient();
    const devices = await prisma.device.findMany({
      where: {
        categoryId,
      },
      include: {
        repairs: {
          orderBy: {
            order: 'desc',
          },
        },
      },
      orderBy: {
        order: 'desc',
      },
    });
    await prisma.$disconnect();
    return devices;
  }
}
