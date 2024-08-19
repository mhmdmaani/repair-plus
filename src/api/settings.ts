import axios from 'axios';

export const GOOGLE_API_KEY = 'AIzaSyC6uSZmGygWjM1eodmYij84eJ6pRh0hBrU';
export const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51IAE7sGoOEWCEIWb5V480hISaZuFZFyzcWe4tCA7jtBHHB5plzoX25kVzM8ktKlSeDUCZaeezKMabVlCMaC1BeRn00aha8rlEZ';
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : 'https://www.repairplus.se/api';

export const FRONT_END_URL = 'https://www.repairplus.se';
export class GetSettings {
  static async getSettings() {
    const result = await axios
      .get(`${BASE_URL}/settings`)
      .then((res) => res.data);
    return result;
  }
  static async changeSettings(data: any) {
    const result = await axios
      .post(`${BASE_URL}/settings`, data)
      .then((res) => res.data);
    return result;
  }
}
export const timeTypes = ['at', 'between', 'before', 'ASAP'];

export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
