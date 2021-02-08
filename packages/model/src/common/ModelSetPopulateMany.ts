import { PopulateManyCallback } from "./PopulateManyCallback";

export type ModelSetPopulateMany<T> = (
  key: string,
  callback: PopulateManyCallback<T>
) => void;
