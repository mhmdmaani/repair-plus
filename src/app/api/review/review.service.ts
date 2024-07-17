import axios from 'axios';
import { PrismaClient } from 'prisma/prisma-client';

export class ReviewService {
  static async getAll() {
    const prisma = new PrismaClient();
    const results = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    await prisma.$disconnect();
    return results;
  }

  static async getActive() {
    const prisma = new PrismaClient();
    const results = await prisma.review.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    await prisma.$disconnect();
    return results;
  }

  static async update(data: any) {
    const prisma = new PrismaClient();
    const updated = await prisma.review.update({
      where: {
        id: data.id,
      },
      data,
    });
    await prisma.$disconnect();
    return updated;
  }

  static async insert(data: any) {
    const prisma = new PrismaClient();
    const created = await prisma.review.create({
      data,
    });
    await prisma.$disconnect();
    return created;
  }

  static async createMany(data: any) {
    const prisma = new PrismaClient();
    const created = await prisma.review.createMany({
      data,
    });
    await prisma.$disconnect();
    return created;
  }

  static async delete(id: string) {
    const prisma = new PrismaClient();
    const deleted = await prisma.review.delete({
      where: {
        id,
      },
    });
    await prisma.$disconnect();
    return deleted;
  }

  static async importFromGoogleMaps() {
    const apiKey = process.env.GOOGLE_API_KEY || '';
    const placeId = process.env.GOOGLE_PLACE_ID || '';

    const result = await this.getGoogleMapsReviews(placeId, apiKey);
    return result;
  }

  static async getPlaceId(businessName: string, apiKey: string) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
        {
          params: {
            input: businessName,
            inputtype: 'textquery',
            fields: 'place_id',
            key: apiKey,
          },
        }
      );
      return response.data.candidates[0].place_id;
    } catch (error) {
      console.error(error);
    }
  }

  static async getGoogleMapsReviews(placeId: string, apiKey: string) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: placeId,
            fields: 'reviews',
            key: apiKey,
          },
        }
      );
      console.log(response.data);
      return response.data.result.reviews;
    } catch (error) {
      console.error(error);
    }
  }

  static async getSearch(dt: {
    searchKey: any;
    page: any;
    perPage: any;
    sortBy?: any;
    isAsc?: any;
    isAdmin?: any;
  }) {
    const prisma = new PrismaClient();
    const { searchKey, page, perPage, sortBy, isAsc } = dt;
    const currentSortBy = !sortBy || sortBy === '' ? 'createdAt' : sortBy;
    const currentIsAsc = isAsc !== 'desc' ? 'asc' : 'desc';
    const skip = page * perPage;
    const reviews = await prisma.review.findMany({
      where: {
        isActive: dt.isAdmin === 'true' ? undefined : true,
        OR:
          searchKey && searchKey !== ''
            ? [
                {
                  author_name: {
                    contains: searchKey,
                    mode: 'insensitive',
                  },
                },
              ]
            : undefined,
      },
      orderBy: {
        [currentSortBy]: isAsc === 'true' ? 'asc' : 'desc',
      },
      skip: skip,
      take: parseInt(perPage),
    });
    const total = await prisma.review.count({
      where: {
        isActive: true,
        OR:
          searchKey && searchKey !== ''
            ? [
                {
                  author_name: {
                    contains: searchKey,
                    mode: 'insensitive',
                  },
                },
              ]
            : undefined,
      },
    });
    prisma.$disconnect();
    return {
      data: reviews,
      total,
    };
  }
}
