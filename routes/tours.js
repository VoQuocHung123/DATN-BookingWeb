import express from 'express';
import { createTour, deleteTour, getAll, getById, updateTour, getNewTour, getTourIn, getTourOut } from '../controllers/tour.js';
import { verifyAdmin } from '../utils/vertifyToken.js';
import upload from '../configs/multer.js'
const router = express.Router();

router.get('/',getAll)
router.get('/newtour',getNewTour)
router.get('/tourin',getTourIn)
router.get('/tourout',getTourOut)
router.get("/:id", getById)
router.delete("/:id",verifyAdmin,deleteTour)
router.put("/:id",upload.fields([{name: 'image', maxCount: 1},{name: 'image1', maxCount: 1},{name: 'image2', maxCount: 1},{name: 'image3', maxCount: 1},{name: 'image4', maxCount: 1}]),verifyAdmin,updateTour)
router.post("/",upload.fields([{name: 'image', maxCount: 1},{name: 'image1', maxCount: 1},{name: 'image2', maxCount: 1},{name: 'image3', maxCount: 1},{name: 'image4', maxCount: 1}]),verifyAdmin,createTour);
export default router