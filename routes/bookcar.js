import express from 'express';
const router = express.Router();
import {createBookCar, deleteBookingCar, getAllBookingCar, getbyUser, handleBookingCar} from '../controllers/bookcar.js'
import {verifyAdmin, verifyUser} from '../utils/vertifyToken.js'

router.post('/:carid',verifyUser,createBookCar)
router.get('/',verifyAdmin,getAllBookingCar)
router.put('/:idbookcar',verifyUser,handleBookingCar)
router.get('/:userid',verifyUser,getbyUser)
router.delete('/:idbookcar',verifyUser,deleteBookingCar)


export default router