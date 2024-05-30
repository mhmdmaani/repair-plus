import { PrismaClient } from 'prisma/prisma-client';

export class TermService {
  static async get() {
    const prisma = new PrismaClient();
    const terms = await prisma.term.findFirst();
    prisma.$disconnect();
    return terms;
  }

  static async create(data: any) {
    const prisma = new PrismaClient();
    const currentTerm = await prisma.term.findFirst();
    if (!currentTerm) {
      await prisma.term.create({
        data,
      });
    } else {
      await prisma.term.update({
        where: {
          id: currentTerm.id,
        },
        data,
      });
    }
    prisma.$disconnect();
    return true;
  }
}
