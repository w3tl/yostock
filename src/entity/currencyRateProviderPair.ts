import { ObjectType, Field, ID } from "type-graphql";
import { Entity, ManyToOne, PrimaryColumn, Column, RelationId, Index } from "typeorm";
import { Currency } from "./currency";
import { CurrencyRateProvider } from "./currencyRateProvider";

@Entity()
@ObjectType()
@Index(["providerId", "fromCurrencyId", "toCurrencyId"], { unique: true })
export class CurrencyRateProviderPair {
  @PrimaryColumn({ type: "varchar", length: 3 })
  fromCurrencyId: string;

  @PrimaryColumn({ type: "varchar", length: 3 })
  toCurrencyId: string;

  @Field(type => Currency)
  fromCurrency: Currency;

  @Field(type => Currency)
  toCurrency: Currency;

  @PrimaryColumn({ type: "varchar", length: 10 })
  @RelationId((pair: CurrencyRateProviderPair) => pair.provider)
  providerId: string;

  @Field(type => CurrencyRateProvider)
  @ManyToOne(type => CurrencyRateProvider)
  provider: CurrencyRateProvider;
}