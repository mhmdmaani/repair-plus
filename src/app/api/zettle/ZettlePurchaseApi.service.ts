import axios, { AxiosInstance } from 'axios';

class PurchaseApiService {
  private axiosInstance: AxiosInstance;
  private baseURL = 'https://purchase.izettle.com';

  constructor(private token: string) {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // Fetch a list of purchases
  async getPurchases(params: {
    lastPurchaseHash?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
    descending?: boolean;
  }) {
    const response = await this.axiosInstance.get('/purchases/v2', {
      params,
    });
    return response.data;
  }

  // Fetch a purchase by UUID
  async getPurchase(purchaseUuid: string) {
    const response = await this.axiosInstance.get(
      `/purchases/v2/${purchaseUuid}`
    );
    return response.data;
  }
}

export default PurchaseApiService;
