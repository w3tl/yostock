import { mocked } from 'ts-jest/utils';
import { CurrencyRateProviderPair } from "../../../entity/currencyRateProviderPair";
import { CBRFCurrencyAPI } from "../CBRFCurrencyAPI";
import { getCurrencies, getRates } from "./CBRFResponses";

import { HTTPClient } from "../../client/httpClient";

const mockedGet = jest.fn();

jest.mock("../../client/httpClient", () => ({
  HTTPClient: jest.fn().mockImplementation(() => ({
      get: mockedGet,
  })),
}));

describe("CBRFCurrencyAPI", () => {
  const mockedClient = mocked(HTTPClient, true);
  
  const currencyAPI = new CBRFCurrencyAPI("CBRF", "https://example.com");  
  currencyAPI.client = new HTTPClient();

  beforeEach(() => {
    mockedClient.mockClear();
   });

  it("getRates should retrive currency codes", async () => {
    mockedGet
      .mockReturnValueOnce({
        result: getCurrencies,
      })
      .mockReturnValue({
        result: getRates,
      });

    const pairs: CurrencyRateProviderPair[] = [];

    const pair = new CurrencyRateProviderPair();
    pair.fromCurrencyId = "USD";
    pair.toCurrencyId = "RUB";
    pair.providerId = "CBRF";

    pairs.push(pair);

    const rates = await currencyAPI.getRates(new Date(), new Date(), pairs);

    expect(mockedGet.call).toMatchSnapshot();
    expect(rates).toMatchSnapshot();
  });
});

// empty result in period today