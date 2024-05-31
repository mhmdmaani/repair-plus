import axios from 'axios';
import { BASE_URL } from './settings';
import { Repair as RepairType } from 'prisma/prisma-client';
export class Repair {
  static async getAll() {
    const result = await axios
      .get(`${BASE_URL}/repair`)
      .then((res) => res.data);
    return result;
  }

  static async getSingle(id: string) {
    const result = await axios
      .get(`${BASE_URL}/repair/id`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getDeviceTree(id: string) {
    const result = await axios
      .get(`${BASE_URL}/repair/tree`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async update(data: RepairType) {
    const result = await axios
      .put(`${BASE_URL}/repair`, {
        params: {
          id: data.id,
        },
        data,
      })
      .then((res) => res.data);

    return result;
  }

  static async create(data: RepairType) {
    const result = await axios
      .post(`${BASE_URL}/repair`, data)
      .then((res) => res.data);
    return result;
  }

  static async delete(id: string) {
    const result = await axios
      .delete(`${BASE_URL}/repair`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }
}
