export type SortPropsField<T> = {
  column: keyof T & string;
  order: "asc" | "desc";
};
