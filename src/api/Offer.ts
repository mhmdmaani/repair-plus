import axios from 'axios';
import { Driver as DriverType } from 'prisma/prisma-client';
import { BASE_URL } from './settings';

export class Offer {
  static async getAll(dt: {
    searchKey: any;
    page: any;
    perPage: any;
    sortBy?: any;
    isAsc?: any;
  }) {
    const { searchKey, page, perPage, sortBy, isAsc } = dt;
    const result = await axios
      .get(`${BASE_URL}/offer`, {
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
      `${BASE_URL}/offer/id?id=${encodeURIComponent(id)}`,
      {
        next: {
          tags: [`offer`, id],
        },
      }
    );
    const result = await response.json();
    return result;
  }

  static async update(data: DriverType) {
    // upload image if existed
    const response = await fetch(`${BASE_URL}/offer/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    const result = await response.json();
    return result;
  }

  static async create(data: DriverType) {
    const response = await fetch(`${BASE_URL}/offer/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    const result = await response?.json();
    return result;
  }

  static async delete(id: string) {
    const response = await fetch(`${BASE_URL}/offer/id`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const result = await response.json();
    return result;
  }

  static async getCurrentOffers() {
    const response = await fetch(`${BASE_URL}/offer/current`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  }

  static async getActiveOffers() {
    const response = await fetch(`${BASE_URL}/offer/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  }
}
