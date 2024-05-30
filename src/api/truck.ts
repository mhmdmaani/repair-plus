import axios from 'axios';
import { Truck as TruckType } from 'prisma/prisma-client';
import { BASE_URL } from './settings';

export class Truck {
  static async getAll(dt: {
    searchKey: any;
    page: any;
    perPage: any;
    sortBy?: any;
    isAsc?: any;
  }) {
    const { searchKey, page, perPage, sortBy, isAsc } = dt;
    const result = await axios
      .get(`${BASE_URL}/truck`, {
        params: {
          searchKey,
          page,
          perPage,
          sortBy,
          isAsc,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getSingle(id: string) {
    const response = await fetch(
      `${BASE_URL}/truck/id?id=${encodeURIComponent(id)}`,
      {
        next: {
          tags: [`truck`, id],
        },
      }
    );
    const result = await response.json();
    return result;
  }

  static async update(data: TruckType) {
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
    const response = await fetch(`${BASE_URL}/truck/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        image: data.image !== '' ? data.image : undefined,
      }),
    });
    const result = await response.json();
    return result;
  }

  static async create(data: TruckType) {
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

    const response = await fetch(`${BASE_URL}/truck/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        image: data.image !== '' ? data.image : undefined,
      }),
    });
    const result = await response?.json();
    return result;
  }

  static async delete(id: string) {
    const response = await fetch(`${BASE_URL}/truck/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const result = await response.json();
    return result;
  }

  static async assignTruckToIrder({
    truckId,
    orderId,
  }: {
    truckId: string;
    orderId: string;
  }) {
    const response = await fetch(`${BASE_URL}/truck/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ truckId, orderId }),
    });
    const result = await response.json();
    return result;
  }

  static async searchTruck(
    searchKey: string | null,
    truckTypeId: string | null
  ) {
    const result = await axios
      .get(`${BASE_URL}/truck/search`, {
        params: {
          searchKey,
          truckTypeId,
        },
      })
      .then((res) => res.data);
    return result;
  }
}
