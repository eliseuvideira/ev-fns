import { Request } from "express";
import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";

interface AuthProps {
  token: string;
  getToken?: (req: Request) => string;
}

const TOKEN_PREFIX = "Bearer ";

export const createAuth = ({
  token,
  getToken = (req: Request) => req.headers["authorization"] || "",
}: AuthProps) =>
  endpoint(async (req, res, next) => {
    const auth = getToken(req);

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
