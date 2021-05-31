import { removeKeys, toCamel, toSnake } from "@ev-fns/object-fns";
import Knex from "knex";
import { ModelIgnoreKeys } from "../common/ModelIgnoreKeys";
import { ModelUpdateOne } from "../common/ModelUpdateOne";

export const createUpdateOne =
  <T>(
    table: string,
    getPrimaryKey: (props: T) => Partial<T>,
    ignoreKeys: ModelIgnoreKeys<T> | null = null,
  ): ModelUpdateOne<T> =>
  async (database: Knex, model: T): Promise<T> => {
    const [savedModel] = await database
      .from(table)
      .update(
        removeKeys(
          toSnake(model) as T,
          (ignoreKeys && ignoreKeys.update) || [],
        ),
      )
      .where(toSnake(getPrimaryKey(model)))
      .returning("*");
    return removeKeys(
      toCamel(savedModel) as T,
      (ignoreKeys && ignoreKeys.select) || [],
    ) as T;
  };
