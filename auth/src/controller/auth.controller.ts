import Jwt from "jsonwebtoken";
import { BadRequestError } from "@sgticketspvt/common";
import { AuthController } from "../interface/auth.interface";
import { User } from "../models/user";

export const authController: AuthController = {
  signup: async (req, res, next) => {
    // console.log("signup route hit", req.body);

    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new BadRequestError("Email already in use");
      }

      const user = new User({
        email,
        password,
      });

      await user.save();

      // generate JWT
      const userJwt = Jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!,
      );
      // store it on session object

      req.session = {
        jwt: userJwt,
      };

      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  },

  signin: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new BadRequestError("Invalid credentials");
      }

      const passwordMatch = await user.comparePassword(password);
      if (!passwordMatch) {
        throw new BadRequestError("Invalid credentials");
      }

      const userJwt = Jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!,
      );

      req.session = {
        jwt: userJwt,
      };

      res.status(200).send({ user, token: userJwt });
    } catch (error) {
      next(error);
    }
  },

  signout: async (req, res, next) => {
    req.session = null;
      res.status(200).send({ message: "Signed out successfully" });
  },

  currentuser: async (req, res, next) => {
    res.send({ currentUser: req.currentUser || null });  
  },
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      next(error);
    }
}
};
