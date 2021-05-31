import { removeKeys, toCamel, toSnake } from "@ev-fns/object-fns";
import { ModelFind } from "../common/ModelFind";
import { ModelIgnoreKeys } from "../common/ModelIgnoreKeys";
import { PopulateManyCallback } from "../common/PopulateManyCallback";
import { getModify } from "./getModify";
import { getWhere } from "./getWhere";

export const createFind =
  <T>(
    table: string,
    ignoreKeys: ModelIgnoreKeys<T> | null = null,
    populates: Map<string, PopulateManyCallback<T>>,
  ): ModelFind<T> =>
  async (
    database,
    filter = null,
    modify = null,
    options = {},
  ): Promise<T[]> => {
    const rows: any[] = await database
      .from(table)
      .where(toSnake(getWhere(filter || {})))
      .modify(getModify(modify, filter));

    const items = rows.map(
      (row) =>
        removeKeys(
          toCamel(row) as T,
          (ignoreKeys && ignoreKeys.select) || [],
        ) as T,
    );

    if (options?.populates) {
      await Promise.all(
        options.populates.map((key) => {
          const populate = populates.get(key);
          if (!populate) {
            return Promise.resolve() as any;
          }
          return populate(database, items);
        }),
      );
    }

    return items;
  };
