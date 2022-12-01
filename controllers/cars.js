import Cars from "../models/cars.js";

export const createCar = async (req, res, next) => {
  try {
    let arrSlideImage = ["", "", "", ""];
    for (let i = 1; i < 5; i++) {
      if (req.files[`image${i}`]?.[0].filename) {
        arrSlideImage[i - 1] = req.files[`image${i}`]?.[0].filename;
      }
    }
    const newCar = new Cars({
      ...req.body,
      image: req.files["image"]?.[0].filename,
      slideimage: arrSlideImage,
    });
    const saveCar = await newCar.save();
    res.status(200).json(saveCar);
  } catch (error) {
    next(error);
  }
};

export const updateCar = async (req, res, next) => {
  try {
    const t = await Cars.find({}).select("slideimage");
    let arrSlideImage = t[0].slideimage;
    for (let i = 0; i < 5; i++) {
      if (req.files[`image${i}`]?.[0].filename) {
        arrSlideImage[i - 1] = req.files[`image${i}`]?.[0].filename;
      }
      if (req.body[`image${i}`] === "") {
        arrSlideImage[i - 1] = "";
      }
    }
    const updateCar = await Cars.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
        image: req.files["image"]?.[0].filename,
        slideimage: arrSlideImage,
      },
      { new: true }
    );
    res.status(200).json(updateCar);
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (req, res) => {
  try {
    await Cars.findByIdAndDelete(req.params.id);
    res.status(200).json("Car has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getById = async (req, res) => {
  try {
    const car = await Cars.findById(req.params.id);
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllCar = async (req,res,next)=>{
    try {
      let obj = {}
      const limit = Number(req.query.limit)
      const page = Number(req.query.page)
      const skip = limit * (page-1)
      const countCars = await Cars.find(obj).countDocuments()
      if(limit && page ){
        const cars = await Cars.find(obj).skip(skip).limit(limit);
        res.status(200).json({cars,countCars});
      }else{
        const cars = await Cars.find(obj)
        res.status(200).json({cars,countCars});
      }
    } catch (error) {
        res.status(500).json(error)
    }
}