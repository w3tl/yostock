import { IResolvers } from "graphql-tools";
import countriesResolver from "./Countries/Countries";

import booksResolver from "./Countries/Countries";

const resolvers: IResolvers[] = [countriesResolver]

export default resolvers