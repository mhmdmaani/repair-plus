import axios, { AxiosInstance } from 'axios';

class ZettleProductApiService {
  private axiosInstance: AxiosInstance;
  private baseURL = 'https://products.izettle.com';

  constructor(private token: string) {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // Categories
  async getCategories(organizationUuid: string) {
    const response = await this.axiosInstance.get(
      `/organizations/${organizationUuid}/categories/v2`
    );
    return response.data;
  }

  async createCategory(organizationUuid: string, category: any) {
    const response = await this.axiosInstance.post(
      `/organizations/${organizationUuid}/categories/v2`,
      category
    );
    return response.data;
  }

  async deleteCategory(organizationUuid: string, categoryUuid: string) {
    await this.axiosInstance.delete(
      `/organizations/${organizationUuid}/categories/v2/${categoryUuid}`
    );
  }

  async renameCategory(
    organizationUuid: string,
    categoryUuid: string,
    name: string
  ) {
    await this.axiosInstance.patch(
      `/organizations/${organizationUuid}/categories/v2/${categoryUuid}`,
      { name }
    );
  }

  // Discounts
  async getDiscounts(organizationUuid: string) {
    const response = await this.axiosInstance.get(
      `/organizations/${organizationUuid}/discounts`
    );
    return response.data;
  }

  async createDiscount(organizationUuid: string, discount: any) {
    const response = await this.axiosInstance.post(
      `/organizations/${organizationUuid}/discounts`,
      discount
    );
    return response.data;
  }

  async getDiscount(organizationUuid: string, discountUuid: string) {
    const response = await this.axiosInstance.get(
      `/organizations/${organizationUuid}/discounts/${discountUuid}`
    );
    return response.data;
  }

  async updateDiscount(
    organizationUuid: string,
    discountUuid: string,
    discount: any,
    ifMatch: string
  ) {
    await this.axiosInstance.put(
      `/organizations/${organizationUuid}/discounts/${discountUuid}`,
      discount,
      {
        headers: {
          'If-Match': ifMatch,
        },
      }
    );
  }

  async deleteDiscount(organizationUuid: string, discountUuid: string) {
    await this.axiosInstance.delete(
      `/organizations/${organizationUuid}/discounts/${discountUuid}`
    );
  }

  // Imports
  async getImportStatus(organizationUuid: string) {
    const response = await this.axiosInstance.get(
      `/organizations/${organizationUuid}/import/status`
    );
    return response.data;
  }

  async getImportStatusByUuid(organizationUuid: string, importUuid: string) {
    const response = await this.axiosInstance.get(
      `/organizations/${organizationUuid}/import/status/${importUuid}`
    );
    return response.data;
  }

  async importLibraryItems(organizationUuid: string, products: any) {
    const response = await this.axiosInstance.post(
      `/organizations/${organizationUuid}/import/v2`,
      products
    );
    return response.data;
  }

  // Images
  async getImages(organizationUuid: string) {
    const response = await this.axiosInstance.get(
      `/organizations/${organizationUuid}/images`
    );
    return response.data;
  }

  // Library
  async getLibrary(
    organizationUuid: string,
    eventLogUuid?: string,
    limit: number = 500,
    offset: string = '',
    all: boolean = false
  ) {
    const response = await this.axiosInstance.get(
      `/organizations/${organizationUuid}/library`,
      {
        params: {
          eventLogUuid,
          limit,
          offset,
          all,
        },
      }
    );
    return response.data;
  }

  // Products
  async createProductSlug(organizationUuid: string, productName: string) {
    const response = await this.axiosInstance.post(
      `/organizations/${organizationUuid}/products/online/slug`,
      { productName }
    );
    return response.data;
  }

  async getProductOptions(organizationUuid: string) {
    const response = await this.axiosInstance.get(
      `/organizations/${organizationUuid}/products/options`
    );
    return response.data;
  }

  async getProductCount(organizationUuid: string) {
    const response = await this.axiosInstance.get(
      `/organizations/${organizationUuid}/products/v2/count`
    );
    return response.data;
  }

  async getProducts(organizationUuid: string) {
    const response = await this.axiosInstance.get(
      `/organizations/${organizationUuid}/products`
    );
    return response.data;
  }

  async createProduct(
    organizationUuid: string,
    product: any,
    returnEntity: boolean = false
  ) {
    const response = await this.axiosInstance.post(
      `/organizations/${organizationUuid}/products`,
      product,
      {
        params: {
          returnEntity,
        },
      }
    );
    return response.data;
  }

  async deleteProducts(organizationUuid: string, uuids: string[]) {
    await this.axiosInstance.delete(
      `/organizations/${organizationUuid}/products`,
      {
        params: {
          uuid: uuids,
        },
      }
    );
  }

  async getProduct(
    organizationUuid: string,
    productUuid: string,
    ifNoneMatch?: string
  ) {
    const response = await this.axiosInstance.get(
      `/organizations/${organizationUuid}/products/${productUuid}`,
      {
        headers: {
          'If-None-Match': ifNoneMatch,
        },
      }
    );
    return response.data;
  }

  async updateProduct(
    organizationUuid: string,
    productUuid: string,
    product: any,
    ifMatch: string
  ) {
    await this.axiosInstance.put(
      `/organizations/${organizationUuid}/products/v2/${productUuid}`,
      product,
      {
        headers: {
          'If-Match': ifMatch,
        },
      }
    );
  }

  async deleteProduct(organizationUuid: string, productUuid: string) {
    await this.axiosInstance.delete(
      `/organizations/${organizationUuid}/products/${productUuid}`
    );
  }

  async getProductsV2(organizationUuid: string, sort: boolean = false) {
    const response = await this.axiosInstance.get(
      `/organizations/${organizationUuid}/products/v2`,
      {
        params: {
          sort,
        },
      }
    );
    return response.data;
  }

  // Taxes
  async getTaxes() {
    const response = await this.axiosInstance.get('/v1/taxes');
    return response.data;
  }

  async createTaxes(taxes: any) {
    const response = await this.axiosInstance.post('/v1/taxes', taxes);
    return response.data;
  }

  async getTax(taxRateUuid: string) {
    const response = await this.axiosInstance.get(`/v1/taxes/${taxRateUuid}`);
    return response.data;
  }

  async updateTax(taxRateUuid: string, taxRate: any) {
    const response = await this.axiosInstance.put(
      `/v1/taxes/${taxRateUuid}`,
      taxRate
    );
    return response.data;
  }

  async deleteTax(taxRateUuid: string) {
    await this.axiosInstance.delete(`/v1/taxes/${taxRateUuid}`);
  }

  async getTaxCounts() {
    const response = await this.axiosInstance.get('/v1/taxes/count');
    return response.data;
  }

  async getTaxSettings() {
    const response = await this.axiosInstance.get('/v1/taxes/settings');
    return response.data;
  }

  async updateTaxSettings(taxSettings: any) {
    const response = await this.axiosInstance.put(
      '/v1/taxes/settings',
      taxSettings
    );
    return response.data;
  }
}

export default ZettleProductApiService;
