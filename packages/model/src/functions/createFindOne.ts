import { removeKeys, toCamel, toSnake } from "@ev-fns/object-fns";
import { ModelFindOne } from "../common/ModelFindOne";
import { ModelIgnoreKeys } from "../common/ModelIgnoreKeys";
import { PopulateOneCallback } from "../common/PopulateOneCallback";
import { getModify } from "./getModify";
import { getWhere } from "./getWhere";

export const createFindOne = <T>(
  table: string,
  ignoreKeys: ModelIgnoreKeys<T> | null = null,
  populates: Map<string, PopulateOneCallback<T>>
): ModelFindOne<T> => async (
  database,
  filter = null,
  modify = null,
  options = {}
): Promise<T | null> => {
  const row: any | null = await database
    .from(table)
    .where(toSnake(getWhere(filter || {})))
    .modify(getModify(modify, filter))
    .first();
  if (!row) {
    return null;
  }
  const item = removeKeys(
    toCamel(row) as T,
    (ignoreKeys && ignoreKeys.select) || []
  ) as T;

  if (options?.populates) {
    await Promise.all(
      options.populates.map((key) => {
        const populate = populates.get(key);
        if (!populate) {
          return Promise.resolve() as any;
        }
        return populate(database, item);
      })
    );
  }

  return item;
};
