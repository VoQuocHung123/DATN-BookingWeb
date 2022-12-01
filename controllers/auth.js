import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const userEmail = await Users.find({ email: req.body.email });
    const userName = await Users.find({ username: req.body.username });
    if(!req.body.username || !req.body.email || !req.body.password){
      return next(createError(400,"Vui lòng nhập đầy đủ thông tin"))
    }
    if (userEmail.length === 0 && userName.length === 0) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      await newUser.save();
      res.status(200).send("User has been created");
    } else {
        console.log('abc')  
      return next(createError(400, "Email hoặc tên tài khoản này đã được đăng ký"));
    }
  } catch (error) {
    next(error)
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await Users.findOne({ username: req.body.username });
    if(!req.body.username  || !req.body.password ){
      return next(createError(400,"Vui lòng nhập đầy đủ thông tin"))
    }
    if (!user) {
      return next(createError(404, "Không tìm thấy tên tài khoản"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Sai tên đăng nhập hoặc mật khẩu"));
    }
    const token = jwt.sign(
      { id: user._id, isadmin: user.isadmin },
      process.env.JWT
    );
    const { password, isadmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token)
      .status(200)
      .json({ details: { ...otherDetails }, isadmin });
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    const token = "";
    res.cookie("access_token", token);
    res.status(200).json("Logout success");
  } catch (error) {
    next(error);
  }
};
