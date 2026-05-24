import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, UserResponse } from "../interface/user";


const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    // timestamps: true,

    toJSON: {
      transform: function (doc, ret:UserResponse) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;

        return ret;
      },
    },
  }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (
  suppliedPassword: string
) {
  return bcrypt.compare(suppliedPassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);