import Joi from "joi";
import { SchemaProps } from "../common/SchemaProps";

export const createSchema = <T>(
  props: SchemaProps<Partial<T>>
): Joi.ObjectSchema => Joi.object().keys(props).required();
