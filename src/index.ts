import { ApolloServer } from "apollo-server";
import schema from "./graphql/schema";

const PORT = process.env.PORT || 4000

const startServer = (): void => {
  try {
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