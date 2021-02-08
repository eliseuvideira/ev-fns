import Knex from "knex";

export type PopulateOneCallback<T> = (database: Knex, item: T) => Promise<void>;
