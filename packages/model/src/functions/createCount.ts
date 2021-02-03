import { removeKeys, toSnake } from "@ev-fns/object-fns";
import { FilterProps } from "../common/FilterProps";
import { ModelCount } from "../common/ModelCount";
import { getModify } from "./getModify";
import { getWhere } from "./getWhere";

export const createCount = <T>(table: string): ModelCount<T> => async (
  database,
  filter = null,
  modify = null
): Promise<number> => {
  const { count } = await database
    .from(table)
    .where(toSnake(getWhere(filter || {})))
    .modify(
      getModify(
        modify,
        removeKeys((filter || {}) as FilterProps<T>, [
          "$sort",
          "$limit",
          "$offset",
        ]) as T
      )
    )
    .count()
    .first();
  return +count;
};
