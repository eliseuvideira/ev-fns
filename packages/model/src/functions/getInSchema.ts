import { removeKeys } from "@ev-fns/object-fns";
import Joi from "joi";
import { SchemaProps } from "../common/SchemaProps";

export const getInSchema = <T extends SchemaProps<Partial<T>>>(
  search: T,
  ignoreKeys: (keyof T)[] = [],
): Joi.Schema => {
  const keys = Object.keys(removeKeys(search, ignoreKeys)) as (keyof T)[];

  const schema: SchemaProps<any> = {};

  keys.forEach((key) => {
    schema[key] = Joi.array().items(search[key]);
  });

  return Joi.object().keys(schema);
};
