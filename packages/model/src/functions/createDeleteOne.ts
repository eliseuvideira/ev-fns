import { toSnake } from "@ev-fns/object-fns";
import { Knex } from "knex";
import { ModelDeleteOne } from "../common/ModelDeleteOne";

export const createDeleteOne =
  <T>(
    table: string,
    getPrimaryKey: (props: T) => Partial<T>,
  ): ModelDeleteOne<T> =>
  async (database: Knex, model: T): Promise<void> => {
    await database
      .from(table)
      .where(toSnake(getPrimaryKey(model)))
      .delete();
  };
