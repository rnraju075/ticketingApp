import express from 'express';
import { authMiddleware } from '@sgticketspvt/common';
import { errorHandler } from '@sgticketspvt/common';
import { currentUser } from "@sgticketspvt/common";
import { requireAuth } from '@sgticketspvt/common';
import { authController } from '../controller/auth.controller';


const authRouter = express.Router();
authRouter.use(errorHandler);
authRouter.post("/signup",authMiddleware, authController.signup);
authRouter.post("/signin",authMiddleware, authController.signin);
authRouter.post("/signout", authController.signout);
// authRouter.get("/currentuser",currentUser,requireAuth, authController.currentuser);
authRouter.get("/currentuser",currentUser, authController.currentuser);
authRouter.get("/getall", authController.getAllUsers);


export { authRouter };