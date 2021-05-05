import { ObjectType, Field } from "type-graphql";
import { Entity, PrimaryColumn, Column, Index } from "typeorm";
import { Country } from "./country";
import { Currency } from "./currency";
import { CurrencyRateProviderPair } from "./currencyRateProviderPair";

@Entity()
@ObjectType()
export class CurrencyRateProvider {
  @PrimaryColumn({ type: "varchar", length: 10 })
  @Index({ unique: true })
  @Field()
  id: string;

  @Column({ type: "varchar" })
  @Field()
  name: string;

  @Column({ type: "varchar" })
  @Field()
  url: string;

  @Column({ type: "varchar" })
  @Field()
  serviceUrl!: string;

  @Column({ type: "boolean" })
  @Field()
  enabled!: boolean;

  @Column({ type: "varchar", length: 3 })
  currencyId!: string;

  @Field(() => Currency)
  currency: Currency;

  @Column({ type: "varchar" })
  countryId!: string;

  @Field(() => Country)
  country: Country;

  @Field(() => [CurrencyRateProviderPair])
  pairs: CurrencyRateProviderPair[]
}