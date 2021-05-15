import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Between, MoreThanOrEqual, Repository } from "typeorm";
import { CurrencyRateProvider } from "../entity/currencyRateProvider";
import { CurrencyRate, CurrencyRateInput } from "../entity/currencyRate";

@Service()
@Resolver(() => CurrencyRate)
export class CurrencyRateResolver {
  constructor(
    @InjectRepository(CurrencyRate) private readonly currencyRateRepository: Repository<CurrencyRate>,
    @InjectRepository(CurrencyRateProvider) private readonly currencyRateProviderRepository: Repository<CurrencyRateProvider>,
  ) {}

  @Query(() => [CurrencyRate])
  async currencyRate(
    @Arg("input") pairInput: CurrencyRateInput,
  ): Promise<CurrencyRate[]> {
    return this.currencyRateRepository.find({
      providerId: pairInput.providerId,
      from: pairInput.fromCurrency,
      to: pairInput.toCurrency,
      validFrom:
        pairInput.toDate 
          ? Between(pairInput.fromDate.toISOString().split("T")[0], pairInput.toDate.toISOString().split("T")[0])
          : MoreThanOrEqual(pairInput.fromDate.toISOString().split("T")[0]),
    });
  }

  @FieldResolver()
  provider(@Root() currencyRate: CurrencyRate): Promise<CurrencyRateProvider | undefined> {
    return this.currencyRateProviderRepository.findOne(currencyRate.providerId);
  }
}