import { OrderInputType } from '@/app/api/order/order.type';
import axios from 'axios';
import { BASE_URL } from './settings';

export class Order {
  static async createOrder(body: OrderInputType) {
    const result = await axios
      .post(`${BASE_URL}/order`, { ...body })
      .then((res) => res.data);
    return result;
  }

  static async getOrders(dt: {
    searchKey: any;
    page: any;
    perPage: any;
    sortBy?: any;
    isAsc?: any;
  }) {
    const { searchKey, page, perPage, sortBy, isAsc } = dt;
    const result = await axios
      .get(`${BASE_URL}/order`, {
        params: {
          searchKey,
          page,
          perPage,
          sortBy,
          isAsc,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getOrderDetails(id: any) {
    const result = await axios
      .get(`${BASE_URL}/order/detail`, {
        params: {
          id,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getOrderDetailsByRefId(refId: any) {
    const result = await axios
      .get(`${BASE_URL}/order/ref`, {
        params: {
          refId,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async updateOrder(data: any) {
    const result = await axios
      .put(`${BASE_URL}/order`, { ...data })
      .then((res) => res.data);
    return result;
  }
}
