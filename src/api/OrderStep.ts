import axios from 'axios';
import { BASE_URL } from './settings';

export class OrderStep {
  // get by order id

  static async getByOrderId(orderId: string | null) {
    const result = await axios.get(`${BASE_URL}/order-step`, {
      params: {
        orderId,
      },
    });

    return result.data;
  }
  // update

  static async update(data: any) {
    const result = await axios.put(`${BASE_URL}/order-step`, data);

    return result.data;
  }
  // create

  static async create(data: any) {
    const result = await axios.post(`${BASE_URL}/order-step`, data);

    return result.data;
  }
  // delete

  static async delete(id: string | null) {
    const result = await axios.delete(`${BASE_URL}/order-step`, {
      data: {
        id,
      },
    });

    return result.data;
  }

  static async goBack({
    orderId,
    stepId,
  }: {
    orderId: string | null;
    stepId: string | null;
  }) {
    const result = await axios.post(`${BASE_URL}/order-step/back`, {
      orderId,
      stepId,
    });

    return result.data;
  }
}
