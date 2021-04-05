import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Currency {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  symbol: string;
}