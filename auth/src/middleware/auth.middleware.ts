import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-errors";
import { NextFunction,Request,Response } from "express";

export const authMiddleware = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be valid"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // console.log("validation errors", errors.array());

      // ✅ THIS IS THE MISSING LINE
      return next(new RequestValidationError(errors.array()));
    }

    next();
  },
];