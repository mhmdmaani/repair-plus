import axios from 'axios';
import { Driver as DriverType } from 'prisma/prisma-client';
import { BASE_URL } from './settings';

export class Driver {
  static async getAll(dt: {
    searchKey: any;
    page: any;
    perPage: any;
    sortBy?: any;
    isAsc?: any;
  }) {
    const { searchKey, page, perPage, sortBy, isAsc } = dt;
    const result = await axios
      .get(`${BASE_URL}/driver`, {
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

  static async searchDrivers(searchKey: string) {
    const result = await axios
      .get(`${BASE_URL}/driver/search`, {
        params: {
          searchKey,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getSingle(id: string) {
    const response = await fetch(
      `${BASE_URL}/driver/id?id=${encodeURIComponent(id)}`,
      {
        next: {
          tags: [`driver`, id],
        },
      }
    );
    const result = await response.json();
    return result;
  }

  static async update(data: DriverType) {
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
    const response = await fetch(`${BASE_URL}/driver/`, {
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

  static async create(data: DriverType) {
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

    const response = await fetch(`${BASE_URL}/driver/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        image: data.image && data.image !== '' ? data.image : '',
      }),
    });
    const result = await response?.json();

    return result;
  }

  static async delete(id: string) {
    const response = await fetch(`${BASE_URL}/driver/id`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const result = await response.json();
    return result;
  }

  static async assignDriverToOrder({
    driverId,
    orderId,
  }: {
    driverId: string;
    orderId: string;
  }) {
    const response = await fetch(`${BASE_URL}/driver/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ driverId, orderId }),
    });
    const result = await response.json();
    return result;
  }
}
