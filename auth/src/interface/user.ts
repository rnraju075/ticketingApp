import mongoose from "mongoose";

export interface UserAttrs {
  email: string;
  password: string;
}

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(suppliedPassword: string): Promise<boolean>;
}

export interface UserModel extends mongoose.Model<IUser> {
  build(attrs: UserAttrs): IUser;
}

export interface UserResponse {
  id?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
  email: string;
  password?: string;
  __v?: number;
  createdAt?: Date;
  updatedAt?: Date;
}