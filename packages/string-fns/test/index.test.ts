import { camelToSnake, snakeToCamel } from "../src/index";

describe("snakeToCamel", () => {
  const cases = [
    ["snake_case", "snakeCase"],
    ["_private_value", "_privateValue"],
  ];

  it("transforms snake case to camel case", () => {
    expect.assertions(cases.length);

    cases.forEach(([snake, camel]) => {
      expect(snakeToCamel(snake)).toBe(camel);
    });
  });
});

describe("camelToSnake", () => {
  const cases = [
    ["camelCase", "camel_case"],
    ["_privateValue", "_private_value"],
  ];

  it("transforms snake case to camel case", () => {
    expect.assertions(cases.length);

    cases.forEach(([camel, snake]) => {
      expect(camelToSnake(camel)).toBe(snake);
    });
  });
});
