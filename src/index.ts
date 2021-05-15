import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import { useContainer } from "typeorm";
import { createSchema } from "./resolvers";
import { connection as createConnection } from "./connection";

const PORT = process.env.PORT || 4000;

useContainer(Container);

const startServer = async (): Promise<void> => {
  try {
    await createConnection();

    const schema = await createSchema();

    const server: ApolloServer = new ApolloServer({
      schema,
      playground: true,
    });

    server.listen({ port: PORT }, () =>
      console.log(`🚀 Server ready on port: ${PORT}`)
    );
  } catch (err) {
    console.error(`❌  Something went wrong: \n ${err.stack}`);
  }
}

startServer();