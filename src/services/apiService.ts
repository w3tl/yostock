import { CurrencyRate } from "../entity/currencyRate";
import { IAPIClient } from "./client/apiClient";
import { ICurrencyAPI } from "./api/currencyAPI";
import { CurrencyService } from "./currencyService";

type ExchangeIndex = {
};


export interface IExchangeService extends ICurrencyAPI {
  getIndexes(): Promise<ExchangeIndex[]>;
}

export class MOEXExchangeService implements IExchangeService {
  readonly providerId: string;
  url: string;
  client: IAPIClient;

  async getRates(): Promise<CurrencyRate[]> {
    return null;
  }

  async getIndexes(): Promise<ExchangeIndex[]> {
    return [];
  }
}

export class ExchangeService extends CurrencyService {
  constructor(protected service: IExchangeService) {
    super(service);
  }

  async getIndexes(): Promise<ExchangeIndex[]> {
    return this.service.getIndexes();
  }
}