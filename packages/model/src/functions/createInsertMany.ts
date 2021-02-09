import { removeKeys, toCamel, toSnake } from "@ev-fns/object-fns";
import { ModelIgnoreKeys } from "../common/ModelIgnoreKeys";
import { ModelInsertMany } from "../common/ModelInsertMany";

export const createInsertMany = <T>(
  table: string,
  ignoreKeys: ModelIgnoreKeys<T> | null = null
): ModelInsertMany<T> => async (database, items) => {
  if (!items.length) {
    return [];
  }

  const savedItems = await database
    .from(table)
    .insert(
      items.map((item) =>
        removeKeys(toSnake(item) as T, (ignoreKeys && ignoreKeys.insert) || [])
      )
    )
    .returning("*");
  return savedItems.map(
    (savedItem) =>
      removeKeys(
        toCamel(savedItem) as T,
        (ignoreKeys && ignoreKeys.select) || []
      ) as T
  );
};
