import Joi from "joi";
import { createRequestValidate } from "./createRequestValidate";

export const createQuery = (options?: Joi.AsyncValidationOptions) =>
  createRequestValidate("query", options);
