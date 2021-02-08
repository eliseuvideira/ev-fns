import Knex from "knex";
import { FilterProps } from "./FilterProps";
import { ModifyFunction } from "./ModifyFunction";

export type ModelSearchQuery<T> = (
  query: any,
  database: Knex,
  filter?: FilterProps<T> | null,
  modify?: ModifyFunction | null,
  options?: { populates?: string[] }
) => Promise<{ items: T[]; totalItems: number }>;
