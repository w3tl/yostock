import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { createConnection, useContainer } from "typeorm";
import { CurrencyResolver } from "./resolvers/currency";
import { ExchangeResolver } from "./resolvers/exchange";
import { CountryResolver } from "./resolvers/country";
import { CurrencyRateResolver } from "./resolvers/currencyRate";
import { CurrencyRateProviderResolver } from "./resolvers/currencyRateProvider";
import { CurrencyRateProviderPairResolver } from "./resolvers/currencyRateProviderPair";

const PORT = process.env.PORT || 4000;

useContainer(Container);

const startServer = async (): Promise<void> => {
  try {
    const connection = await createConnection();
    await connection.runMigrations();

    const schema = await buildSchema({
      resolvers: [CurrencyResolver, ExchangeResolver, CountryResolver, CurrencyRateResolver, CurrencyRateProviderResolver, CurrencyRateProviderPairResolver],
      container: Container,
    });

    const server: ApolloServer = new ApolloServer({
      schema,
      playground: true,
    });

    server.listen({ port: PORT }, () =>
      console.log(`🚀 Server ready on port: ${PORT}`)
    )
  } catch (err) {
    console.log(`❌  Something went wrong: \n ${err}`)
  }
}

startServer();