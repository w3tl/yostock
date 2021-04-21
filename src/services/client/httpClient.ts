import fetch from "node-fetch";
import { IAPIClient, IResponse } from "./apiClient";

export class HTTPClient implements IAPIClient {
  async get<T>(url: string, params?: Record<string, string>): Promise<IResponse<T>> {
    const callURL: URL = new URL(url);
    if (params) {
      Object.keys(params).forEach(key => callURL.searchParams.append(key, params[key]));
    }

    const response = await fetch(callURL.toString());

    const resp: IResponse<T> = {
      statusCode: response.status,
      result: null,
    };

    resp.result = await response.text();

    return resp;
  }
}