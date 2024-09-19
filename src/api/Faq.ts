import axios from 'axios';
import { BASE_URL } from './settings';
import { Faq as FaqType } from 'prisma/prisma-client';
export class Faq {
  static async getAll() {
    const result = await axios.get(`${BASE_URL}/faq`).then((res) => res.data);
    return result;
  }

  static async getSearch(data: any) {
    const result = await axios
      .get(`${BASE_URL}/faq/search`, {
        params: data,
      })
      .then((res) => res.data);
    return result;
  }

  static async update(data: any) {
    const result = await axios
      .put(`${BASE_URL}/faq`, data)
      .then((res) => res.data);

    return result;
  }

  static async create(data: FaqType) {
    // upload image if existed
    const result = await axios
      .post(`${BASE_URL}/faq`, data)
      .then((res) => res.data);
    return result;
  }

  static async delete(id: string) {
    const result = await axios
      .delete(`${BASE_URL}/faq`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }
}
