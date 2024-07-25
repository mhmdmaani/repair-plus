import { User, PrismaClient } from 'prisma/prisma-client';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  static async getAll() {
    const prisma = new PrismaClient();
    const results = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    await prisma.$disconnect();
    return results;
  }

  static async getSearchByName(name: string | null) {
    if (!name) {
      return [];
    }
    const prisma = new PrismaClient();
    const results = await prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            tel: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
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
  }) {
    const prisma = new PrismaClient();
    const { searchKey, page, perPage, sortBy, isAsc } = dt;
    const currentSortBy = !sortBy || sortBy === '' ? 'createdAt' : sortBy;
    const currentIsAsc = isAsc !== 'desc' ? 'asc' : 'desc';
    const skip = page * perPage;
    const brands = await prisma.user.findMany({
      where: {
        OR:
          searchKey && searchKey !== ''
            ? [
                {
                  name: {
                    contains: searchKey,
                    mode: 'insensitive',
                  },
                },
                {
                  email: {
                    contains: searchKey,
                    mode: 'insensitive',
                  },
                  tel: {
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
    const total = await prisma.user.count({
      where: {
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
    const result = await prisma.user.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: {
            createdAt: 'desc',
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
    const result = await prisma.user.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    await prisma.$disconnect();
    return result;
  }

  static async insert(data: User) {
    const prisma = new PrismaClient();
    const inserted = await prisma.user.create({
      data: {
        ...data,
        password: '123456',
        id: uuidv4(),
      },
    });
    await prisma.$disconnect();
    return inserted;
  }

  static async update(id: string, data: User) {
    const prisma = new PrismaClient();
    const updated = await prisma.user.update({
      where: { id },
      data,
    });
    await prisma.$disconnect();
    return updated;
  }

  static async delete(id: string) {
    const prisma = new PrismaClient();

    // get all devices of this user
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
    // delete all devices of this user
    await prisma.device.deleteMany({
      where: {
        brandId: id,
      },
    });
    // delete the user
    const deleted = await prisma.user.delete({
      where: { id },
    });
    await prisma.$disconnect();
    return deleted;
  }
}
