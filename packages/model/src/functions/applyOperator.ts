import { camelToSnake } from "@ev-fns/string-fns";
import { Knex } from "knex";

export const applyOperator = <T>(
  builder: Knex.QueryBuilder,
  fields: Partial<T>,
  operator: ">=" | ">" | "<=" | "<",
) => {
  for (const key of Object.keys(fields)) {
    builder.andWhere(
      camelToSnake(key),
      operator,
      fields[key as keyof T] as any,
    );
  }
};
