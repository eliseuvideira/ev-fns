import { HttpError } from "@ev-fns/errors";
import { randomBytes } from "crypto";
import { decode, encode, jwt } from "../src/index";

describe("decode & encode", () => {
  const JWT_SECRET = randomBytes(48).toString();

  it("encodes and decodes correctly", async () => {
    expect.assertions(4);

    const object = { key: +new Date() };

    const token = await encode(object, JWT_SECRET);

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");

    const decoded = await decode(token, JWT_SECRET);

    expect(decoded).toBeDefined();
    expect(decoded?.key).toEqual(object.key);
  });

  it("throw errors on invalid input", async () => {
    expect.assertions(1);

    await expect(async () =>
      decode("invalid token", JWT_SECRET)
    ).rejects.toThrow();
  });
});

describe("jwt", () => {
  const JWT_SECRET = randomBytes(48).toString();

  it("throw 401 error if no authorization", async () => {
    expect.assertions(5);

    const next = jest.fn();
    const set = jest.fn();

    await jwt({ secret: JWT_SECRET })(
      { headers: {} } as any,
      { set } as any,
      next
    );

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(HttpError);
    expect(next.mock.calls[0][0].status).toBe(401);
    expect(set).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith("WWW-Authenticate", "Bearer");
  });

  it("calls the next function if valid authorization", async () => {
    expect.assertions(3);

    const token = await encode({}, JWT_SECRET);

    const next = jest.fn();
    const set = jest.fn();

    await jwt({ secret: JWT_SECRET })(
      { headers: { authorization: "Bearer " + token } } as any,
      { set } as any,
      next
    );

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
    expect(set).not.toHaveBeenCalled();
  });
});
