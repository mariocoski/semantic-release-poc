import { DEFAULT_PORT_NUMBER } from "./config";

describe("Server", () => {
  it("defines default port number", () => {
    expect(DEFAULT_PORT_NUMBER).toBe(3000);
  });
});
