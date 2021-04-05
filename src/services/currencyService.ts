import { Between, getRepository, LessThanOrEqual, Repository } from "typeorm";
import { CurrencyRate } from "../entity/currencyRate";
import { CurrencyRateProvider } from "../entity/currencyRateProvider";
import { CurrencyRateProviderPair } from "../entity/currencyRateProviderPair";
import { HTTPClient } from "./client/httpClient";
import { CBRFCurrencyAPI } from "./api/CBRFCurrencyAPI";
import { ICurrencyAPI } from "./api/currencyAPI";

export type CurrencyRateServicePairRequest = {
  from: string,
  to: string,
};

export class CurrencyServiceFactory {
  static createCurrencyService(provider: CurrencyRateProvider): CurrencyService {
    if (provider.id === "CBRF") {
      const currencyAPI = new CBRFCurrencyAPI(provider.id, provider.serviceUrl);
      currencyAPI.client = new HTTPClient();
      return new CurrencyService(currencyAPI);
    }

    return null;
  }
}

export class CurrencyService {
  private readonly currencyRateRepository: Repository<CurrencyRate>;
  private readonly currencyRateProviderPairRepository: Repository<CurrencyRateProviderPair>;

  constructor(protected readonly service: ICurrencyAPI) {
    this.currencyRateRepository = getRepository(CurrencyRate);
    this.currencyRateProviderPairRepository = getRepository(CurrencyRateProviderPair);
  }

  getRate(fromCurrency: string, toCurrency: string, date: Date): Promise<CurrencyRate> {
    return this.currencyRateRepository.findOne({
      providerId: this.service.providerId,
      from: fromCurrency,
      to: toCurrency,
      validFrom: LessThanOrEqual(date.toISOString().split("T")[0]),
    }, {
      order: {
        validFrom: "DESC",
      },
    });
  }

  getRates(fromCurrency: string, toCurrency: string, fromDate: Date, toDate: Date): Promise<CurrencyRate[]> {
    return this.currencyRateRepository.find({
      providerId: this.service.providerId,
      from: fromCurrency,
      to: toCurrency,
      validFrom: Between(fromDate.toISOString().split("T")[0], toDate.toISOString().split("T")[0]),
    });
  }

  async updateRates(fromDate: Date, toDate: Date): Promise<CurrencyRate[]> {
    const pairs = await this.currencyRateProviderPairRepository.find({ providerId: this.service.providerId });
    const rates = await this.service.getRates(fromDate, toDate, pairs);
    return this.currencyRateRepository.save(rates);
  }
}