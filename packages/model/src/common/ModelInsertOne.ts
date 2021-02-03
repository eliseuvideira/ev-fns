import Knex from "knex";

export type ModelInsertOne<T> = (database: Knex, model: T) => Promise<T>;
