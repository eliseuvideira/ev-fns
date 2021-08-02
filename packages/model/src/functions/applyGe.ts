import { Knex } from "knex";
import { applyOperator } from "./applyOperator";

export const applyGe = <T>(builder: Knex.QueryBuilder, fields: Partial<T>) =>
  applyOperator(builder, fields, ">=");
