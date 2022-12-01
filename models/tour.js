import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Tour = new Schema(
  {
    title: String,
    timetour: String,
    priceadults: Number,
    pricechild : Number,
    datestart : Date,
    dateend: Date, 
    numberseats: Number,
    category: String,
    image: String,
    slideimage: [String],
    description: String,
    bookings : [ { type : Schema.Types.ObjectId , ref : 'BooKTour'}]
  },
  { timestamps: true }
);
export default mongoose.model("Tour", Tour);