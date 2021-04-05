import { Service } from "typedi";
import { Currency } from "../entity/currency";
import { Country } from "../entity/country";
import { Exchange } from "../entity/exchange";
import { currencies, countries, exchanges } from "./data.json";

@Service()
export class ISOService {

  getAllCurrencies(): Currency[] {
    return currencies.array;
  }

  getOneCurrency(id: string): Currency {
    return currencies.keys[id];
  }

  getAllCountries(): Country[] {
    return countries.array;
  }

  getOneCountry(id: string): Country {
    return countries.keys[id];
  }

  getAllExchanges(): Exchange[] {
    return exchanges.array.map(({ countryId, ...other }) => ({
      ...other,
      countryId,
      country: this.getOneCountry(countryId),
    }));
  }

  getOneExchange(id: string): Exchange {
    return exchanges.keys[id];
  }
}