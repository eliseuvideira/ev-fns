import Knex from "knex";
import { FilterProps } from "../common/FilterProps";
import { Model } from "../common/Model";
import { ModifyFunction } from "../common/ModifyFunction";
import { PaginationProps } from "../common/PaginationProps";
import { getOrderBy } from "./getOrderBy";
import { getWhere } from "./getWhere";

const merge = <T>(
  obj1?: T | null,
  obj2?: T | null
): Partial<T> | undefined | null => {
  if (!obj1 || !obj2) {
    return obj1 || obj2 || undefined;
  }
  return { ...obj1, ...obj2 };
};

export const createSearchQuery = <T>(ModelClass: Model<T>) => async (
  query: any,
  database: Knex,
  filter: FilterProps<T> | null = null,
  modify: ModifyFunction | null = null
): Promise<[T[], FilterProps<T>, PaginationProps]> => {
  const { page, perPage, $eq, $like, $in, $sort } = query;

  const mergedFilter = {
    ...$eq,
    ...getWhere(filter || {}),
    $in: merge($in, filter?.$in),
    $like: merge($like, filter?.$like),
    $limit: filter?.$limit != null ? filter.$limit : perPage,
    $offset: filter?.$offset != null ? filter.$offset : (page - 1) * perPage,
    $sort: filter?.$sort != null ? filter.$sort : getOrderBy($sort),
  };

  const totalItems = await ModelClass.count(database, mergedFilter, modify);

  const pagination = {
    page,
    perPage,
    totalItems,
    lastPage: Math.ceil(totalItems / perPage),
  };

  const items = await ModelClass.find(database, mergedFilter, modify);

  return [items, mergedFilter, pagination];
};
