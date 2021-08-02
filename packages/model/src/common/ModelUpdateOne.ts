import { Knex } from "knex";

export type ModelUpdateOne<T> = (database: Knex, model: T) => Promise<T>;
