import axios, { AxiosInstance } from 'axios';

class InventoryApiService {
  private axiosInstance: AxiosInstance;
  private baseURL = 'https://inventory.izettle.com/v3';

  constructor(private token: string) {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // Update inventory balance
  async updateInventoryBalance(data: {
    identifier?: string;
    movements: {
      productUuid: string;
      variantUuid: string;
      change: number;
      from: string;
      to: string;
    }[];
  }) {
    await this.axiosInstance.post('/movements', data);
  }

  // Fetch balance of all inventories
  async fetchBalanceOfAllInventories(params: {
    cursor?: string;
    limit?: number;
    inventoryUuid?: string;
    productUuid?: string;
  }) {
    const response = await this.axiosInstance.get('/stock', { params });
    return response.data;
  }

  // Fetch balance updates of all inventories
  async fetchBalanceUpdates(params: {
    ts?: string;
    cursor?: string;
    limit?: number;
    inventoryUuid?: string[];
  }) {
    const response = await this.axiosInstance.get('/stock/updates', { params });
    return response.data;
  }

  // Fetch balance of an inventory
  async fetchBalanceOfInventory(
    inventoryUuid: string,
    params: { cursor?: string; limit?: number }
  ) {
    const response = await this.axiosInstance.get(`/stock/${inventoryUuid}`, {
      params,
    });
    return response.data;
  }

  // Fetch balance of a product
  async fetchBalanceOfProduct(
    inventoryUuid: string,
    productUuid: string,
    params: { cursor?: string; limit?: number }
  ) {
    const response = await this.axiosInstance.get(
      `/stock/${inventoryUuid}/products/${productUuid}`,
      { params }
    );
    return response.data;
  }

  // Fetch balances of a few products
  async fetchBalancesOfProducts(
    inventoryUuid: string,
    productUuids: string[],
    params: { cursor?: string; limit?: number }
  ) {
    const response = await this.axiosInstance.post(
      `/stock/${inventoryUuid}/products`,
      productUuids,
      { params }
    );
    return response.data;
  }

  // Fetch all inventories
  async fetchAllInventories() {
    const response = await this.axiosInstance.get('/inventories');
    return response.data;
  }

  // Create inventories
  async createInventory(data: { name: string; description: string }) {
    const response = await this.axiosInstance.post('/inventories', data);
    return response.data;
  }

  // Fetch a single inventory
  async fetchSingleInventory(inventoryUuid: string) {
    const response = await this.axiosInstance.get(
      `/inventories/${inventoryUuid}`
    );
    return response.data;
  }

  // Fetch tracked products
  async fetchTrackedProducts(params: { cursor?: string; limit?: number }) {
    const response = await this.axiosInstance.get('/products', { params });
    return response.data;
  }

  // Start and stop inventory tracking
  async updateProductTrackingStatus(
    data: { productUuid: string; tracking: 'enable' | 'disable' }[]
  ) {
    await this.axiosInstance.post('/products', data);
  }

  // Fetch updates for tracked products
  async fetchTrackedProductUpdates(params: {
    ts?: string;
    cursor?: string;
    limit?: number;
  }) {
    const response = await this.axiosInstance.get('/products/updates', {
      params,
    });
    return response.data;
  }

  // Fetch inventory tracking status
  async fetchInventoryTrackingStatus(productUuids: string[]) {
    const response = await this.axiosInstance.post(
      '/products/status',
      productUuids
    );
    return response.data;
  }

  // Set low stock level
  async setLowStockLevel(
    data: {
      inventoryUuid: string;
      productUuid: string;
      variantUuid: string;
      lowStockLevel: number;
      lowStockAlert: boolean;
    }[]
  ) {
    await this.axiosInstance.post('/custom-low-stock', data);
  }
}

export default InventoryApiService;
