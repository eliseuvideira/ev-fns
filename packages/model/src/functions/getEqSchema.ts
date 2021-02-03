import { removeKeys } from "@ev-fns/object-fns";
import Joi from "joi";
import { SchemaProps } from "../common/SchemaProps";

export const getEqSchema = <T extends SchemaProps<Partial<T>>>(
  search: T,
  ignoreKeys: (keyof T)[] = []
): Joi.Schema => Joi.object().keys(removeKeys(search, ignoreKeys));
