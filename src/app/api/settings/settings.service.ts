import { PrismaClient } from 'prisma/prisma-client';

export class SettingsService {
  static async getSettings() {
    const prisma = new PrismaClient();
    const settings = await prisma.settings.findFirst();
    prisma.$disconnect();
    return settings;
  }
  static async changeSettings(data: any) {
    const prisma = new PrismaClient();
    const currentSettings = await prisma.settings.findFirst();
    if (!currentSettings) {
      const createdSettings = await prisma.settings.create({
        data: data,
      });
      prisma.$disconnect();
      return createdSettings;
    }
    const { id, ...rest } = data;
    const updatedSettings = await prisma.settings.update({
      where: {
        id: id,
      },
      data: {
        ...rest,
      },
    });
    prisma.$disconnect();
    return updatedSettings;
  }
}
