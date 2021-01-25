import Joi from "joi";
import { body, params, query } from "../src/index";
import { HttpError } from "@ev-fns/errors";

describe("validations", () => {
  describe("body", () => {
    const schema = Joi.object()
      .keys({
        searchType: Joi.string()
          .lowercase()
          .valid("nearest", "within")
          .default("nearest"),
        location: Joi.object()
          .keys({
            type: Joi.string().valid("Pointer").default("Pointer"),
            coordinates: Joi.array()
              .items(Joi.number().required())
              .length(2)
              .required(),
          })
          .required(),
      })
      .required();

    it("replaces the content of the body with the joi result", async () => {
      expect.assertions(3);

      const coordinates = [-43.36717, -22.98855];
      const next = jest.fn();
      const req = {
        body: { location: { coordinates } },
      };

      await body(schema)(req as any, null as any, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next.mock.calls[0].length).toBe(0);
      expect(req).toEqual({
        body: {
          searchType: "nearest",
          location: { type: "Pointer", coordinates },
        },
      });
    });

    it("calls next with 400 error if invalid body", async () => {
      expect.assertions(4);

      const coordinates = [-49.33675, -25.4429];
      const next = jest.fn();
      const req = {
        body: { position: { coordinates } },
      } as any;

      await body(schema)(req, null as any, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next.mock.calls[0][0]).toBeInstanceOf(HttpError);
      expect(next.mock.calls[0][0].status).toBe(400);
      expect(req).toEqual({ body: { position: { coordinates } } });
    });
  });

  describe("params", () => {
    const schema = Joi.object()
      .keys({
        document: Joi.string()
          .regex(/^\d{2}.?\d{3}.?\d{3}\/?\d{3}-?\d{2}$/)
          .replace(/\D+/g, "")
          .length(14)
          .required(),
      })
      .required();

    it("replaces the content of the params with the joi result", async () => {
      expect.assertions(3);

      const document = "02.453.716/000170";
      const next = jest.fn();

      const req = { params: { document } };

      await params(schema)(req as any, null as any, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next.mock.calls[0].length).toBe(0);
      expect(req).toEqual({ params: { document: "02453716000170" } });
    });

    it("calls next with 400 error if invalid params", async () => {
      expect.assertions(4);

      const document = "O4.433.714/0001-44X";
      const next = jest.fn();

      const req = { params: { document } };

      await params(schema)(req as any, null as any, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next.mock.calls[0][0]).toBeInstanceOf(HttpError);
      expect(next.mock.calls[0][0].status).toBe(400);
      expect(req).toEqual({ params: { document } });
    });
  });

  describe("query", () => {
    const schema = Joi.object()
      .keys({
        lat: Joi.number().min(-90).max(90).required(),
        long: Joi.number().min(-180).max(180).required(),
      })
      .required();

    it("replaces the content of the query with the joi result", async () => {
      expect.assertions(3);

      const position = { lat: "-43.36717", long: "-22.98855" };
      const next = jest.fn();

      const req = { query: { ...position } };

      await query(schema)(req as any, null as any, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next.mock.calls[0].length).toBe(0);
      expect(req).toEqual({ query: { lat: -43.36717, long: -22.98855 } });
    });

    it("calls next with 400 error if invalid query", async () => {
      expect.assertions(4);

      const position = { lat: "-249.25761", long: "-25.40403" };
      const next = jest.fn();

      const req = { query: { ...position } };

      await query(schema)(req as any, null as any, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next.mock.calls[0][0]).toBeInstanceOf(HttpError);
      expect(next.mock.calls[0][0].status).toBe(400);
      expect(req).toEqual({ query: { ...position } });
    });
  });
});
