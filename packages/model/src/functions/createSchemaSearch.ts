import Joi from "joi";
import { Model } from "../common/Model";
import { SchemaProps } from "../common/SchemaProps";
import { getEqSchema } from "./getEqSchema";
import { getInSchema } from "./getInSchema";
import { getLikeSchema } from "./getLikeSchema";

const PAGINATION_ITEMS_PER_PAGE =
  +(process.env.PAGINATION_ITEMS_PER_PAGE || 0) || 50;

export const createSchemaSearch = <T>(
  ModelClass: Model<T>,
  search: SchemaProps<Partial<T>>,
  ignoreKeys?: {
    $eq?: (keyof T & string)[];
    $like?: (keyof T & string)[];
    $in?: (keyof T & string)[];
    $sort?: (keyof T & string)[];
  },
): Joi.ObjectSchema => {
  const sortFields = ModelClass.fields.filter(
    (field) =>
      !ignoreKeys ||
      !ignoreKeys.$sort ||
      !ignoreKeys.$sort.includes(field as keyof T & string),
  );

  return Joi.object()
    .keys({
      page: Joi.number().integer().min(1).default(1),
      perPage: Joi.number()
        .integer()
        .min(1)
        .max(PAGINATION_ITEMS_PER_PAGE)
        .default(PAGINATION_ITEMS_PER_PAGE),
      $sort: Joi.string()
        .regex(
          new RegExp(
            `^(${sortFields.join("|")})(:(asc|desc))?(,(${sortFields.join(
              "|",
            )})(:(asc|desc))?)*$`,
          ),
        )
        .default(`${sortFields[0]}:asc`),
      $eq: getEqSchema(search, ignoreKeys?.$eq),
      $like: getLikeSchema(search, ignoreKeys?.$like),
      $in: getInSchema(search, ignoreKeys?.$in),
    })
    .required();
};
