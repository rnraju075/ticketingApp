import type { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            currentUser?: { id: string; email: string };
        }
    }
}
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.jwt) {
    next();
    return;
  }

    try {
        const payload = Jwt.verify(req.session.jwt, process.env.JWT_KEY!) as { id: string; email: string };
        req.currentUser = payload;
    } catch (error) {}
        next();
};