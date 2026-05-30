import { NextFunction,Request,Response } from "express";

export interface TicketController {
  createTicket: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
