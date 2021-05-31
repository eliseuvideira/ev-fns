import { camelToSnake } from "@ev-fns/string-fns";

export const orderByToSnake = (
  orderBy: { column: string; order: string }[],
): { column: string; order: string }[] => {
  return orderBy.map((item) => ({
    column: camelToSnake(item.column),
    order: item.order,
  }));
};
