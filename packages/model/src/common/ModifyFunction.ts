import Knex from "knex";

export type ModifyFunction = (builder: Knex.QueryBuilder) => void;
