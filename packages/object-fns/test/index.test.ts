import { removeKeys, removeUndefined, toCamel, toSnake } from "../src/index";

describe("removeKeys", () => {
  it("removes keys", () => {
    expect({
      customerId: 1,
      name: "customer",
    }).toEqual(
      removeKeys(
        {
          customerId: 1,
          name: "customer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ["createdAt", "updatedAt"]
      )
    );
  });
});

describe("removeUndefined", () => {
  it("removes keys with undefined values", () => {
    expect({
      $eq: { customerId: 1, name: "customer" },
    }).toEqual(
      removeUndefined({
        $eq: { customerId: 1, name: "customer" },
        $like: undefined,
        $sort: undefined,
      })
    );
  });

  it("keeps all keys if no undefined", () => {
    expect({
      customerId: 1,
      name: "customer",
    }).toEqual(
      removeUndefined({
        customerId: 1,
        name: "customer",
      })
    );
  });
});

describe("toCamel", () => {
  it("parses snaked cased keys", () => {
    expect({
      customerId: 1,
      name: "customer",
      createdAt: new Date("2020-08-09T00:15:51Z"),
      updatedAt: new Date("2020-08-09T00:15:51Z"),
    }).toEqual(
      toCamel({
        customer_id: 1,
        name: "customer",
        created_at: new Date("2020-08-09T00:15:51Z"),
        updated_at: new Date("2020-08-09T00:15:51Z"),
      })
    );
  });

  it("keep other keys intact", () => {
    expect({
      customerId: 1,
      name: "customer",
      createdAt: new Date("2020-08-09T00:15:51Z"),
      updatedAt: new Date("2020-08-09T00:15:51Z"),
    }).toEqual(
      toCamel({
        customerId: 1,
        name: "customer",
        createdAt: new Date("2020-08-09T00:15:51Z"),
        updatedAt: new Date("2020-08-09T00:15:51Z"),
      })
    );
  });
});

describe("toSnake", () => {
  it("parses camel cased keys", () => {
    expect({
      customer_id: 1,
      name: "customer",
      created_at: new Date("2020-08-09T00:15:51Z"),
      updated_at: new Date("2020-08-09T00:15:51Z"),
    }).toEqual(
      toSnake({
        customerId: 1,
        name: "customer",
        createdAt: new Date("2020-08-09T00:15:51Z"),
        updatedAt: new Date("2020-08-09T00:15:51Z"),
      })
    );
  });

  it("keep other keys intact", () => {
    expect({
      customer_id: 1,
      name: "customer",
      created_at: new Date("2020-08-09T00:15:51Z"),
      updated_at: new Date("2020-08-09T00:15:51Z"),
    }).toEqual(
      toSnake({
        customer_id: 1,
        name: "customer",
        created_at: new Date("2020-08-09T00:15:51Z"),
        updated_at: new Date("2020-08-09T00:15:51Z"),
      })
    );
  });
});
