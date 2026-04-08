import mongoose from "mongoose";
import validator from "validator";
import {ADMIN , USER } from '../utils/roles.js'


const Userschema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Enter a valid email"],
    },

    password: {
      type: String,
      required: true,
      select: false, 
    },
    role : {
      type: String , 
      enum : [ADMIN , USER],
      default : USER,
      required : true ,
      
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", Userschema, "users");

export default User;