import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Review = new Schema(
  {
    content : {
        type : String ,
        require : true,
    },
    status: {type : String ,default: 'enable', enum: ['enable','disable']},
    rating: Number,
    tourid: { type : Schema.Types.ObjectId, ref: 'Tour'},
    userid: { type : Schema.Types.ObjectId, ref: 'User'},
  },
  { timestamps: true }
);
export default mongoose.model("Review", Review);