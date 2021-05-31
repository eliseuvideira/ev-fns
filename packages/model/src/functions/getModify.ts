import Knex from "knex";
import { FilterProps } from "../common/FilterProps";
import { ModifyFunction } from "../common/ModifyFunction";
import { applyFilter } from "./applyFilter";

export const getModify =
  <T>(
    modify: ModifyFunction | null = null,
    filter: FilterProps<T> | null = null,
  ) =>
  (builder: Knex.QueryBuilder): void => {
    if (modify) {
      modify(builder);
    }
    if (filter) {
      applyFilter(builder, filter);
    }
  };
