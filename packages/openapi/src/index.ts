import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import { createConfig } from "./createConfig";
import YAML from "yaml";

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

  const yaml = YAML.stringify(config);

  router.use(path || "/api-docs", serve, setup(config));

  router.get((path || "/api-docs") + "/openapi.yml", (req, res) =>
    res.status(200).send(yaml).end()
  );

  return router;
};

export = openapi;
