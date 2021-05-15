import { InputType, Field, GraphQLISODateTime, ObjectType } from "type-graphql";
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
  
  @Field(() => CurrencyRateProvider)
  @ManyToOne(() => CurrencyRateProvider)
  provider: CurrencyRateProvider;

  @PrimaryColumn({ type: "varchar", length: 10 })
  @RelationId((rate: CurrencyRate) => rate.provider)
  providerId: string;
}

@InputType()
export class CurrencyRateUpdateInput {
  @Field()
  providerId: string;

  @Field(() => GraphQLISODateTime)
  fromDate: Date;

  @Field(() => GraphQLISODateTime)
  toDate: Date;
}

@ObjectType()
export class CurrencyRateUpdatePayload {
  @Field()
  loaded: number;
}

@InputType()
export class CurrencyRateInput {
  @Field()
  fromCurrency: string;
  @Field()
  toCurrency: string;
  @Field(() => GraphQLISODateTime)
  fromDate: Date;
  @Field(() => GraphQLISODateTime, { nullable: true })
  toDate: Date;
  @Field()
  providerId: string;
}