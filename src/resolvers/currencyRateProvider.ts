import { Resolver, Query, Arg, FieldResolver, Root, Mutation } from "type-graphql";
import { Inject, Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { CurrencyRateProvider } from "../entity/currencyRateProvider";
import { CurrencyRateProviderPair } from "../entity/currencyRateProviderPair";
import { Country } from "../entity/country";
import { Currency } from "../entity/currency";
import { ISOService } from "../services/iso";
import { CurrencyRate } from "../entity/currencyRate";
import { CurrencyRateUpdateInput, CurrencyRateUpdatePayload } from "./types/currencyRate.input";
import { CurrencyServiceFactory } from "../services/currencyService";

@Service()
@Resolver(of => CurrencyRateProvider)
export class CurrencyRateProviderResolver {
  constructor(
    @Inject() private readonly isoService: ISOService,
    @InjectRepository(CurrencyRate) private readonly currencyRateRepository: Repository<CurrencyRate>,
    @InjectRepository(CurrencyRateProvider) private readonly currencyRateProviderRepository: Repository<CurrencyRateProvider>,
    @InjectRepository(CurrencyRateProviderPair) private readonly currencyRateProviderPairRepository: Repository<CurrencyRateProviderPair>,
  ) {}

  @Query(returns => [CurrencyRateProvider])
  currencyRateProviders(): Promise<CurrencyRateProvider[]> {
    return this.currencyRateProviderRepository.find();
  }

  @Query(returns => CurrencyRateProvider, { nullable: true })
  currencyRateProvider(@Arg("providerId") providerId: string): Promise<CurrencyRateProvider> {
    return this.currencyRateProviderRepository.findOne(providerId);
  }

  @FieldResolver()
  country(@Root() currencyRateProvider: CurrencyRateProvider): Country {
    return this.isoService.getOneCountry(currencyRateProvider.countryId);
  }

  @FieldResolver()
  currency(@Root() currencyRateProvider: CurrencyRateProvider): Currency {
    console.log(currencyRateProvider.currencyId);
    
    return this.isoService.getOneCurrency(currencyRateProvider.currencyId);
  }

  @FieldResolver()
  pairs(@Root() currencyRateProvider: CurrencyRateProvider): Promise<CurrencyRateProviderPair[]> {
    return this.currencyRateProviderPairRepository.find({ providerId: currencyRateProvider.id });
  }

  @Mutation(returns => CurrencyRateUpdatePayload)
  async updateCurrencyRates(
    @Arg("input") requestInput: CurrencyRateUpdateInput,
  ): Promise<CurrencyRateUpdatePayload> {
    const provider = await this.currencyRateProviderRepository.findOne(requestInput.providerId);
    const currencyService = CurrencyServiceFactory.createCurrencyService(provider);
    const rates = await currencyService.updateRates(requestInput.fromDate, requestInput.toDate);

    return {
      loaded: rates.length,
    };
  }
}