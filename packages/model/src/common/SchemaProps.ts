import Joi from "joi";

export type SchemaProps<T> = {
  [key in keyof T]: Joi.Schema;
};
