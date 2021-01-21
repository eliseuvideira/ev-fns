import supertest from "supertest";
import express from "express";
import openapi from "../src/index";

describe("openapi", () => {
  it("renders swagger-ui", async () => {
    expect.assertions(2);

    const app = express();

    app.use(openapi());

    const request = supertest(app);

    const response = await request.get("/api-docs/");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Swagger UI");
  });

  it("redirects to api-docs path", async () => {
    expect.assertions(2);

    const app = express();

    app.use(openapi());

    const request = supertest(app);

    const response = await request.get("/");

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/api-docs/");
  });

  it("works with custom api-docs path", async () => {
    expect.assertions(4);

    const app = express();

    app.use(openapi({ path: "/custom-api" }));

    const request = supertest(app);

    let response = await request.get("/custom-api/");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Swagger UI");

    response = await request.get("/");

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/custom-api/");
  });
});
