import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Country {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  number: number;
}