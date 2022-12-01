import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/vertifyToken.js';
import {createReview, deleteReview, editStatusReview,getReviewByTour, getAllReview, getReview, updateReview} from '../controllers/review.js';
const router = express.Router();
// //CREATE
router.post('/:tourid',verifyUser,createReview)
// //UPDATE 
router.put('/:reviewid',verifyUser,updateReview)
// //DELETE
router.delete('/:reviewid',verifyUser,deleteReview)
// //GET
router.get('/:reviewid',verifyUser,getReview)
// //GETALL
router.get('/',getAllReview)
// //EDITSTATUS
router.put('/editstatus/:reviewid',verifyAdmin,editStatusReview)
// GET REVIEW BY TOUR
router.get('/bytour/:tourid',getReviewByTour)
export default router