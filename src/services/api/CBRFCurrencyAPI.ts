import * as parser from "fast-xml-parser";
import { IAPIClient } from "../client/apiClient";
import { ICurrencyAPI } from "./currencyAPI";
import { CurrencyRate } from "../../entity/currencyRate";
import { CurrencyRateProviderPair } from "../../entity/currencyRateProviderPair";

type CBRFCurrenciesValueType = {
  Item: CBRFCurrenciesItemType[];
};

type CBRFCurrenciesItemAttributesType = {
  ID: string;
};

type CBRFCurrenciesItemType = {
  attributes: CBRFCurrenciesItemAttributesType;
  ISO_Char_Code: string;
};

type CBRFCurrenciesType = {
  Valuta: CBRFCurrenciesValueType;
};

type CBRFRateItemAttributesType = {
  Date: string,
  Id: string,
};

type CBRFRateItemType = {
  attributes: CBRFRateItemAttributesType,
  Nominal: number,
  Value: string,
};

type CBRFRateAttributesType = {
  ID: string,
  DateRange1: string,
  DateRange2: string,
  name: string,
};

type CBRFRateType = {
  attributes: CBRFRateAttributesType,
  Record: CBRFRateItemType | CBRFRateItemType[],
};

export class CBRFCurrencyAPI implements ICurrencyAPI {
  providerId: string;
  url: string;
  client: IAPIClient;

  private readonly currenciesPath = "XML_valFull.asp";
  private readonly ratesDailyPath = "XML_daily.asp";
  private readonly ratesDynamicPath = "XML_dynamic.asp";

  private readonly xmlOptions: Partial<parser.X2jOptions> = {
    attrNodeName: "attributes",
    textNodeName: "#text",
    attributeNamePrefix: "",
    arrayMode: false,
    ignoreAttributes: false,
    parseAttributeValue: false,
  };

  constructor(providerId: string, url: string) {
    this.providerId = providerId;
    this.url = url;
  }

  private getDateFormated(date: Date): string {
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" });
  }

  private async getCurrencies(): Promise<Record<string, string>> {
    // TODO: add caching
    const response = await this.client.get<string>(`${this.url}/${this.currenciesPath}`, {});    
    const { Valuta: value }: CBRFCurrenciesType = parser.parse(response.result, this.xmlOptions);

    return value.Item.reduce((prev, curr): Record<string, string> => {
      prev[curr.ISO_Char_Code] = curr.attributes.ID;
      return prev;
    }, {});
  }

  async getRates(fromDate: Date, toDate: Date, pairs: CurrencyRateProviderPair[]): Promise<CurrencyRate[]> {
    const currencies = await this.getCurrencies();
      
    let rates: CurrencyRate[] = [];
    for (const pair of pairs) {
      const response = await this.client.get<string>(`${this.url}/${this.ratesDynamicPath}`, {
        date_req1: this.getDateFormated(fromDate),
        date_req2: this.getDateFormated(toDate),
        "VAL_NM_RQ": currencies[pair.fromCurrencyId],
      });

      const values: CBRFRateType = parser.parse(response.result, this.xmlOptions).ValCurs;      
      const records: CBRFRateItemType[] = Array.isArray(values.Record) ? values.Record : [values.Record];

      rates = [...rates, ...records
        .filter(rate => rate.attributes.Id === currencies[pair.fromCurrencyId])
        .map(rate => {
          const currencyRate = new CurrencyRate();
          currencyRate.from = pair.fromCurrencyId;
          currencyRate.to = pair.toCurrencyId;
          currencyRate.validFrom = rate.attributes.Date.split(".").reverse().join("-");
          //new Date(record["attributes"].Date.split(".").reverse().join("/")),
          currencyRate.rate = parseFloat(rate.Value.replace(",", "."));
          currencyRate.providerId = this.providerId;
          
          return currencyRate;
        })];
    };    

    return rates;
  }
}
