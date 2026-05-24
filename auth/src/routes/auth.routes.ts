import express from 'express';
import { authController } from '../controller/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { errorHandler } from '../middleware/error-handler.middleware';
import { currentUser } from "../middleware/current-user";
import { requireAuth } from '../middleware/requireAuth';


const authRouter = express.Router();
authRouter.use(errorHandler);
authRouter.post("/signup",authMiddleware, authController.signup);
authRouter.post("/signin",authMiddleware, authController.signin);
authRouter.post("/signout", authController.signout);
// authRouter.get("/currentuser",currentUser,requireAuth, authController.currentuser);
authRouter.get("/currentuser",currentUser, authController.currentuser);
authRouter.get("/getall", authController.getAllUsers);


export { authRouter };