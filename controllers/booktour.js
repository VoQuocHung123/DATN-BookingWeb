import BookTour from "../models/booktour.js";
import Tour from "../models/tour.js";

export const createBookTour = async (req, res, next) => {
  try {
    const tourId = req.params.tourid;
    const newBooking = new BookTour({
      ...req.body,
      userid: req.user.id,
      tourid: tourId,
    });
    const saveBooking = await newBooking.save();
    try {
      const numberseats = await Tour.find({ _id: tourId }).select(
        "numberseats"
      );
      let a = numberseats[0].numberseats;
      await Tour.findByIdAndUpdate(tourId, {
        $push: { bookings: saveBooking._id },
        numberseats: a - (Number(req.body.adults) + Number(req.body.children)),
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(saveBooking);
  } catch (error) {
    next(error);
  }
};
export const getAllBookingTour = async (req, res, next) => {
  console.log("abc");
  try {
    const data = await BookTour.find()
      .populate({ path: "userid", select: "username email phonenumber" })
      .populate({ path: "tourid", select: "title datestart dateend" });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export const handleBookingTour = async (req, res, next) => {
  const idBooking = req.params.booktourid;
  console.log(req.body.status);
  const updateStatus = await BookTour.findByIdAndUpdate(
    idBooking,
    { status: req.body.status },
    { new: true }
  );
  if (req.body.status === "canceled") {
    try {
      const idTour = await BookTour.findById(req.params.booktourid).select("tourid adults children")
      console.log(idTour)
      const numberseats = await Tour.findById({ _id: idTour.tourid }).select(
        "numberseats"
      );
      let a = numberseats.numberseats;
      await Tour.findByIdAndUpdate(idTour.tourid, {
        numberseats: a + (Number(idTour.adults) + Number(idTour.children)),
      });
    } catch (error) {
      next(error);
    }
  }
  console.log(updateStatus);
  res.status(200).json(updateStatus);
  try {
  } catch (error) {
    next(error);
  }
};
export const deleteBookingTour = async (req, res, next) => {
  try {
    const idBooking = req.params.booktourid;
    await BookTour.findByIdAndDelete(idBooking);
    res.status(200).json("Booking has been deleted");
  } catch (error) {
    next(error);
  }
};
export const getbyUser = async (req, res, next) => {
  try {
    const data = await BookTour.find({ userid: req.params.userid })
      .populate({ path: "userid", select: "username email phonenumber" })
      .populate({ path: "tourid", select: "title datestart dateend" });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
