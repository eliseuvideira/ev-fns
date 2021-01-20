import { endpoint } from "../src/index";

describe("endpoint", () => {
  it("catches errors and calls next", async () => {
    expect.assertions(2);
    const error = new Error("Invalid");

    const instance = endpoint(async () => Promise.reject(error));

    const next = jest.fn();

    await instance(null as any, null as any, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(error);
  });

  it("doesn't call next if no errors", async () => {
    expect.assertions(2);

    const next = jest.fn();
    const handler = jest.fn();

    const instance = endpoint(async () => {
      handler();
      await Promise.resolve();
    });

    await instance(null as any, null as any, next);

    expect(next).not.toHaveBeenCalled();
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
