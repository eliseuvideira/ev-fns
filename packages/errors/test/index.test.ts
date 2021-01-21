import { exception, notFound, HttpError, isHttpError } from "../src/index";

describe("exception", () => {
  it("responds with the error and status code", () => {
    expect.assertions(2);
    const error = new HttpError(400, "Bad request");
    exception(
      error,
      null as any,
      {
        status: function (status: number) {
          expect(status).toBe(error.status);
          return this;
        },
        json: function (responseBody: any) {
          expect(responseBody.message).toBe(error.message);
        },
      } as any,
      null as any
    );
  });

  it("send 500 if error doesn't have a status code", () => {
    expect.assertions(3);
    const error = new Error("error");
    const fn = jest.fn();
    const logErr = console.error;
    console.error = fn;
    exception(
      error,
      null as any,
      {
        status: function (status: number) {
          expect(status).toBe(500);
          return this;
        },
        json: function (responseBody: any) {
          expect(responseBody.message).toBe(error.message);
        },
      } as any,
      null as any
    );
    expect(fn).toHaveBeenCalledTimes(1);
    console.error = logErr;
  });

  it("doesn't send sensitive data in production", () => {
    expect.assertions(4);
    const error = new Error("error");
    const fn = jest.fn();
    const logErr = console.error;
    console.error = fn;
    const oldEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    exception(
      error,
      null as any,
      {
        status: function (status: number) {
          expect(status).toBe(500);
          return this;
        },
        json: function (responseBody: any) {
          expect(responseBody.message).not.toBe(error.message);
          expect(responseBody.message).toBe("Internal server error");
        },
      } as any,
      null as any
    );
    process.env.NODE_ENV = oldEnv;
    expect(fn).toHaveBeenCalledTimes(1);
    console.error = logErr;
  });
});

describe("notFound", () => {
  it("calls next with an HttpError 404", () => {
    expect.assertions(3);
    const fn = jest.fn();
    notFound(null as any, null as any, fn);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn.mock.calls[0][0]).toBeInstanceOf(HttpError);
    expect(fn.mock.calls[0][0].status).toBe(404);
  });
});

describe("HttpError", () => {
  it("is an instance of Error with status code key", () => {
    const error = new HttpError(400, "Bad request");

    expect(error instanceof Error).toBe(true);
    expect(error.status).toBe(400);
  });
});

describe("isHttpError", () => {
  it("identifies HttpError instances", () => {
    expect(isHttpError(new HttpError(400, "Bad request"))).toBe(true);
    const error: any = new Error("Bad request");
    error.status = 400;
    expect(isHttpError(error)).toBe(true);
    expect(isHttpError(new Error("Bad request"))).toBe(false);
    expect(isHttpError({ message: "Bad request", status: 400 })).toBe(true);
  });
});
