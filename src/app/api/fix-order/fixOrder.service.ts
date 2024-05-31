import { FixOrder, PrismaClient } from 'prisma/prisma-client';

export class FixOrderService {
  static async getAll() {
    const prisma = new PrismaClient();
    const results = await prisma.fixOrder.findMany();
    await prisma.$disconnect();
    return results;
  }

  static async insert(data: FixOrder) {
    const prisma = new PrismaClient();
    const inserted = await prisma.fixOrder.create({
      data,
    });
    await prisma.$disconnect();
    return inserted;
  }

  static async update(id: string, data: FixOrder) {
    const prisma = new PrismaClient();
    const updated = await prisma.fixOrder.update({
      where: { id },
      data,
    });
    await prisma.$disconnect();
    return updated;
  }

  static async delete(id: string) {
    const prisma = new PrismaClient();
    const deleted = await prisma.fixOrder.delete({
      where: { id },
    });
    await prisma.$disconnect();
    return deleted;
  }
}
