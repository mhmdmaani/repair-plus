import axios from 'axios';
import { BASE_URL } from './settings';
import { FixOrder as FixOrderType } from 'prisma/prisma-client';
export class FixOrder {
  static async getAll() {
    const result = await axios
      .get(`${BASE_URL}/fix-order`)
      .then((res) => res.data);
    return result;
  }

  static async update(data: FixOrderType) {
    const result = await axios
      .put(`${BASE_URL}/fix-order`, {
        params: {
          id: data.id,
        },
        data,
      })
      .then((res) => res.data);

    return result;
  }

  static async create(data: FixOrderType) {
    const result = await axios
      .post(`${BASE_URL}/fix-order`, data)
      .then((res) => res.data);
    return result;
  }

  static async delete(id: string) {
    const result = await axios
      .delete(`${BASE_URL}/fix-order`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }
}
