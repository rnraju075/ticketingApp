import { TicketController } from "../interface/ticket";

export const ticketController: TicketController = {
  createTicket: async (req, res, next) => {
     res.status(201).send("creating a ticket");
  },
};


