import express from "express";
import { createUser, deleteUser, getAll, getById, updateUser } from "../controllers/users.js";
import { verifyAdmin, verifyUser } from "../utils/vertifyToken.js";
import upload from '../configs/multer.js'
const router = express.Router();
//CREATE
// router.post("/",verifyUser, createUser);
//UPDATE
// router.put("/:id",verifyUser, updateUser)
//DELETE
// router.delete("/:id",verifyUser, deleteUser)
//GET
// router.get("/:id",verifyUser, getById)
//GETALL
// router.get('/',verifyAdmin, getAll)
router.get('/',verifyAdmin,getAll)
router.get("/:id",verifyUser, getById)
router.delete("/:id",verifyAdmin,deleteUser)
router.put("/:id",upload.single('avatar'),verifyUser,updateUser)
router.post("/",upload.single('avatar'),verifyAdmin,createUser);
export default router;
