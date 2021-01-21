import { RequestHandler } from "express";
import { HttpError } from "./HttpError";

export const notFound: RequestHandler = (req, res, next) => {
  next(new HttpError(404, "Resource not found"));
};
