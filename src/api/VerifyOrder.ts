import axios from 'axios';
import { BASE_URL } from './settings';

export class VerifyOrder {
  static async verifyOrder(code: string | null) {
    return axios
      .get(`${BASE_URL}/verify`, {
        params: {
          code,
        },
      })
      .then((res) => res.data);
  }
}
