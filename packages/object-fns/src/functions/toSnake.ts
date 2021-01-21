import { camelToSnake } from "@ev-fns/string-fns";

export const toSnake = (original: Record<string, any>): Record<string, any> =>
  Object.keys(original).reduce(
    (copy, key) => ({ ...copy, [camelToSnake(key)]: original[key] }),
    {}
  );
