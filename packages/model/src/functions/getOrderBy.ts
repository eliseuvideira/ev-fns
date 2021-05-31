export interface OrderByField {
  column: string;
  order: "asc" | "desc";
}

export const getOrderBy = (sort: string): OrderByField[] => {
  const columns: {
    [key: string]: string;
  } = sort.split(",").reduce(
    (prev, column) => ({
      ...prev,
      [column.split(":")[0]]: column.split(":")[1] || "asc",
    }),
    {},
  );
  return Object.keys(columns).map((key) => ({
    column: key,
    order: columns[key] as "asc" | "desc",
  }));
};
