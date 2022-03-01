import { endpoint } from "@ev-fns/endpoint";
import { HttpError } from "@ev-fns/errors";
import Joi, { ObjectSchema } from "joi";

export const createRequestValidate =
  (key: "body" | "params" | "query", options?: Joi.AsyncValidationOptions) =>
  (schema: ObjectSchema) =>
    endpoint(async (req, res, next) => {
      try {
        const value = await schema.validateAsync(req[key], options);
        req[key] = value;
        next();
      } catch (err: any) {
        throw new HttpError(400, err.message);
      }
    });
