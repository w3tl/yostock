import * as http from "http";
import { IAPIClient, IResponse } from "./apiClient";

export class HTTPClient implements IAPIClient {
  async get<T>(url: string, params: Record<string, string>): Promise<IResponse<T>> {
    const apiURL: URL = new URL(url);
    Object.keys(params).forEach(key => apiURL.searchParams.append(key, params[key]));
    
    return new Promise((resolve, reject) => {
      http.get(apiURL, (res: http.IncomingMessage) => {
        const { statusCode } = res;        
        const response: IResponse<T> = {
          statusCode,
          result: null,
        };

        if (statusCode === 200) {
          let buffer: Buffer = Buffer.alloc(0);
          // res.setEncoding("utf-8");
          res.on("data", data => {
            const chunk = (typeof data === 'string') ? Buffer.from(data, "utf-8") : data;
            buffer = Buffer.concat([buffer, chunk]);        
          });
          res.on("end", () => {
            response.result = buffer.toString("utf-8");
            resolve(response);
          });
        } else {
          reject(response);
        }
      });
    });
  }
}