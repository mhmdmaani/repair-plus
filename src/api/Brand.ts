import axios from 'axios';
import { BASE_URL } from './settings';
import { Brand as BrandType } from 'prisma/prisma-client';
export class Brand {
  static async getAll() {
    const result = await axios.get(`${BASE_URL}/brand`).then((res) => res.data);
    return result;
  }

  static async getSearch(data: any) {
    const result = await axios
      .get(`${BASE_URL}/brand/search`, {
        params: data,
      })
      .then((res) => res.data);
    return result;
  }

  static async getSingle(id: string) {
    const result = await axios
      .get(`${BASE_URL}/brand/id`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getBrandTree(id: string) {
    const result = await axios
      .get(`${BASE_URL}/brand/tree`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async update(data: BrandType) {
    // upload image if existed
    if (data.logo && data.logo !== '') {
      const formData = new FormData();
      formData.append('file', data.logo);
      const response = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      data.logo = result.urls[0];
    }

    const result = await axios
      .put(`${BASE_URL}/brand`, data)
      .then((res) => res.data);

    return result;
  }

  static async create(data: BrandType) {
    // upload image if existed
    if (data.logo && data.logo !== '') {
      const formData = new FormData();
      formData.append('file', data.logo);
      const response = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      data.logo = result.urls[0];
    }

    const result = await axios
      .post(`${BASE_URL}/brand`, data)
      .then((res) => res.data);
    return result;
  }

  static async delete(id: string) {
    const result = await axios
      .delete(`${BASE_URL}/brand`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getFeatured() {
    const result = await axios
      .get(`${BASE_URL}/brand/feature`)
      .then((res) => res.data);
    return result;
  }
}
