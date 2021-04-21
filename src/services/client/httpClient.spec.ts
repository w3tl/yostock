import { mocked } from 'ts-jest/utils';
import fetch from 'node-fetch';

jest.mock("node-fetch");

import { HTTPClient } from "./httpClient";
const { Response } = jest.requireActual('node-fetch');

const mockedFetch = mocked(fetch).mockImplementation();

describe("HTTP client", () => {
  beforeEach(() => {
    mockedFetch.mockClear();
  });

  it("should receive response", async () => {
    const responseText = "Hello world";
    mockedFetch.mockReturnValueOnce(Promise.resolve(new Response(responseText, {
      status: 200,
    })));

    const client = new HTTPClient();
    const { result } = await client.get("http://example.com");

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toBe(responseText);
  });

  it("should send parameters", async () => {
    mockedFetch.mockReturnValueOnce(Promise.resolve(new Response("ok", {
      status: 200,
    })));

    const client = new HTTPClient();
    await client.get("http://example.com", {
      param1: "value1",
      param2: "value2",
    });

    expect(mockedFetch.mock.calls).toMatchSnapshot();
  });
});