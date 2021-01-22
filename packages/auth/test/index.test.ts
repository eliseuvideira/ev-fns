import { HttpError } from "@ev-fns/errors";
import { randomBytes } from "crypto";
import auth from "../src/index";

describe("auth", () => {
  const TOKEN_KEY = randomBytes(48).toString();

  it("throw 401 error if no authorization", async () => {
    expect.assertions(5);

    const next = jest.fn();
    const set = jest.fn();

    await auth({ token: TOKEN_KEY })(
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

    const next = jest.fn();
    const set = jest.fn();

    await auth({ token: TOKEN_KEY })(
      { headers: { authorization: "Bearer " + TOKEN_KEY } } as any,
      { set } as any,
      next
    );

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
    expect(set).not.toHaveBeenCalled();
  });
});
