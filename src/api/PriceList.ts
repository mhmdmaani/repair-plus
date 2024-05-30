import { PriceList as PriceListType } from 'prisma/prisma-client';
import { BASE_URL } from './settings';

export class PriceList {
  static async getPriceList(id: string) {
    const searchParams = new URLSearchParams();
    searchParams.append('id', id);
    const response = await fetch(
      `${BASE_URL}/pricelist?${searchParams.toString()}`
    );
    const result = await response.json();
    return result;
  }

  static async update(data: PriceListType) {
    const response = await fetch(`${BASE_URL}/pricelist`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await response.json();
    return result;
  }

  static async create(data: PriceListType) {
    const response = await fetch(`${BASE_URL}/pricelist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response?.json();
    return result;
  }

  static async delete({ id }: { id: string }) {
    const response = await fetch(`${BASE_URL}/pricelist`, {
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
