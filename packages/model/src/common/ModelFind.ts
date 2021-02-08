import Knex from "knex";
import { FilterProps } from "./FilterProps";
import { ModifyFunction } from "./ModifyFunction";

export type ModelFind<T> = (
  database: Knex,
  filter?: FilterProps<T> | null,
  modify?: ModifyFunction | null,
  options?: { populates?: string[] }
) => Promise<T[]>;
