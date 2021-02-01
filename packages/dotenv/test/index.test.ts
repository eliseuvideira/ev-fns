import dotenv from "../src/index";

import fs from "fs";
import path from "path";

describe("dotenv", () => {
  const envPath = path.join(__dirname, ".env");
  const samplePath = path.join(__dirname, ".env.example");

  it("checks .env.example keys", async () => {
    expect.assertions(3);

    await fs.promises.writeFile(samplePath, "KEYWORD=");

    try {
      dotenv({ path: envPath, sample: samplePath });
      fail();
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.missing).toBeDefined();
      expect(err.missing).toEqual(["KEYWORD"]);
    }
  });

  it("loads environment variables", async () => {
    expect.assertions(2);

    await fs.promises.writeFile(samplePath, "KEYWORD=");
    await fs.promises.writeFile(envPath, "KEYWORD=value");

    expect(process.env.KEYWORD).not.toBeDefined();

    dotenv({ path: envPath, sample: samplePath });

    expect(process.env.KEYWORD).toBe("value");
  });

  it("has startup default function", async () => {
    expect.assertions(1);

    await fs.promises.writeFile(samplePath, "KEYWORD=");
    await fs.promises.writeFile(envPath, "KEYWORD=value");

    const info = jest.fn();

    const _ = console.info;
    console.info = info;
    try {
      dotenv({ path: envPath, sample: samplePath }, dotenv.startup);

      expect(info).toHaveBeenCalled();
    } finally {
      console.info = _;
    }
  });

  beforeEach(async () => {
    await fs.promises.writeFile(samplePath, "");
    await fs.promises.writeFile(envPath, "");
  });

  afterEach(async () => {
    await fs.promises.unlink(samplePath);
    await fs.promises.unlink(envPath);
  });
});
