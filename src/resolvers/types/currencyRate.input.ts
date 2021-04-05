import { fieldToFieldConfig } from "graphql-tools";
import { InputType, Field, GraphQLISODateTime, ObjectType } from "type-graphql";
import { CurrencyRate } from "../../entity/currencyRate";

@InputType()
export class CurrencyRateUpdateInput {
  @Field()
  providerId: string;

  @Field(type => GraphQLISODateTime)
  fromDate: Date;

  @Field(type => GraphQLISODateTime)
  toDate: Date;
}

@ObjectType()
export class CurrencyRateUpdatePayload {
  @Field()
  loaded: number;
}

@InputType()
export class CurrencyRateInput {
  @Field({ nullable: true })
  fromCurrency: string;
  @Field({ nullable: true })
  toCurrency: string;
  @Field(type => GraphQLISODateTime)
  date: Date;
  @Field()
  providerId: string;
}

@InputType()
export class CurrencyRatesInput {
  @Field({ nullable: true })
  fromCurrency: string;
  @Field({ nullable: true })
  toCurrency: string;
  @Field(type => GraphQLISODateTime)
  fromDate: Date;
  @Field(type => GraphQLISODateTime)
  toDate: Date;
  @Field()
  providerId: string;
}