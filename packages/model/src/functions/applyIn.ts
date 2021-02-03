import { camelToSnake } from "@ev-fns/string-fns";
import Knex from "knex";
import { PropsToArray } from "../common/PropsToArray";

export const applyIn = <T>(
  builder: Knex.QueryBuilder,
  inFields: PropsToArray<T>
): void => {
  for (const key of Object.keys(inFields)) {
    builder.whereIn(camelToSnake(key), inFields[key as keyof T]);
  }
};
