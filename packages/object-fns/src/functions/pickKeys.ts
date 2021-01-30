export const pickKeys = <T>(original: T, keys: (keyof T)[]): Partial<T> =>
  keys.reduce(
    (copy, key) => ({ ...copy, [key]: original[key] }),
    {} as Partial<T>
  );
