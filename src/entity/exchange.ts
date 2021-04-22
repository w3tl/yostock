import { ObjectType, Field } from "type-graphql";
import { Country } from "./country";

@ObjectType()
export class Exchange {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  url: string;

  @Field(() => Country)
  country: Country;

  countryId: string;
}
  // shares: [Share]