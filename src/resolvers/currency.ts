import { Resolver, Query, Arg } from "type-graphql";
import { Inject, Service } from "typedi";
import { Currency } from "../entity/currency";
import { ISOService } from "../services/iso";

@Service()
@Resolver(of => Currency)
export class CurrencyResolver {
  @Inject()
  private readonly isoService: ISOService;

  @Query(returns => [Currency])
  currencies(): Currency[] {
    return this.isoService.getAllCurrencies();
  }

  @Query(returns => Currency, { nullable: true })
  currency(@Arg("id") id: string): Currency | undefined {
    return this.isoService.getOneCurrency(id);
  }
}