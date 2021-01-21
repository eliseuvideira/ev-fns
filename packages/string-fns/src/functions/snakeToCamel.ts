export const snakeToCamel = (() => {
  const regex = /(?<=.)_(.)/g

  return (key: string) =>
    key.replace(regex, (_, letter) => letter.toUpperCase());
})();
