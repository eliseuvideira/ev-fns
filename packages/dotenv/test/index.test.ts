import fs from "fs";
import path from "path";
import crypto from "crypto";
import { dotenv } from "../src/index";

describe("dotenv", () => {
  const envPath = path.join(__dirname, ".env");
  const samplePath = path.join(__dirname, ".env.example");

  it("throws if missing .env.example keys in .env file", async () => {
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

  it("correctly loads variables from .env file", async () => {
    expect.assertions(2);

    const value = crypto.randomBytes(32).toString("hex");

    await fs.promises.writeFile(samplePath, "KEYWORD=");
    await fs.promises.writeFile(envPath, `KEYWORD=${value}`);

    expect(process.env.KEYWORD).not.toBeDefined();

    dotenv({ path: envPath, sample: samplePath });

    expect(process.env.KEYWORD).toBe(value);
  });

  it("pretty prints NODE_ENV and VERSION info into console", async () => {
    expect.assertions(6);

    const _ = console.info;

    const info = jest.fn();

    console.info = info;

    try {
      const _NODE_ENV = process.env.NODE_ENV;

      delete process.env.NODE_ENV;

      try {
        await fs.promises.writeFile(samplePath, "NODE_ENV=\nVERSION=");
        await fs.promises.writeFile(
          envPath,
          `NODE_ENV=production\nVERSION=0.1.0`,
        );

        dotenv({ path: envPath, sample: samplePath });

        expect(process.env.NODE_ENV).toBe("production");
        expect(process.env.VERSION).toBe("0.1.0");
        expect(info).toHaveBeenCalled();
        expect(info).toHaveBeenCalledTimes(2);
        expect(info.mock.calls[0][0]).toBe("🌟 production");
        expect(info.mock.calls[1][0]).toBe("🔖 0.1.0");
      } finally {
        process.env.NODE_ENV = _NODE_ENV;
      }
    } finally {
      console.info = _;
    }
  });

  it("pretty prints version using npm_package_version", async () => {
    expect.assertions(4);

    const value = crypto.randomBytes(32).toString("hex");

    const _ = console.info;

    const info = jest.fn();

    console.info = info;

    delete process.env.KEYWORD;
    delete process.env.VERSION;

    try {
      await fs.promises.writeFile(samplePath, "KEYWORD=");
      await fs.promises.writeFile(envPath, `KEYWORD=${value}`);

      const _NODE_ENV = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";
      try {
        dotenv({ path: envPath, sample: samplePath });
      } finally {
        process.env.NODE_ENV = _NODE_ENV;
      }

      expect(process.env.KEYWORD).toBe(value);
      expect(info).toHaveBeenCalled();
      expect(info).toHaveBeenCalledTimes(2);
      expect(info.mock.calls[1][0]).toBe(
        `🔖 ${process.env.npm_package_version}`,
      );
    } finally {
      console.info = _;
    }
  });

  it("allows overriding the output method", async () => {
    expect.assertions(3);

    await fs.promises.writeFile(samplePath, "__OUTPUT=");
    await fs.promises.writeFile(envPath, `__OUTPUT=none`);

    const output = jest.fn();

    dotenv({ path: envPath, sample: samplePath, output });

    expect(process.env.__OUTPUT).toBe("none");
    expect(output).toHaveBeenCalledTimes(1);
    expect(output).toHaveBeenCalledWith();
  });

  it("allows no output method", async () => {
    expect.assertions(2);

    await fs.promises.writeFile(samplePath, "__NO_OUTPUT=");
    await fs.promises.writeFile(envPath, `__NO_OUTPUT=true`);

    const _ = console.info;
    const info = jest.fn();
    console.info = info;
    try {
      dotenv({ path: envPath, sample: samplePath, output: null });

      expect(process.env.__NO_OUTPUT).toBe("true");
      expect(info).not.toHaveBeenCalled();
    } finally {
      console.info = _;
    }
  });

  it("works for no NODE_ENV and no VERSION", async () => {
    expect.assertions(2);

    await fs.promises.writeFile(samplePath, "MISSING_VARIABLES=");
    await fs.promises.writeFile(envPath, `MISSING_VARIABLES=1`);

    const _ = console.info;
    const info = jest.fn();
    console.info = info;
    try {
      const _NODE_ENV = process.env.NODE_ENV;
      const _npm_package_version = process.env.npm_package_version;
      delete process.env.VERSION;
      delete process.env.NODE_ENV;
      delete process.env.npm_package_version;
      try {
        dotenv({ path: envPath, sample: samplePath });

        expect(process.env.MISSING_VARIABLES).toBe("1");
        expect(info).not.toHaveBeenCalled();
      } finally {
        process.env.NODE_ENV = _NODE_ENV;
        process.env.npm_package_version = _npm_package_version;
      }
    } finally {
      console.info = _;
    }
  });

  it("works if no props passed", async () => {
    expect.assertions(1);

    const value = crypto.randomBytes(32).toString("hex");

    const samplePath = path.join(__dirname, "..", "..", "..", ".env.example");
    const envPath = path.join(__dirname, "..", "..", "..", ".env");

    await fs.promises.writeFile(samplePath, "KEYWORD=");
    try {
      await fs.promises.writeFile(envPath, `KEYWORD=${value}`);

      delete process.env.KEYWORD;

      try {
        dotenv();

        expect(process.env.KEYWORD).toBe(value);
      } finally {
        await fs.promises.unlink(envPath);
      }
    } finally {
      await fs.promises.unlink(samplePath);
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
