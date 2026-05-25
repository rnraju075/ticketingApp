import type { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  // ✅ Validation Error
  if (err instanceof CustomError) {
    
    return res.status(err.statusCode).json({
      errors:err.serializeError() ,
    });
  }
 
  // ✅ DB Error
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      errors: err.serializeError(),
    });
  }

  // ✅ Generic Error
  return res.status(400).json({
    errors: [{ message: err.message || "Something went wrong" }],
  });
};