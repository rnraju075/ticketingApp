import { NextFunction,Request,Response } from "express";

export interface AuthController {
  signup: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  signin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  signout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  currentuser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}