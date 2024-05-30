import { BASE_URL } from '@/api/settings';
import axios from 'axios';
export class Payment {
  static async createPaymentIntent(
    amount: number,
    currency: string
  ): Promise<any> {
    const result = await axios
      .post(`${BASE_URL}/create-payment`, {
        amount,
        currency,
      })
      .then((res) => res.data);
    return result;
  }

  static async createPayment(body: any): Promise<any> {
    const result = await axios
      .post(`${BASE_URL}/payment`, body)
      .then((res) => res.data);
    return result;
  }

  static async updatePayment(body: any): Promise<any> {
    const result = await axios
      .put(`${BASE_URL}/payment`, body)
      .then((res) => res.data);
    return result;
  }

  static async deletePayment(id: string): Promise<any> {
    const result = await axios
      .delete(`${BASE_URL}/payment`, {
        data: { id },
      })
      .then((res) => res.data);
    return result;
  }

  static async getAllPayments(query: any): Promise<any> {
    const result = await axios
      .get(`${BASE_URL}/payment`, {
        params: query,
      })
      .then((res) => res.data);
    return result;
  }
}
