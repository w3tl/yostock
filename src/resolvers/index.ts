import { Container } from "typedi";
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { CurrencyResolver } from "./currency";
import { ExchangeResolver } from "./exchange";
import { CountryResolver } from "./country";
import { CurrencyRateResolver } from "./currencyRate";
import { CurrencyRateProviderResolver } from "./currencyRateProvider";
import { CurrencyRateProviderPairResolver } from "./currencyRateProviderPair";

export const createSchema = (): Promise<GraphQLSchema> => buildSchema({
  resolvers: [CurrencyResolver, ExchangeResolver, CountryResolver, CurrencyRateResolver, CurrencyRateProviderResolver, CurrencyRateProviderPairResolver],
  container: Container,
});
