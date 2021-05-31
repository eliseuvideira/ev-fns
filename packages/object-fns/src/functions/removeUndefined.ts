export const removeUndefined = <T extends Record<string, any>>(
  object: T,
): Partial<T> =>
  Object.fromEntries(
    Object.entries(object).filter((entry) => entry[1] !== undefined),
  ) as Partial<T>;
