import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { Exchange } from "../entity/exchange";
import { Country } from "../entity/country";
import { ISOService } from "../services/iso";

@Service()
@Resolver(() => Exchange)
export class ExchangeResolver {
  @Inject()
  private readonly isoService: ISOService;

  @Query(() => [Exchange])
  exchanges(): Exchange[] {
    return this.isoService.getAllExchanges();
  }

  @Query(() => Exchange, { nullable: true })
  exchange(@Arg("id") id: string): Exchange | undefined {
    return this.isoService.getOneExchange(id);
  }

  @FieldResolver()
  country(@Root() exchange: Exchange): Country {
    return this.isoService.getOneCountry(exchange.countryId);
  }
}