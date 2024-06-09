const { PrismaClient } = require('@prisma/client');
const repairs = require('./repairs.json');
const { faker } = require('@faker-js/faker');
const BASE_IMAGE_URL = 'https://repair-plus.s3.eu-west-2.amazonaws.com/images/';

class RepairSeed {
  static async seed() {
    const prisma = new PrismaClient();
    const iphones = await prisma.device.findMany({});
    let toInsert = [];
    repairs.map((repair) => {
      const iphone = iphones.find((iphone) => iphone.name === repair.name);
      if (!iphone) return;
      repair.repairs.map((rp) => {
        toInsert.push({
          name: rp.name,
          image: `${BASE_IMAGE_URL}${this.getImageName(rp.image_path)}`,
          deviceId: iphone.id,
          buyPrice: Math.floor(Math.random() * 100),
          sellPrice: Math.floor(Math.random() * 100) + 100,
          repairingPrice: Math.floor(Math.random() * 100),
          quantity: 1,
          quality: 'New',
          repairingTimeMinutes: Math.floor(Math.random() * 60),
          createdAt: new Date(),
          updatedAt: new Date(),
          description: faker.lorem.sentences(3),
        });
      });
    });
    await prisma.repair.createMany({
      data: toInsert,
    });
    await prisma.$disconnect();
  }
  static async reset() {
    const prisma = new PrismaClient();
    await prisma.repair.deleteMany();
    await prisma.$disconnect();
  }

  static getImageName(imagePath) {
    return imagePath?.split('/')?.pop();
  }
}

module.exports = { RepairSeed };
