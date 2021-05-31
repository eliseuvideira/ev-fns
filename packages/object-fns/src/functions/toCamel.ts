import { snakeToCamel } from "@ev-fns/string-fns";

export const toCamel = (original: Record<string, any>): Record<string, any> =>
  Object.keys(original).reduce(
    (copy, key) => ({ ...copy, [snakeToCamel(key)]: original[key] }),
    {},
  );
