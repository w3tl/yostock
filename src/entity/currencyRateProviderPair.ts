import { ObjectType, Field } from "type-graphql";
import { Entity, ManyToOne, PrimaryColumn, RelationId, Index } from "typeorm";
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

  @Field(() => Currency)
  fromCurrency: Currency;

  @Field(() => Currency)
  toCurrency: Currency;

  @PrimaryColumn({ type: "varchar", length: 10 })
  @RelationId((pair: CurrencyRateProviderPair) => pair.provider)
  providerId: string;

  @Field(() => CurrencyRateProvider)
  @ManyToOne(() => CurrencyRateProvider)
  provider: CurrencyRateProvider;
}