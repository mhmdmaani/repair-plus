import { randomUUID } from 'crypto';
import { Repair, PrismaClient, Faq } from 'prisma/prisma-client';

export class FaqService {
  static async getAll() {
    const prisma = new PrismaClient();
    const results = await prisma.faq.findMany({
      orderBy: {
        order: 'desc',
      },
    });
    await prisma.$disconnect();
    return results;
  }

  static async insert(data: Faq) {
    const prisma = new PrismaClient();
    const inserted = await prisma.faq.create({
      data,
    });
    await prisma.$disconnect();
    return inserted;
  }

  static async update(id: string, data: Faq) {
    const prisma = new PrismaClient();
    const updated = await prisma.faq.update({
      where: { id },
      data,
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
