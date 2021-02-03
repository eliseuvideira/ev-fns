import Knex from "knex";

export type ModelDeleteOne<T> = (database: Knex, model: T) => Promise<void>;
