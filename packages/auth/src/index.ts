import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";

interface AuthProps {
  token: string;
}

const TOKEN_PREFIX = "Bearer ";

const auth = ({ token }: AuthProps) =>
  endpoint(async (req, res, next) => {
    const auth = req.headers["authorization"];

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

export = auth;
