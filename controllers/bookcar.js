import BookCar from "../models/bookcar.js";

export const createBookCar = async (req, res, next) => {
  try {
    const carId = req.params.carid;
    const newBooking = new BookCar({
      ...req.body,
      userid: req.user.id,
      carid: carId,
    });
    const saveBooking = await newBooking.save();
    res.status(200).json(saveBooking);
  } catch (error) {
    next(error);
  }
};

export const getAllBookingCar = async (req, res, next) => {
  try {
    const data = await BookCar.find()
      .populate({ path: "userid", select: "username email phonenumber" })
      .populate({ path: "carid", select: "name price category" });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const handleBookingCar = async (req, res, next) => {
  try {
    const idBooking = req.params.idbookcar;
    const updateStatus = await BookCar.findByIdAndUpdate(
      idBooking,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(updateStatus);
  } catch (error) {
    next(error);
  }
};
export const getbyUser = async (req, res, next) => {
  try {
    const data = await BookCar.find({ userid: req.params.userid })
      .populate({ path: "userid", select: "username email phonenumber" })
      .populate({ path: "carid", select: "name price category" });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export const deleteBookingCar = async (req, res, next) => {
    try {
      const idBooking = req.params.idbookcar;
      await BookCar.findByIdAndDelete(idBooking);
      res.status(200).json("Booking has been deleted");
    } catch (error) {
      next(error);
    }
  };