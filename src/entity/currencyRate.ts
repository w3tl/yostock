import { ObjectType, Field } from "type-graphql";
import { Entity, ManyToOne, PrimaryColumn, Column, RelationId, Index } from "typeorm";
import { CurrencyRateProvider } from "./currencyRateProvider";

@ObjectType()
@Entity()
@Index(["providerId", "from", "to", "validFrom"], { unique: true })
export class CurrencyRate {
  @PrimaryColumn({ type: "varchar", length: 3 })
  @Field()
  from: string;

  @PrimaryColumn({ type: "varchar", length: 3 })
  @Field()
  to: string;

  @PrimaryColumn({ type: "date" })
  @Field()
  validFrom: string;

  @Column({ type: "float" })
  @Field()
  rate: number;
  
  @Field(type => CurrencyRateProvider)
  @ManyToOne(() => CurrencyRateProvider)
  provider: CurrencyRateProvider;

  @PrimaryColumn({ type: "varchar", length: 10 })
  @RelationId((rate: CurrencyRate) => rate.provider)
  providerId: string;
}