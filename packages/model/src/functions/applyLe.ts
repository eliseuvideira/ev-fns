import Knex from "knex";
import { applyOperator } from "./applyOperator";

export const applyLe = <T>(builder: Knex.QueryBuilder, fields: Partial<T>) =>
  applyOperator(builder, fields, "<=");
