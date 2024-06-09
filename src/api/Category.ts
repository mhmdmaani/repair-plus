import axios from 'axios';
import { BASE_URL } from './settings';
import { Category as BrandType } from 'prisma/prisma-client';
export class Category {
  static async getAll() {
    const result = await axios
      .get(`${BASE_URL}/category`)
      .then((res) => res.data);
    return result;
  }

  static async getSearch(data: any) {
    const result = await axios
      .get(`${BASE_URL}/category/search`, {
        params: data,
      })
      .then((res) => res.data);
    return result;
  }

  static async getSingle(id: string) {
    const result = await axios
      .get(`${BASE_URL}/category/id`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getBrandTree(id: string) {
    const result = await axios
      .get(`${BASE_URL}/category/tree`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async update(data: BrandType) {
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

    const result = await axios
      .put(`${BASE_URL}/category`, data)
      .then((res) => res.data);

    return result;
  }

  static async create(data: BrandType) {
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

    const result = await axios
      .post(`${BASE_URL}/category`, data)
      .then((res) => res.data);
    return result;
  }

  static async delete(id: string) {
    const result = await axios
      .delete(`${BASE_URL}/category`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }
}
