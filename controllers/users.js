import User from "../models/users.js";
import bcrypt from "bcrypt";
export const createUser = async (req, res,next) => {  
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password,salt)
  try {
    const newUser = new User({...req.body,password: hash, avatar: req.file ? req.file.filename : "" });
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    console.log(err)
    next(err) 
  }
};
export const updateUser = async (req, res) => {
  try {
    if(req.file){
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, avatar: req.file.filename  },
      { new: true }
    );
    res.status(200).json(updateUser);
    }else{
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getAll = async (req,res)=>{
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error);
    }
}