import { response } from "express";
import Review from "../models/review.js";
export const createReview = async (req, res, next) => {
  try {
    const tourId = req.params.tourid;
    const newReview = new Review({
      ...req.body,
      userid: req.user.id,
      tourid: tourId,
    });
    const saveReview = await newReview.save();
    res.status(200).json(saveReview);
  } catch (error) {
    next(error);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.reviewid);
    res.status(200).json("Review has been deleted");
  } catch (error) {
    next(error);
  }
};
export const updateReview = async (req, res, next) => {
  try {
    const editReview = await Review.findByIdAndUpdate(
      req.params.reviewid,
      { $set: req.body },
      { new: true }
    );
    console.log(editReview);
    res.status(200).json(editReview);
  } catch (error) {
    next(error);
  }
};
export const getAllReview = async (req, res, next) => {
  try {
    // const data = await Review.aggregate([
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "id",
    //       foreignField: "userid",
    //       as: "userreview",
    //     },
    //   },
    //   { $unwind: "$userreview" },
    //   {
    //     $lookup: {
    //       from: "tours",
    //       localField: "id",
    //       foreignField: "tourid",
    //       as: "tourinfor",
    //     },
    //   },
    //   { $unwind: "$tourinfor" },
    //   {
    //     $project: {
    //       _id: 1,
    //       title: "$tourinfor.title",
    //       username: "$userreview.username",
    //       email: "$userreview.email",
    //       content: 1,
    //       rating: 1,
    //       status: 1,
    //     },
    //   },
    // ]);
    const data = await Review.find().populate({ path: 'userid', select:'username email phonenumber'}).populate({path: 'tourid',select:'title datestart dateend'})
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export const getReview = async (req, res, next) => {
  try {
    const data = await Review.findById(req.params.reviewid);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export const editStatusReview = async (req, res, next) => {
  try {
    const status = await Review.findByIdAndUpdate(
      req.params.reviewid,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(status)
  } catch (error) {
    next(error)
  }
};
export const getReviewByTour = async (req,res,next)=>{
  try {
    console.log(req.params.tourid)
    const reviewByTour = await Review.find({tourid: req.params.tourid}).populate({ path: 'userid', select:'username avatar'})
    console.log(reviewByTour)
    res.status(200).json(reviewByTour)
  } catch (error) {
    next(error)
  }
}
