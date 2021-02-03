import { removeKeys } from "@ev-fns/object-fns";
import { FilterProps } from "../common/FilterProps";

export const getWhere = <T>(filter: FilterProps<T>): Partial<T> =>
  removeKeys(filter, [
    "$in",
    "$like",
    "$limit",
    "$offset",
    "$sort",
    "$gt",
    "$lt",
    "$ge",
    "$le",
  ]) as Partial<T>;
