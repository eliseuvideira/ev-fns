import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";
import { ObjectSchema } from "joi";

export const createRequestValidate =
  (key: "body" | "params" | "query") => (schema: ObjectSchema) =>
    endpoint(async (req, res, next) => {
      try {
        const value = await schema.validateAsync(req[key]);
        req[key] = value;
        next();
      } catch (err) {
        throw new HttpError(400, err.message);
      }
    });
