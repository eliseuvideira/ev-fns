import Knex from "knex";

export type ModelInsertMany<T> = (database: Knex, items: T[]) => Promise<T[]>;
