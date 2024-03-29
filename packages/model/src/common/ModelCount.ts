import { Knex } from "knex";
import { FilterProps } from "./FilterProps";
import { ModifyFunction } from "./ModifyFunction";

export type ModelCount<T> = (
  database: Knex,
  filter?: FilterProps<T> | null,
  modify?: ModifyFunction | null,
) => Promise<number>;
