import Knex from "knex";

export type PopulateManyCallback<T> = (
  database: Knex,
  items: T[]
) => Promise<void>;
