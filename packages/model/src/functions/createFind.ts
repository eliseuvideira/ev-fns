import { removeKeys, toCamel, toSnake } from "@ev-fns/object-fns";
import { ModelFind } from "../common/ModelFind";
import { ModelIgnoreKeys } from "../common/ModelIgnoreKeys";
import { getModify } from "./getModify";
import { getWhere } from "./getWhere";

export const createFind = <T>(
  table: string,
  ignoreKeys: ModelIgnoreKeys<T> | null = null
): ModelFind<T> => async (
  database,
  filter = null,
  modify = null
): Promise<T[]> => {
  const rows: any[] = await database
    .from(table)
    .where(toSnake(getWhere(filter || {})))
    .modify(getModify(modify, filter));
  return rows.map(
    (row) =>
      removeKeys(
        toCamel(row) as T,
        (ignoreKeys && ignoreKeys.select) || []
      ) as T
  );
};
