import { removeKeys, toCamel, toSnake } from "@ev-fns/object-fns";
import { ModelFindOne } from "../common/ModelFindOne";
import { ModelIgnoreKeys } from "../common/ModelIgnoreKeys";
import { getModify } from "./getModify";
import { getWhere } from "./getWhere";

export const createFindOne = <T>(
  table: string,
  ignoreKeys: ModelIgnoreKeys<T> | null = null
): ModelFindOne<T> => async (
  database,
  filter = null,
  modify = null
): Promise<T | null> => {
  const row: any | null = await database
    .from(table)
    .where(toSnake(getWhere(filter || {})))
    .modify(getModify(modify, filter))
    .first();
  if (!row) {
    return null;
  }
  return removeKeys(
    toCamel(row) as T,
    (ignoreKeys && ignoreKeys.select) || []
  ) as T;
};
