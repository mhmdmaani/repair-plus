import axios from 'axios';
import { BASE_URL } from './settings';

export class Map {
  static async getSuggestion(search: string) {
    const result = await axios
      .get(`${BASE_URL}/suggestion`, {
        params: {
          search,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getCoordByPlaceId(placeId: string) {
    if (!placeId) return;
    const result = await axios
      .get(`${BASE_URL}/place`, {
        params: {
          placeId,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getCityAndPostal(placeId: string) {
    const result = await axios
      .get(`${BASE_URL}/city`, {
        params: {
          placeId,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getAllUKCities(searchKey: string) {
    const result = await axios
      .get(`${BASE_URL}/city/all`, {
        params: {
          searchKey,
        },
      })
      .then((res) => res.data);
    return result;
  }

  static async getCityPostals(cityName: string) {
    const result = await axios
      .get(`${BASE_URL}/city/postals`, {
        params: {
          city: cityName,
        },
      })
      .then((res) => res.data);
    return result;
  }
}
