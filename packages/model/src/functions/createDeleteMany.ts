import { toSnake } from "@ev-fns/object-fns";
import Knex from "knex";
import { ModelDeleteMany } from "../common/ModelDeleteMany";
import { getModify } from "./getModify";
import { getWhere } from "./getWhere";

export const createDeleteMany = <T>(
  table: string
): ModelDeleteMany<T> => async (
  database: Knex,
  filter = null,
  modify = null
): Promise<void> => {
  await database
    .from(table)
    .where(toSnake(getWhere(filter || {})))
    .modify(getModify(modify, filter))
    .delete();
};
