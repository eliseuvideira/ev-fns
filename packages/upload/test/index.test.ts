import express from "express";
import supertest from "supertest";
import fs from "fs";
import path from "path";
import upload from "../src/index";
import { exception, notFound } from "@ev-fns/errors";

describe("upload", () => {
  const FILE_PATH = path.join(__dirname, "file.txt");

  beforeAll(async () => {
    await fs.promises.writeFile(FILE_PATH, "file content");
  });

  afterAll(async () => {
    await fs.promises.unlink(FILE_PATH);
  });

  it("uploads a file", async () => {
    expect.assertions(2);

    const app = express();

    app.post(
      "/",
      upload({
        storageType: "memory",
        field: "file",
        fileSize: 50 * 1024 * 1024,
      }),
      (req: any, res: any) => {
        expect(req.file).toBeDefined();
        res.status(204).end();
      }
    );

    const request = supertest(app);

    const response = await request.post("/").attach("file", FILE_PATH);

    expect(response.status).toBe(204);
  });

  it("checks field name", async () => {
    expect.assertions(1);

    const app = express();

    app.post(
      "/",
      upload({
        storageType: "memory",
        field: "file",
        fileSize: 50 * 1024 * 1024,
      }),
      (req: any, res: any) => {
        res.status(204).end();
      }
    );

    app.use(notFound);
    app.use(exception);

    const request = supertest(app);

    const response = await request.post("/").attach("invalid", FILE_PATH);

    expect(response.status).toBe(400);
  });

  it("checks file size", async () => {
    expect.assertions(1);

    const app = express();

    app.post(
      "/",
      upload({
        storageType: "memory",
        field: "file",
        fileSize: 1,
      }),
      (req: any, res: any) => {
        res.status(204).end();
      }
    );

    app.use(notFound);
    app.use(exception);

    const request = supertest(app);

    const response = await request.post("/").attach("file", FILE_PATH);

    expect(response.status).toBe(400);
  });

  it("checks mimetypes", async () => {
    expect.assertions(1);

    const app = express();

    app.post(
      "/",
      upload({
        storageType: "memory",
        field: "file",
        fileSize: 50 * 1024 * 1024,
        mimetypes: ["image/png", "image/jpg", "image/jpeg"],
      }),
      (req: any, res: any) => {
        res.status(204).end();
      }
    );

    app.use(notFound);
    app.use(exception);

    const request = supertest(app);

    const response = await request.post("/").attach("file", FILE_PATH);

    expect(response.status).toBe(400);
  });

  it("works with disk storage", async () => {
    expect.assertions(2);

    const app = express();

    app.post(
      "/",
      upload({
        storageType: "disk",
        field: "file",
        fileSize: 50 * 1024 * 1024,
        storagePath: __dirname,
        getFilename: () => "file2.txt",
      }),
      (req: any, res: any) => {
        res.status(204).end();
      }
    );

    app.use(notFound);
    app.use(exception);

    const request = supertest(app);

    const response = await request.post("/").attach("file", FILE_PATH);

    try {
      expect(response.status).toBe(204);

      let stat: fs.Stats;
      try {
        stat = await fs.promises.stat(path.join(__dirname, "file2.txt"));
      } catch (err) {
        fail(`disk storage failed to save file`);
        throw err;
      }

      expect(stat).toBeDefined();
    } finally {
      await fs.promises.unlink(path.join(__dirname, "file2.txt"));
    }
  });
});
