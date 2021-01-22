import { Request } from "express";
import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";

interface AuthProps {
  token: string;
  getToken?: (req: Request) => string | undefined;
}

const TOKEN_PREFIX = "Bearer ";

const auth = ({ token, getToken }: AuthProps) => {
  let getTokenDefault = (req: Request) => req.headers["authorization"];

  if (getToken) {
    getTokenDefault = getToken;
  }

  return endpoint(async (req, res, next) => {
    const auth = getTokenDefault(req);

    if (!auth || !auth.startsWith(TOKEN_PREFIX)) {
      res.set("WWW-Authenticate", "Bearer");
      throw new HttpError(401, "Unauthorized");
    }

    const hash = auth.slice(TOKEN_PREFIX.length);

    if (hash !== token) {
      throw new HttpError(401, "Unauthorized");
    }

    next();
  });
};

export = auth;
