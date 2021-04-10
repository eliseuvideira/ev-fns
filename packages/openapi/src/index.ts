import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import { createConfig } from "./createConfig";

interface OpenAPIOptions {
  path?: string;
  redirect?: boolean;
  apiName?: string;
  apiVersion?: string;
}

const trailSlash = (str: string) => str.replace(/\/+$/, "") + "/";

const openapi = ({
  path,
  redirect,
  apiName,
  apiVersion,
}: OpenAPIOptions = {}) => {
  const router = Router();

  if (redirect == null || redirect) {
    router.get("/", (req, res) =>
      res.redirect(trailSlash(path || "/api-docs"))
    );
  }

  const config = createConfig({ apiName, apiVersion });

  router.use(path || "/api-docs", serve, setup(config));

  return router;
};

export = openapi;
