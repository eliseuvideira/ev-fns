import { removeKeys, toCamel, toSnake } from "@ev-fns/object-fns";
import Knex from "knex";
import { ModelIgnoreKeys } from "../common/ModelIgnoreKeys";
import { ModelInsertOne } from "../common/ModelInsertOne";

export const createInsertOne = <T>(
  table: string,
  ignoreKeys: ModelIgnoreKeys<T> | null = null
): ModelInsertOne<T> => async (database: Knex, model: T): Promise<T> => {
  const [savedModel] = await database
    .from(table)
    .insert(
      removeKeys(toSnake(model) as T, (ignoreKeys && ignoreKeys.insert) || [])
    )
    .returning("*");
  return removeKeys(
    toCamel(savedModel) as T,
    (ignoreKeys && ignoreKeys.select) || []
  ) as T;
};
