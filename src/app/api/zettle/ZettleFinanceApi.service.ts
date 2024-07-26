import axios, { AxiosInstance } from 'axios';

class FinanceApiService {
  private axiosInstance: AxiosInstance;
  private baseURL = 'https://finance.izettle.com/v2';

  constructor(private token: string) {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // Accounts
  async getAccountBalance(
    accountTypeGroup: 'PRELIMINARY' | 'LIQUID',
    at?: string
  ) {
    const response = await this.axiosInstance.get(
      `/accounts/${accountTypeGroup}/balance`,
      {
        params: { at },
      }
    );
    return response.data;
  }

  async getAccountTransactions(
    accountTypeGroup: 'PRELIMINARY' | 'LIQUID',
    start: string,
    end: string,
    includeTransactionType?: string[],
    limit: number = 1000,
    offset: number = 0
  ) {
    const response = await this.axiosInstance.get(
      `/accounts/${accountTypeGroup}/transactions`,
      {
        params: { start, end, includeTransactionType, limit, offset },
      }
    );
    return response.data;
  }

  // Payout
  async getPayoutInfo(at?: string) {
    const response = await this.axiosInstance.get('/payout-info', {
      params: { at },
    });
    return response.data;
  }
}

export default FinanceApiService;
