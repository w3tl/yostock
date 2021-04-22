import { Resolver, Query, Arg } from "type-graphql";
import { Inject, Service } from "typedi";
import { Currency } from "../entity/currency";
import { ISOService } from "../services/iso";

@Service()
@Resolver(() => Currency)
export class CurrencyResolver {
  @Inject()
  private readonly isoService: ISOService;

  @Query(() => [Currency])
  currencies(): Currency[] {
    return this.isoService.getAllCurrencies();
  }

  @Query(() => Currency, { nullable: true })
  currency(@Arg("id") id: string): Currency | undefined {
    return this.isoService.getOneCurrency(id);
  }
}