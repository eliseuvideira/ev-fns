import { PropsToArray } from "./PropsToArray";
import { SortPropsField } from "./SortPropsField";

export type FilterProps<T> = Partial<T> & {
  $like?: Partial<T>;
  $in?: PropsToArray<Partial<T>>;
  $sort?: SortPropsField<Partial<T>>[];
  $limit?: number;
  $offset?: number;
  $gt?: Partial<T>;
  $lt?: Partial<T>;
  $ge?: Partial<T>;
  $le?: Partial<T>;
};
