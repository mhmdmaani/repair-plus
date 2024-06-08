const { PrismaClient } = require('@prisma/client');
const brands = require('./brands.json');

class SeedBrand {
  static async seedBrand() {
    const prisma = new PrismaClient();

    const toInsert = brands.map((brand) => {
      return {
        name: brand.name,
        logo: brand?.logo || '',
      };
    });
    await prisma.brand.createMany({
      data: toInsert,
    });

    await prisma.$disconnect();
  }

  static async reset() {
    const prisma = new PrismaClient();
    await prisma.brand.deleteMany();
    await prisma.$disconnect();
  }
}

module.exports = { SeedBrand };
