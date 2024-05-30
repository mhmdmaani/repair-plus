import { PrismaClient } from 'prisma/prisma-client';

export class SubscriptionService {
  // get all
  static async getAll(dt: {
    searchKey: any;
    page: any;
    perPage: any;
    sortBy?: any;
    isAsc?: any;
  }) {
    const prisma = new PrismaClient();
    const { searchKey, page, perPage, sortBy, isAsc } = dt;
    const skip = page * perPage;
    const subs = await prisma.subscription.findMany({
      where: {
        OR:
          searchKey && searchKey !== ''
            ? [
                {
                  email: {
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
    const total = await prisma.subscription.count({
      where: {
        OR:
          searchKey && searchKey !== ''
            ? [
                {
                  email: {
                    contains: searchKey,
                  },
                },
              ]
            : undefined,
      },
    });
    prisma.$disconnect();
    return {
      data: subs,
      total,
    };
  }

  static async create(subscription: any) {
    const prisma = new PrismaClient();
    const createdSubscription = await prisma.subscription.create({
      data: subscription,
    });
    return createdSubscription;
  }
  static async update(id: string, subscription: any) {
    const prisma = new PrismaClient();
    const updatedSubscription = await prisma.subscription.update({
      where: { id },
      data: subscription,
    });
    prisma.$disconnect();
    return updatedSubscription;
  }

  static async delete(id: string) {
    const prisma = new PrismaClient();
    const deletedSubscription = await prisma.subscription.delete({
      where: { id },
    });
    prisma.$disconnect();
    return deletedSubscription;
  }
}
