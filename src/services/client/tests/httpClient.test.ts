jest.mock("http");
import { HTTPClient } from "../httpClient";

describe("HTTP client", () => {
  it("should receive data and end stream", async () => {
    /* eslint-disable @typescript-eslint/no-var-requires */
    require("http").__setResponse({
      statusCode: 200,
      on: (eventName: string, callback: (data: string | void) => void) => {        
        if (eventName === "data") {
          callback("start");
          callback("end");
        } else if (eventName === "end") {
          callback();
        }
      },
    });

    const client = new HTTPClient();
    const { result } = await client.get("http://example.com", {
      param1: "value1",
      param2: "value2",
    });

    expect(result).toEqual("startend");  
  });
});