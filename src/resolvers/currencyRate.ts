import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Between, LessThanOrEqual, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { CurrencyRateProvider } from "../entity/currencyRateProvider";
import { CurrencyRate, CurrencyRateInput, CurrencyRatesInput } from "../entity/currencyRate";

@Service()
@Resolver(() => CurrencyRate)
export class CurrencyRateResolver {
  constructor(
    @InjectRepository(CurrencyRateProvider) private readonly currencyRateProviderRepository: Repository<CurrencyRateProvider>,
    @InjectRepository(CurrencyRate) private readonly currencyRateRepository: Repository<CurrencyRate>,
  ) {}

  @Query(() => [CurrencyRate])
  async currencyRates(
    @Arg("input") pairInput: CurrencyRatesInput,
  ): Promise<CurrencyRate[]> {
    return this.currencyRateRepository.find({
      providerId: pairInput.providerId,
      from: pairInput.fromCurrency,
      to: pairInput.toCurrency,
      validFrom: Between(pairInput.fromDate.toISOString().split("T")[0], pairInput.toDate.toISOString().split("T")[0]),
    });
  }

  @Query(() => CurrencyRate, { nullable: true })
  async currencyRate(
    @Arg("input") pairInput: CurrencyRateInput,
  ): Promise<CurrencyRate> {
    return this.currencyRateRepository.findOne({
      providerId: pairInput.providerId,
      from: pairInput.fromCurrency,
      to: pairInput.toCurrency,
      validFrom: LessThanOrEqual(pairInput.date.toISOString().split("T")[0]),
    }, {
      order: {
        validFrom: "DESC",
      },
    });
  }

  @FieldResolver()
  provider(@Root() currencyRate: CurrencyRate): Promise<CurrencyRateProvider> {
    return this.currencyRateProviderRepository.findOne(currencyRate.providerId);
  }
}