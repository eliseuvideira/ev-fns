import { camelToSnake } from "@ev-fns/string-fns";
import Knex from "knex";

export const applyLike = <T>(
  builder: Knex.QueryBuilder,
  likeFields: Partial<T>
): void => {
  for (const key of Object.keys(likeFields)) {
    builder.andWhere(
      camelToSnake(key),
      "like",
      `%${likeFields[key as keyof T]}%`
    );
  }
};
