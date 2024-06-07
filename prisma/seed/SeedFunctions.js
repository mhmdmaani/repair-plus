const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const brands = require('./brands.json');
const { appleModels } = require('./appleModels');
const { samsungModels } = require('./samsungModels');

class SeedFunctions {
  static async seedBrand() {
    const prisma = new PrismaClient();
    await prisma.brand.create({
      data: {
        name: 'Apple',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/apple-1869028-1583159.png',
      },
    });
    await prisma.brand.create({
      data: {
        name: 'Samsung',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/samsung-1869030-1583161.png',
      },
    });
    await prisma.brand.create({
      data: {
        name: 'Xiaomi',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/xiaomi-1869031-1583162.png',
      },
    });
    await prisma.$disconnect();
  }

  static async seedDevices() {
    const prisma = new PrismaClient();
    const brands = await prisma.brand.findMany();
    const appleBrand = brands.find((brand) => brand.name === 'Apple');
    const samsungBrand = brands.find((brand) => brand.name === 'Samsung');
    const toInsertApple = appleModels.map((model) => {
      return {
        name: model.name,
        image: model.image,
        brandId: appleBrand?.id || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const toInsertSamsung = samsungModels.map((model) => {
      return {
        name: model.name,
        image: model.image,
        brandId: samsungBrand?.id || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await prisma.device.createMany({
      data: [...toInsertApple, ...toInsertSamsung],
    });

    await prisma.$disconnect();
  }

  static async seedRepairs() {
    const prisma = new PrismaClient();
    const devices = await prisma.device.findMany();

    const repairs = [
      'Screen Replacement',
      'Battery Replacement',
      'Charging Port Replacement',
      'Camera Replacement',
      'Speaker Replacement',
      'Microphone Replacement',
      'Water Damage Repair',
      'Motherboard Repair',
      'Software Repair',
      'Data Recovery',
      'Other',
    ];

    const toInsert = devices
      .map((device) => {
        const price = faker.number.float(100) + 50;
        return repairs.map((repair) => {
          return {
            name: repair,
            deviceId: device.id,
            description: `Get your ${device.name} ${repair} with us!`,
            price: price,
            vat: price * 0.2,
            totalPrice: price * 1.2,
            quantity: faker.number.int(10),
            quality: faker.helpers.arrayElement([
              'Original',
              'Good',
              'Bad',
              'Average',
            ]),
            expectedMinutesToFix: faker.number.int(60),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        });
      })
      .flat();

    await prisma.repair.createMany({
      data: toInsert,
    });
    await prisma.$disconnect();
  }

  static async seedUsers() {
    const prisma = new PrismaClient();
    for (let i = 0; i < 10; i++) {
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: faker.internet.password(),
          name: faker.person.fullName(),
          tel: faker.phone.number(),
          address: faker.address.streetAddress(),
          company: faker.company.name(),
          orgNumber: faker.random.alphaNumeric(10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
    await prisma.$disconnect();
  }

  static async reset() {
    const prisma = new PrismaClient();
    await prisma.repair.deleteMany();
    await prisma.device.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  }

  static async seed() {
    await SeedFunctions.reset();
    await SeedFunctions.seedBrand();
    await SeedFunctions.seedDevices();
    await SeedFunctions.seedRepairs();
    await SeedFunctions.seedUsers();
  }
}

module.exports = { SeedFunctions };
