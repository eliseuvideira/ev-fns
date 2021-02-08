import { PopulateOneCallback } from "./PopulateOneCallback";

export type ModelSetPopulateOne<T> = (
  key: string,
  callback: PopulateOneCallback<T>
) => void;
