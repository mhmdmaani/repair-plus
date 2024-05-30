import axios from 'axios';
import { BASE_URL } from './settings';

export class SendEmail {
  static async sendEmail(body: any) {
    const { name, email, message, token } = body;

    // send email
    const result = await axios.post(`${BASE_URL}/send-email`, {
      name,
      email,
      message,
      token,
    });
    return result;
  }
}
