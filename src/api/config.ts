import { cookies } from 'next/headers';

interface CustomFetchOptions extends RequestInit {
  headers?: HeadersInit;
}

async function customFetch(
  url: string,
  options: CustomFetchOptions = {}
): Promise<Response> {
  'use server';
  // Add the base URL to the request
  const fullUrl = url;

  // Get the token from localStorage
  const token = cookies().has('token') ? cookies().get('token') : undefined;

  // Set headers
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  // Setup fetch options
  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  // Make the fetch request
  const response = await fetch(fullUrl, fetchOptions);

  // You can add additional error handling here if needed

  return response;
}

export const fetchInstance = customFetch;
