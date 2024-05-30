import axios from 'axios';
import { Truck as TruckType } from 'prisma/prisma-client';
import { BASE_URL } from './settings';

export class AdditionalDistanceCost {
  static async getByTruckType(id: string) {
    const result = await axios
      .get(`${BASE_URL}/additional-distance-cost`, {
        params: {
          truckTypeId: id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async update(data: TruckType) {
    const response = await fetch(`${BASE_URL}/additional-distance-cost/`, {
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

  static async create(data: AdditionalDistanceCost) {
    const response = await fetch(`${BASE_URL}/additional-distance-cost/`, {
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
    const response = await fetch(`${BASE_URL}/additional-distance-cost/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const result = await response.json();
    return result;
  }
}
