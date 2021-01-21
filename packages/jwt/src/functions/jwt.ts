import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";
import { decode } from "./decode";

export interface JWTOptions {
  secret: string;
}

const TOKEN_PREFIX = "Bearer ";

export const jwt = ({ secret }: JWTOptions) =>
  endpoint(async (req, res, next) => {
    const auth = req.headers["authorization"];

    if (!auth || !auth.startsWith(TOKEN_PREFIX)) {
      res.set("WWW-Authenticate", "Bearer");
      throw new HttpError(401, "Unauthorized");
    }

    const hash = auth.slice(TOKEN_PREFIX.length);

    try {
      const token = await decode(hash, secret);

      if (!token) {
        res.set("WWW-Authenticate", "Bearer");
        throw new HttpError(401, "Unauthorized");
      }

      req.token = token;
      req._token = {
        raw: hash,
        value: token,
      };
    } catch (err) {
      err.status = 401;
      throw err;
    }

    next();
  });
