const { PrismaClient } = require('@prisma/client');
const iphones = require('./iphones.json');

const BASE_IMAGE_URL = 'https://repair-plus.s3.eu-west-2.amazonaws.com/images/';
class IphoneSeed {
  static async seed() {
    const prisma = new PrismaClient();
    const currentBrand = await prisma.brand.findFirst({
      where: {
        name: 'Apple',
      },
    });
    const currentCategory = await prisma.category.findFirst({
      where: {
        name: 'Phone',
      },
    });
    const toInsert = iphones.map((device) => {
      return {
        name: device.name,
        image: `${BASE_IMAGE_URL}${this.getImageName(device.image_path)}`,
        brandId: currentBrand.id,
        categoryId: currentCategory.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await prisma.device.createMany({
      data: toInsert,
    });

    await prisma.$disconnect();
  }

  static async reset() {
    const prisma = new PrismaClient();
    await prisma.device.deleteMany();
    await prisma.$disconnect();
  }

  // get name of image from image path
  static getImageName(imagePath) {
    return imagePath.split('/').pop();
  }
}

module.exports = { IphoneSeed };
