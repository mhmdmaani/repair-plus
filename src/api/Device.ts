import axios from 'axios';
import { BASE_URL } from './settings';
import { Device as DeviceType, Brand as BrandType } from 'prisma/prisma-client';
export class Device {
  static async getAll() {
    const result = await axios
      .get(`${BASE_URL}/device`)
      .then((res) => res.data);
    return result;
  }

  static async getSearch(data: any) {
    const result = await axios
      .get(`${BASE_URL}/device/search`, {
        params: data,
      })
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
      .put(`${BASE_URL}/device`, data)
      .then((res) => res.data);

    return result;
  }
  static async create(data: DeviceType) {
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

  static async getFeatured() {
    const result = await axios
      .get(`${BASE_URL}/brand/feature`)
      .then((res) => res.data);
    return result;
  }
}
