import Joi from "joi";
import { SchemaProps } from "../common/SchemaProps";

export const createSchemaPatch = <T>(
  props: SchemaProps<Partial<T>>,
): Joi.ObjectSchema => Joi.object().keys(props).min(1).required();
