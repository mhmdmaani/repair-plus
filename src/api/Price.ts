import axios from 'axios';
import { BASE_URL } from './settings';

export class Price {
  static async calculatePrice(dt: any) {
    const result = await axios
      .post(`${BASE_URL}/price`, dt)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
    return result;
  }
}
