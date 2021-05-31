import { ModelSetPopulateMany } from "../common/ModelSetPopulateMany";
import { PopulateManyCallback } from "../common/PopulateManyCallback";

export const createSetPopulateMany =
  <T>(
    populates: Map<string, PopulateManyCallback<T>>,
  ): ModelSetPopulateMany<T> =>
  (key, callback) => {
    populates.set(key, callback);
  };
