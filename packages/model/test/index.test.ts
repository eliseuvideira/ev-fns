import dotenv from "@ev-fns/dotenv";
import { join } from "path";

dotenv({
  path: join(__dirname, "..", ".env"),
  sample: join(__dirname, "..", ".env.example"),
});

import Knex from "knex";
import { createModel } from "../src/index";

interface IUser {
  userId?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

describe("model", () => {
  const database = Knex({
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432) || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  });

  beforeAll(async () => {
    await database.schema.createTable("users", (table) => {
      table.increments("user_id").primary();
      table.text("name").notNullable();
      table.text("email").notNullable();
      table.text("password").notNullable();
      table.dateTime("created_at").notNullable().defaultTo(database.fn.now());
    });
  });

  afterAll(async () => {
    await database.schema.dropTable("users");
    await database.destroy();
  });

  it("creates a model", async () => {
    expect.assertions(10);

    const User = createModel<IUser>(
      "users",
      ["userId", "name", "email", "password", "createdAt"],
      ({ userId }) => ({ userId })
    );

    let user: IUser;

    user = await User.insertOne(database, {
      name: "name",
      email: "name@email.com",
      password: "$something$",
    });

    expect(user).toBeDefined();
    expect(user.name).toBe("name");
    expect(user.email).toBe("name@email.com");
    expect(user.password).toBe("$something$");

    let count = 0;
    let exists = false;

    count = await User.count(database);

    expect(count).toBe(1);

    exists = await User.exists(database);

    expect(exists).toBe(true);

    await User.deleteOne(database, user);

    count = await User.count(database);

    expect(count).toBe(0);

    exists = await User.exists(database);

    expect(exists).toBe(false);

    user = await User.insertOne(database, {
      name: "name",
      email: "name@email.com",
      password: "$something$",
    });

    expect(user).toBeDefined();

    user = await User.updateOne(database, { ...user, name: "new name" });

    expect(user.name).toBe("new name");
  });
});
