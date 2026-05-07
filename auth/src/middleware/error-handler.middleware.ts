import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-errors.js";
import { databaseConnectionError } from "../errors/database-connection-error.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  // ✅ Validation Error
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map(e => ({
      message: e.msg,
      field: e.path,
    }));

    return res.status(400).json({
      errors: formattedErrors,
    });
  }

  // ✅ DB Error
  if (err instanceof databaseConnectionError) {
    return res.status(500).json({
      errors: [{ message: err.message }],
    });
  }

  // ✅ Generic Error
  return res.status(400).json({
    errors: [{ message: err.message || "Something went wrong" }],
  });
};