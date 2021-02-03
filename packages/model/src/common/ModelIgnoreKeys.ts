export type ModelIgnoreKeys<T> = {
  insert?: (keyof T)[];
  update?: (keyof T)[];
  select?: (keyof T)[];
};
