import mongoose from "mongoose";
const Schema = mongoose.Schema;
const User = new Schema(
  {
    username: String,
    birthyear: String,
    phonenumber: String,
    age: Number,
    gender: { type: String, enum: ["male", "female"] },
    avatar: String,
    password: String,
    email: { type: String },
    isadmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export default mongoose.model("User", User);
