import { Resolver, Query, Arg } from "type-graphql";
import { Inject, Service } from "typedi";
import { Country } from "../entity/country";
import { ISOService } from "../services/iso";

@Service()
@Resolver(of => Country)
export class CountryResolver {
  @Inject()
  private readonly isoService: ISOService;

  @Query(returns => [Country])
  countries(): Country[] {
    return this.isoService.getAllCountries();
  }

  @Query(returns => Country, { nullable: true })
  country(@Arg("id") id: string): Country | undefined {
    return this.isoService.getOneCountry(id);
  }
}