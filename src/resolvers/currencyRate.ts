import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { CurrencyRateProvider } from "../entity/currencyRateProvider";
import { CurrencyRate } from "../entity/currencyRate";
import { CurrencyRateInput, CurrencyRatesInput } from "./types/currencyRate.input";
import { CurrencyServiceFactory } from "../services/currencyService";

@Service()
@Resolver(of => CurrencyRate)
export class CurrencyRateResolver {
  constructor(
    @InjectRepository(CurrencyRateProvider) private readonly currencyRateProviderRepository: Repository<CurrencyRateProvider>,
  ) {}

  @Query(returns => [CurrencyRate])
  async currencyRates(
    @Arg("input") pairInput: CurrencyRatesInput,
  ): Promise<CurrencyRate[]> {
    const provider = await this.currencyRateProviderRepository.findOne(pairInput.providerId);
    const service = CurrencyServiceFactory.createCurrencyService(provider);
    return service.getRates(pairInput.fromCurrency, pairInput.toCurrency, pairInput.fromDate, pairInput.toDate);
  }

  @Query(returns => CurrencyRate, { nullable: true })
  async currencyRate(
    @Arg("input") pairInput: CurrencyRateInput,
  ): Promise<CurrencyRate> {
    const provider = await this.currencyRateProviderRepository.findOne(pairInput.providerId);
    const service = CurrencyServiceFactory.createCurrencyService(provider);
    return service.getRate(pairInput.fromCurrency, pairInput.toCurrency, pairInput.date);
  }

  @FieldResolver()
  provider(@Root() currencyRate: CurrencyRate): Promise<CurrencyRateProvider> {
    return this.currencyRateProviderRepository.findOne(currencyRate.providerId);
  }
}