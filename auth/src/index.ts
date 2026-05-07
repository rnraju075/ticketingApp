import express from 'express';
import { authRouter } from './routes/auth.routes.js';
import { errorHandler } from './middleware/error-handler.middleware.js';

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

// ✅ MUST BE LAST
app.use(errorHandler);

app.listen(3000, () => {
  console.log("server running on port 3000");
});