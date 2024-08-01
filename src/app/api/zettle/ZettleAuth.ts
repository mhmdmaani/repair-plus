import axios, { AxiosResponse } from 'axios';

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
}

export class ZettleOAuthService {
  private baseURL: string;
  private clientId: string;
  private redirectUri: string;
  private apiKey: string;

  constructor() {
    this.baseURL = 'https://oauth.zettle.com';
    this.clientId = process.env.ZETTLE_CLIENT_ID || '';
    this.redirectUri = process.env.ZETTLE_REDIRECT_URI || '';
    this.apiKey = process.env.ZETTLE_API_KEY || '';
  }

  /**
   * Retrieve an access token using the JWT bearer token grant type
   * @param apiKey - The API key (JWT assertion) provided by the user
   * @returns A promise that resolves to the access token response
   */
  public async retrieveAccessToken(): Promise<AccessTokenResponse> {
    const payload = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      client_id: this.clientId,
      assertion: this.apiKey,
    });

    try {
      const response: AxiosResponse<AccessTokenResponse> = await axios.post(
        `${this.baseURL}/token`,
        payload.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to retrieve access token: ${error}`);
    }
  }

  /**
   * Initiates the authorization code grant flow
   * @param oauthScope - The OAuth scope for the requested access
   * @param stateValue - An optional state parameter for the request
   * @returns The authorization URL to redirect the user
   */
  public getAuthorizationUrl(oauthScope: string, stateValue?: string): string {
    const params = new URLSearchParams({
      response_type: 'code',
      scope: oauthScope,
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
    });

    if (stateValue) {
      params.append('state', stateValue);
    }

    return `${this.baseURL}/authorize?${params.toString()}`;
  }
}
