import mongoose from "mongoose";
const Schema = mongoose.Schema;
const BookTour = new Schema(
  {
   adults: Number,
   children : Number,
   totalprice : Number,
   status: { type: String , enum : ['pending','processed','canceled'], default: 'pending' },
   tourid: { type : Schema.Types.ObjectId, ref: 'Tour'},
   userid: { type : Schema.Types.ObjectId, ref: 'User'},
  },
  { timestamps: true }
);
export default mongoose.model("BookTour", BookTour);