import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Cars = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    image: String,
    slideimage: [String],
    description: String,
    soluong: Number,
    bookings : [ { type : Schema.Types.ObjectId , ref : 'BooKCar'}]
  },
  { timestamps: true }
);
export default mongoose.model("Cars", Cars);