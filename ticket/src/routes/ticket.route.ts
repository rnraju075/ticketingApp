import express from "express";
import { ticketController } from "../controller/ticket.controller";
import { RequestValidationError, requireAuth, validateRequest } from "@sgticketspvt/common";
import { body } from "express-validator";

const ticketRouter = express.Router();

ticketRouter.post("/",requireAuth,[
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
],
validateRequest, ticketController.createTicket);

export { ticketRouter };
