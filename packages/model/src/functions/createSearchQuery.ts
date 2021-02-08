import { ModelCount } from "../common/ModelCount";
import { ModelFind } from "../common/ModelFind";
import { ModelSearchQuery } from "../common/ModelSearchQuery";
import { getOrderBy } from "./getOrderBy";
import { getWhere } from "./getWhere";

const merge = <T>(obj1?: T | null, obj2?: T | null): Partial<T> => ({
  ...(obj1 || {}),
  ...(obj2 || {}),
});

export const createSearchQuery = <T>(
  find: ModelFind<T>,
  count: ModelCount<T>
): ModelSearchQuery<T> => async (
  query,
  database,
  filter = null,
  modify = null,
  options = {}
) => {
  const { $offset, $limit, $eq, $like, $in, $sort } = query;

  const mergedFilter = {
    ...$eq,
    ...getWhere(filter || {}),
    $in: merge($in, filter?.$in),
    $like: merge($like, filter?.$like),
    $limit: filter?.$limit != null ? filter.$limit : $limit,
    $offset: filter?.$offset != null ? filter.$offset : $offset,
    $sort: filter?.$sort != null ? filter.$sort : getOrderBy($sort),
    $gt: filter?.$gt || {},
    $lt: filter?.$lt || {},
    $ge: filter?.$ge || {},
    $le: filter?.$le || {},
  };

  const totalItems = await count(database, mergedFilter, modify);

  const items = await find(database, mergedFilter, modify, options);

  return { items, totalItems };
};
