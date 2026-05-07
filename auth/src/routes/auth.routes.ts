import express from 'express';
import { authController } from '../controller/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { errorHandler } from '../middleware/error-handler.middleware.js';

const authRouter = express.Router();
authRouter.use(errorHandler);
authRouter.post("/signup",authMiddleware, authController.signup);
authRouter.post("/signin",authMiddleware, authController.signin);
authRouter.post("/signout", authController.signout);
authRouter.get("/currentuser", authController.currentuser);


export { authRouter };