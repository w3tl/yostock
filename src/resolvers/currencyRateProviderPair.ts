import { Resolver, FieldResolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { CurrencyRateProviderPair } from "../entity/currencyRateProviderPair";
import { Currency } from "../entity/currency";
import { ISOService } from "../services/iso";

@Service()
@Resolver(() => CurrencyRateProviderPair)
export class CurrencyRateProviderPairResolver {
  constructor(
    @Inject() private readonly isoService: ISOService,
  ) {}

  @FieldResolver()
  fromCurrency(@Root() pair: CurrencyRateProviderPair): Currency {    
    return this.isoService.getOneCurrency(pair.fromCurrencyId);
  }

  @FieldResolver()
  toCurrency(@Root() pair: CurrencyRateProviderPair): Currency {    
    return this.isoService.getOneCurrency(pair.toCurrencyId);
  }
}