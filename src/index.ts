import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import { useContainer } from "typeorm";
import { createSchema } from "./resolvers";
import { connection } from "./connection";

const PORT = process.env.PORT || 4000;

useContainer(Container);

const startServer = async (): Promise<void> => {
  try {
    await connection();

    const schema = await createSchema();

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