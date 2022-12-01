import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path'
const __dirname = path.resolve();
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import toursRoute from './routes/tours.js'
import bookToursRoute from './routes/booktour.js'
import bookCarsRoute from './routes/bookcar.js'
import review from './routes/review.js'
import carsRoute from './routes/cars.js'
const app = express();

dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongoDB")
  } catch (error) {
    throw error;
  }
};
app.use(cors({
  origin: ['http://localhost:3002' ,'http://localhost:3000'],
  credentials: true,
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth',authRoute)
app.use('/api/users',usersRoute)
app.use('/api/tours',toursRoute)
app.use('/api/cars',carsRoute)
app.use('/api/booktours',bookToursRoute)
app.use('/api/bookcars',bookCarsRoute)
app.use('/api/reviews',review)
app.use(express.static(path.join(__dirname,'/public/')))

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});
  
app.listen(process.env.PORT, () => {
    connect();
  console.log("Server is running ");
});