import { MetaApiResponse } from "./types";

const META_API_BASE = process.env.META_API_BASE_URL || "https://graph.facebook.com";
const META_API_VERSION = process.env.META_API_VERSION || "v25.0";

export class MetaApiClient {
  private accessToken: string;
  private baseUrl: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.baseUrl = `${META_API_BASE}/${META_API_VERSION}`;
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<MetaApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.set("access_token", this.accessToken);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
      }
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: "Unknown error" } }));
      throw new MetaApiError(
        error.error?.message || `Meta API error: ${response.status}`,
        response.status,
        error.error?.code
      );
    }

    return response.json();
  }

  async getAllPages<T>(endpoint: string, params?: Record<string, string>): Promise<T[]> {
    const allData: T[] = [];
    let nextUrl: string | undefined;

    // First request
    const firstResponse = await this.get<T>(endpoint, params);
    allData.push(...firstResponse.data);
    nextUrl = firstResponse.paging?.next;

    // Follow pagination
    while (nextUrl) {
      const response = await fetch(nextUrl);
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: "Unknown error" } }));
        throw new MetaApiError(
          error.error?.message || `Meta API error: ${response.status}`,
          response.status,
          error.error?.code
        );
      }

      const data: MetaApiResponse<T> = await response.json();
      allData.push(...data.data);
      nextUrl = data.paging?.next;

      // Rate limit protection: small delay between pages
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    return allData;
  }

  async getSingle<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.set("access_token", this.accessToken);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
      }
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: "Unknown error" } }));
      throw new MetaApiError(
        error.error?.message || `Meta API error: ${response.status}`,
        response.status,
        error.error?.code
      );
    }

    return response.json();
  }
}

export class MetaApiError extends Error {
  public statusCode: number;
  public metaErrorCode?: number;

  constructor(message: string, statusCode: number, metaErrorCode?: number) {
    super(message);
    this.name = "MetaApiError";
    this.statusCode = statusCode;
    this.metaErrorCode = metaErrorCode;
  }
}
