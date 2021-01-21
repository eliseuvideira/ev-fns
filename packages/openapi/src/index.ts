import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import { config } from "./config";

interface OpenAPIOptions {
  path?: string;
  redirect?: boolean;
}

const trailSlash = (str: string) => str.replace(/\/+$/, "") + "/";

const openapi = ({ path, redirect }: OpenAPIOptions = {}) => {
  const router = Router();

  if (redirect == null || redirect) {
    router.get("/", (req, res) =>
      res.redirect(trailSlash(path || "/api-docs"))
    );
  }

  router.use(path || "/api-docs", serve, setup(config));

  return router;
};

export default openapi;
