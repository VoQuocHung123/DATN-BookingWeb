import express from 'express';
import { createBookTour, deleteBookingTour, getAllBookingTour, getbyUser, handleBookingTour } from '../controllers/booktour.js';
import { verifyAdmin, verifyUser } from '../utils/vertifyToken.js';
const router = express.Router();
//CREATE
router.post('/:tourid',verifyUser,createBookTour)
//UPDATE
//DELETE
//GET
//GETALL
router.get('/',verifyAdmin,getAllBookingTour)
router.get('/:userid',verifyUser,getbyUser)
router.put('/:booktourid',verifyUser,handleBookingTour)
router.delete('/:booktourid',verifyUser,deleteBookingTour)
export default router