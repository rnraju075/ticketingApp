import { AuthController } from "../interface/auth.interface.js";


export const authController: AuthController = {
  signup: async (req, res, next) => {
    console.log("signup route hit",req.body);
    const {email,password} = req.body;
    try {
      res.send("signup route");
    } catch (error) {
      next(error);
    }
  },

  signin: async (req, res, next) => {
    try {
      res.send("signin route");
    } catch (error) {
      next(error);
    }
  },

  signout: async (req, res, next) => {
    try {
      res.send("signout route");
    } catch (error) {
      next(error);
    }
  },

  currentuser: async (req, res, next) => {
    try {
      res.send("hi there");
    } catch (error) {
      next(error);
    }
  },
};