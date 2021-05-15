import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { CurrencyRateProvider } from "../entity/currencyRateProvider";
import { CurrencyRateProviderPair } from "../entity/currencyRateProviderPair";
import { Country } from "../entity/country";
import { Currency } from "../entity/currency";
import { ISOService } from "../services/iso";

@Service()
@Resolver(() => CurrencyRateProvider)
export class CurrencyRateProviderResolver {
  constructor(
    @Inject() private readonly isoService: ISOService,
    @InjectRepository(CurrencyRateProvider) private readonly currencyRateProviderRepository: Repository<CurrencyRateProvider>,
    @InjectRepository(CurrencyRateProviderPair) private readonly currencyRateProviderPairRepository: Repository<CurrencyRateProviderPair>,
  ) {}

  @Query(() => [CurrencyRateProvider])
  currencyRateProviders(): Promise<CurrencyRateProvider[]> {
    return this.currencyRateProviderRepository.find();
  }

  @Query(() => CurrencyRateProvider, { nullable: true })
  currencyRateProvider(@Arg("providerId") providerId: string): Promise<CurrencyRateProvider | undefined> {
    return this.currencyRateProviderRepository.findOne(providerId);
  }

  @FieldResolver()
  country(@Root() currencyRateProvider: CurrencyRateProvider): Country {
    return this.isoService.getOneCountry(currencyRateProvider.countryId);
  }

  @FieldResolver()
  currency(@Root() currencyRateProvider: CurrencyRateProvider): Currency {
    return this.isoService.getOneCurrency(currencyRateProvider.currencyId);
  }

  @FieldResolver()
  pairs(@Root() currencyRateProvider: CurrencyRateProvider): Promise<CurrencyRateProviderPair[]> {
    return this.currencyRateProviderPairRepository.find({ providerId: currencyRateProvider.id });
  }
}