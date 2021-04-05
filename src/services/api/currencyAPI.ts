import { IAPIClient } from "../client/apiClient";
import { CurrencyRateProviderPair } from "../../entity/currencyRateProviderPair";
import { CurrencyRate } from "../../entity/currencyRate";

export interface ICurrencyAPI {
  readonly providerId: string;
  url: string;
  client: IAPIClient;

  getRates(fromDate: Date, toDate: Date, pairs: CurrencyRateProviderPair[]): Promise<CurrencyRate[]>;
}