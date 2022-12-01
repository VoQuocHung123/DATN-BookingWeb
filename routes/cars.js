import express from 'express';
import upload from '../configs/multer.js'
import { createCar , updateCar, deleteCar ,getById,getAllCar } from '../controllers/cars.js';
import { verifyAdmin } from '../utils/vertifyToken.js';
const router = express.Router();
router.put("/:id",upload.fields([{name: 'image', maxCount: 1},{name: 'image1', maxCount: 1},{name: 'image2', maxCount: 1},{name: 'image3', maxCount: 1},{name: 'image4', maxCount: 1}]),verifyAdmin,updateCar)
router.post("/",upload.fields([{name: 'image', maxCount: 1},{name: 'image1', maxCount: 1},{name: 'image2', maxCount: 1},{name: 'image3', maxCount: 1},{name: 'image4', maxCount: 1}]),verifyAdmin,createCar);
router.delete("/:id",verifyAdmin,deleteCar)
router.get("/:id",getById)
router.get("/",getAllCar)
export default router