const { PrismaClient } = require('@prisma/client');
const categories = require('./categories.json');

class CategorySeed {
  static async seed() {
    const prisma = new PrismaClient();

    const toInsert = categories.map((brand) => {
      return {
        name: brand.name,
        image: brand?.image || '',
      };
    });
    await prisma.category.createMany({
      data: toInsert,
    });

    await prisma.$disconnect();
  }

  static async reset() {
    const prisma = new PrismaClient();
    await prisma.category.deleteMany();
    await prisma.$disconnect();
  }
}

module.exports = { CategorySeed };
