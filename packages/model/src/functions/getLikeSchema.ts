import { removeKeys } from "@ev-fns/object-fns";
import Joi from "joi";
import { SchemaProps } from "../common/SchemaProps";

export const getLikeSchema = <T extends SchemaProps<Partial<T>>>(
  search: T,
  ignoreKeys: (keyof T)[] = [],
): Joi.Schema => {
  const invalidKeys = Object.keys(search).filter(
    (key) => search[key as keyof T].type !== "string",
  );

  return Joi.object().keys(
    removeKeys(search, (invalidKeys as (keyof T)[]).concat(ignoreKeys)),
  );
};
