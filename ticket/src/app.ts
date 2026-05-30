import express from "express";
import { errorHandler,NotFoundError, currentUser } from "@sgticketspvt/common";

import cookieSession from "cookie-session";
import { ticketRouter } from "./routes/ticket.route";

const app = express();
app.set("trust proxy", true); // trust first proxy
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", // set to true in production with HTTPS
  }),
);
app.use(currentUser);
app.use("/api/ticket", ticketRouter);

// no page found
app.use((req, res) => {
  throw new NotFoundError();
});
// ✅ MUST BE LAST
app.use(errorHandler);

export { app };