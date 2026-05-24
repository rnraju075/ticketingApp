import express from "express";
import { authRouter } from "./routes/auth.routes";
import { errorHandler } from "./middleware/error-handler.middleware";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true); // trust first proxy
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", // set to true in production with HTTPS
  }),
);
app.use("/api/auth", authRouter);

// no page found
app.use((req, res) => {
  throw new NotFoundError();
});
// ✅ MUST BE LAST
app.use(errorHandler);

export { app };