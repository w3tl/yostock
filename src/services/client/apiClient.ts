export interface IResponse<T> {
  statusCode: number,
  result: T | string,
}

// export interface IRequestOptions {
  // responseProcessor?: Function,
  //Dates aren't automatically deserialized by JSON, this adds a date reviver to ensure they aren't just left as strings
  // deserializeDates?: boolean,
  // queryParameters?: ifm.IRequestQueryParams
// }

export interface IAPIClient {
  get<T>(url: string, params: Record<string, string>): Promise<IResponse<T>>;
}