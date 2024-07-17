import axios from 'axios';
import { BASE_URL } from './settings';
import { Review as ReviewType } from 'prisma/prisma-client';
export class Review {
  static async getAll() {
    const result = await axios
      .get(`${BASE_URL}/review`)
      .then((res) => res.data);
    return result;
  }

  static async getSearch(data: any) {
    const result = await axios
      .get(`${BASE_URL}/review/search`, {
        params: data,
      })
      .then((res) => res.data);
    return result;
  }

  static async update(data: any) {
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
      .put(`${BASE_URL}/review`, data)
      .then((res) => res.data);

    return result;
  }

  static async create(data: ReviewType) {
    // upload image if existed
    const result = await axios
      .post(`${BASE_URL}/review`, data)
      .then((res) => res.data);
    return result;
  }

  static async delete(id: string) {
    const result = await axios
      .delete(`${BASE_URL}/review`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getActive() {
    const result = await axios
      .get(`${BASE_URL}/review/active`)
      .then((res) => res.data);
    return result;
  }

  static async importFromGoogleMaps() {
    const result = await axios
      .get(`${BASE_URL}/review/many`)
      .then((res) => res.data);
    return result;
  }

  static async createMany(data: any) {
    const result = await axios
      .post(`${BASE_URL}/review/many`, { data })
      .then((res) => res.data);
    return result;
  }
}
