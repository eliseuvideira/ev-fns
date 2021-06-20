import { HttpError } from "@ev-fns/errors";
import { randomBytes } from "crypto";
import { createAuth } from "../src/index";

describe("auth", () => {
  const TOKEN_KEY = randomBytes(48).toString();

  const auth = createAuth({ token: TOKEN_KEY });

  it("throws 401 error if no authorization", async () => {
    expect.assertions(5);

    const next = jest.fn();
    const set = jest.fn();

    const req = { headers: {} } as any;
    const res = { set } as any;

    await auth(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(HttpError);
    expect(next.mock.calls[0][0].status).toBe(401);
    expect(set).toHaveBeenCalled();
    expect(set).toHaveBeenCalledWith("WWW-Authenticate", "Bearer");
  });

  it("throws 401 error if invalid authorization", async () => {
    expect.assertions(4);

    const next = jest.fn();
    const set = jest.fn();

    const invalidKey = randomBytes(48).toString() + "👋";

    const req = { headers: { authorization: "Bearer " + invalidKey } } as any;
    const res = { set } as any;

    await auth(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(HttpError);
    expect(next.mock.calls[0][0].status).toBe(401);
    expect(set).not.toHaveBeenCalled();
  });

  it("calls the next function if valid authorization", async () => {
    expect.assertions(3);

    const next = jest.fn();
    const set = jest.fn();

    const req = { headers: { authorization: "Bearer " + TOKEN_KEY } } as any;
    const res = { set } as any;

    await auth(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
    expect(set).not.toHaveBeenCalled();
  });
});
