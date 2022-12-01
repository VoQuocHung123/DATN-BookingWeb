import mongoose from "mongoose";
const Schema = mongoose.Schema;
const BookCar = new Schema(
  {
   datetakecar : Date,
   datepaycar : Date,
   totalprice: Number,
   status: { type: String , enum : ['pending','processed','canceled'], default: 'pending' },
   carid: { type : Schema.Types.ObjectId, ref: 'Cars'},
   userid: { type : Schema.Types.ObjectId, ref: 'User'},
  },
  { timestamps: true }
);
export default mongoose.model("BookCar", BookCar);