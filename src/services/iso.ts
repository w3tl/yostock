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
    return currencies.array.find(currency => currency.id === id)!;
  }

  getAllCountries(): Country[] {
    return countries.array;
  }

  getOneCountry(id: string): Country {
    return countries.array.find(country => country.id === id)!
  }

  getAllExchanges(): Exchange[] {
    return exchanges.array.map(({ countryId, ...other }) => ({
      ...other,
      countryId,
      country: this.getOneCountry(countryId),
    }));
    
  }

  getOneExchange(id: string): Exchange {
    return exchanges.array.find(exchange => exchange.id === id)!;
  }
}