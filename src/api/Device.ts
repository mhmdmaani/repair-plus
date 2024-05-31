import axios from 'axios';
import { BASE_URL } from './settings';
import { Device as DeviceType } from 'prisma/prisma-client';
export class Device {
  static async getAll() {
    const result = await axios
      .get(`${BASE_URL}/device`)
      .then((res) => res.data);
    return result;
  }

  static async getSingle(id: string) {
    const result = await axios
      .get(`${BASE_URL}/device/id`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getDeviceTree(id: string) {
    const result = await axios
      .get(`${BASE_URL}/device/tree`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async update(data: DeviceType) {
    const result = await axios
      .put(`${BASE_URL}/device`, {
        params: {
          id: data.id,
        },
        data,
      })
      .then((res) => res.data);

    return result;
  }

  static async create(data: DeviceType) {
    const result = await axios
      .post(`${BASE_URL}/device`, data)
      .then((res) => res.data);
    return result;
  }

  static async delete(id: string) {
    const result = await axios
      .delete(`${BASE_URL}/device`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }
}
