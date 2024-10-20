import axios from 'axios';
import { BASE_URL } from './settings';
import { Item as ItemType } from 'prisma/prisma-client';
export class Item {
  static async getAll() {
    const result = await axios.get(`${BASE_URL}/item`).then((res) => res.data);
    return result;
  }

  static async getSingle(id: string) {
    const result = await axios
      .get(`${BASE_URL}/item/id`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getSearch(data: any) {
    const result = await axios
      .get(`${BASE_URL}/item/search`, {
        params: data,
      })
      .then((res) => res.data);
    return result;
  }

  static async getDeviceTree(id: string) {
    const result = await axios
      .get(`${BASE_URL}/item/tree`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async update(data: ItemType | any) {
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
      .put(`${BASE_URL}/item`, data)
      .then((res) => res.data);

    return result;
  }

  static async create(data: ItemType) {
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
      .post(`${BASE_URL}/item`, data)
      .then((res) => res.data);
    return result;
  }

  static async delete(id: string) {
    const result = await axios
      .delete(`${BASE_URL}/item`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async searchByDevices(data: any) {
    console.log('searchByDevices-------------', data);
    const result = await axios
      .get(`${BASE_URL}/item/devices`, {
        params: {
          searchKey: data.searchKey,
          devices: data.devices,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async searchAll(data: any) {
    console.log('searchAll-------------', data);
    const result = await axios
      .get(`${BASE_URL}/item/all`, {
        params: data,
      })
      .then((res) => res.data);
    return result;
  }
}
