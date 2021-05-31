import { ModelSetPopulateOne } from "../common/ModelSetPopulateOne";
import { PopulateOneCallback } from "../common/PopulateOneCallback";

export const createSetPopulateOne =
  <T>(populates: Map<string, PopulateOneCallback<T>>): ModelSetPopulateOne<T> =>
  (key, callback) => {
    populates.set(key, callback);
  };
