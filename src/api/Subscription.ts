import axios from 'axios';
import { BASE_URL } from './settings';

export class Subscription {
  static async getAll(data: any) {
    const result = await axios
      .get(`${BASE_URL}/subscription`, {
        params: {
          ...data,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async update(data: any) {
    // upload image if existed
    const response = await fetch(`${BASE_URL}/subscription/`, {
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

  static async create(data: any) {
    const response = await fetch(`${BASE_URL}/subscription/`, {
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
