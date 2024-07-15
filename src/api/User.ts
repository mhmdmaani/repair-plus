import axios from 'axios';
import { BASE_URL } from './settings';

export class User {
  static async getSearch(data: any) {
    const result = await axios
      .get(`${BASE_URL}/user/search`, {
        params: data,
      })
      .then((res) => res.data);
    return result;
  }

  static async getSearchByName(name: string) {
    const result = await axios
      .get(`${BASE_URL}/user/search/name`, {
        params: {
          name,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getById(id: string) {
    const result = await axios
      .get(`${BASE_URL}/user`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async create(data: any) {
    const result = await axios
      .post(`${BASE_URL}/user`, data)
      .then((res) => res.data);
    return result;
  }

  static async update(data: any) {
    const result = await axios
      .put(`${BASE_URL}/user`, data)
      .then((res) => res.data);
    return result;
  }

  static async delete(id: string) {
    const result = await axios
      .delete(`${BASE_URL}/user`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }
}
