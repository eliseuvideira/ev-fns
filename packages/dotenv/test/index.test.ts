import dotenv from "../src/index";

import fs from "fs";
import path from "path";

describe("dotenv", () => {
  const _ = console.info;

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

  beforeEach(async () => {
    console.info = () => {};

    await fs.promises.writeFile(samplePath, "");
    await fs.promises.writeFile(envPath, "");
  });

  afterEach(async () => {
    console.info = _;

    await fs.promises.unlink(samplePath);
    await fs.promises.unlink(envPath);
  });
});
