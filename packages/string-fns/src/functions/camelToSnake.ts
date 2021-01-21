export const camelToSnake = (() => {
  const regex = /([a-z])([A-Z])/g;

  return (key: string) =>
    key.replace(regex, (_, lower, upper) => `${lower}_${upper.toLowerCase()}`);
})();
