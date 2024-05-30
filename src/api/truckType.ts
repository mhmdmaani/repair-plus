import { revalidateTag } from 'next/cache';
import { TruckType as TruckTypeType } from 'prisma/prisma-client';
import { BASE_URL } from './settings';

export class TruckType {
  static async getActiveTruckTypes() {
    const response = await fetch(`${BASE_URL}/active-truck-types`, {
      next: {
        tags: ['activeTruckTypes2223'],
      },
    });
    const result = await response.json();
    return result;
  }

  static async getAllTruckTypes() {
    const response = await fetch(`${BASE_URL}/truckType`, {
      next: {
        tags: ['allTruckTypes'],
      },
    });
    const result = await response.json();
    return result;
  }

  static async getTruckType(id: string) {
    const response = await fetch(
      `${BASE_URL}/truckType/id?id=${encodeURIComponent(id)}`,
      {
        next: {
          tags: [`truckType`, id],
        },
      }
    );
    const result = await response.json();
    return result;
  }

  static async updateTruckType(data: TruckTypeType) {
    // upload image if existed
    if (data.image && data.image !== '') {
      const formData = new FormData();
      formData.append('file', data.image);
      const response = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      data.image = result.urls[0];
    }
    const response = await fetch(`${BASE_URL}/truckType/id`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await response.json();
    return result;
  }

  static async createTruckType(data: TruckTypeType) {
    const response = await fetch(`${BASE_URL}/truckType/id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response?.json();
    return result;
  }

  static async deleteTruckType(id: string) {
    const response = await fetch(`${BASE_URL}/truckType/id`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const result = await response.json();
    revalidateTag('allTruckTypes');
    return result;
  }
}
