import Joi from "joi";
import { createRequestValidate } from "./createRequestValidate";

export const createBody = (options?: Joi.AsyncValidationOptions) =>
  createRequestValidate("body", options);
