import Joi from "joi";
import { createRequestValidate } from "./createRequestValidate";

export const createParams = (options?: Joi.AsyncValidationOptions) =>
  createRequestValidate("params", options);
