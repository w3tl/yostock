import { IResolvers } from "graphql-tools"

interface CountryType {
  id: string;
  name: string;
  number: number;
}

const countries = [
  { id: "1", name: "First Book", number: 631 },
]

const countriesResolver: IResolvers = {
  Query: {
    countries: (): CountryType[] => countries,
  },
}

export default countriesResolver