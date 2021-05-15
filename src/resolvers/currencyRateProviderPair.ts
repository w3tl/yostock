import { Resolver, FieldResolver, Root } from "type-graphql";
import { Repository } from "typeorm";
import { Inject, Service } from "typedi";
import { CurrencyRateProviderPair } from "../entity/currencyRateProviderPair";
import { Currency } from "../entity/currency";
import { ISOService } from "../services/iso";
import { CurrencyRateProvider } from "../entity/currencyRateProvider";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
@Resolver(() => CurrencyRateProviderPair)
export class CurrencyRateProviderPairResolver {
  constructor(
    @Inject() private readonly isoService: ISOService,
    @InjectRepository(CurrencyRateProvider) private readonly currencyRateProviderRepository: Repository<CurrencyRateProvider>,
  ) {}

  @FieldResolver()
  fromCurrency(@Root() pair: CurrencyRateProviderPair): Currency {    
    return this.isoService.getOneCurrency(pair.fromCurrencyId);
  }

  @FieldResolver()
  toCurrency(@Root() pair: CurrencyRateProviderPair): Currency {    
    return this.isoService.getOneCurrency(pair.toCurrencyId);
  }

  @FieldResolver()
  provider(@Root() pair: CurrencyRateProviderPair): Promise<CurrencyRateProvider | undefined> {
    return this.currencyRateProviderRepository.findOne(pair.providerId);
  }
}