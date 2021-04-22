import { Resolver, Query, Arg } from "type-graphql";
import { Inject, Service } from "typedi";
import { Country } from "../entity/country";
import { ISOService } from "../services/iso";

@Service()
@Resolver(() => Country)
export class CountryResolver {
  @Inject()
  private readonly isoService: ISOService;

  @Query(() => [Country])
  countries(): Country[] {
    return this.isoService.getAllCountries();
  }

  @Query(() => Country, { nullable: true })
  country(@Arg("id") id: string): Country | undefined {
    return this.isoService.getOneCountry(id);
  }
}