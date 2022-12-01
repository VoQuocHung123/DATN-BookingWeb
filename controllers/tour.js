import Tour from "../models/tour.js";
export const createTour = async (req, res, next) => {
  try {
    let arrSlideImage =["","","",""];
    for( let i=1 ; i < 5; i++){
      if(req.files[`image${i}`]?.[0].filename){
        arrSlideImage[i-1]= req.files[`image${i}`]?.[0].filename
      }
    }
    const newTour = new Tour({...req.body, image: req.files['image']?.[0].filename, slideimage: arrSlideImage});
    const saveTour = await newTour.save();
    res.status(200).json(saveTour);
  } catch (error) {
    next(error);
  }
};
export const updateTour = async (req, res, next) => {
  try {
    const t = await Tour.find({}).select('slideimage')
    let arrSlideImage = t[0].slideimage;
    for( let i=0 ; i < 5; i++){
      if(req.files[`image${i}`]?.[0].filename){
        arrSlideImage[i-1]= req.files[`image${i}`]?.[0].filename
      }
      if(req.body[`image${i}`] === ""){
        arrSlideImage[i-1]= ''
      }
    }
    const updateTour = await Tour.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, image: req.files['image']?.[0].filename, slideimage: arrSlideImage },
      { new: true }
    );
    res.status(200).json(updateTour);
  } catch (error) {
    next(error);
  }
};
export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json("Tour has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getAll = async (req, res) => {
  try {
    const limit = Number(req.query.limit)
    const page = Number(req.query.page)
    const title = req.query.title
    const datestart = req.query.datestart
    const dateend = req.query.dateend
    const pricemin = req.query.pricemin
    const pricemax = req.query.pricemax
    const category = req.query.category
    let obj ={}
    if(title){
      const content = new RegExp(`.*${title}.*`);
      obj.title = content
    }
    if(datestart){
      obj.datestart = req.query.datestart
    }
    if(dateend){
      obj.dateend = req.query.dateend
    }
    if(pricemin || pricemax){
      obj.priceadults = {$gte: pricemin, $lte: pricemax}
    }
    if(category){
      obj.category = req.query.category
    }
    console.log(obj)
    const skip = limit * (page-1)
    const countTour = await Tour.find(obj).countDocuments()
    if(limit && page ){
      const tours = await Tour.find(obj).skip(skip).limit(limit);
      res.status(200).json({tours,countTour});
    }else{
      const tours = await Tour.find(obj)
      res.status(200).json({tours,countTour});
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getNewTour = async (req,res,next)=>{
  try {
    const newTour = await Tour.find().limit(3)
    res.status(200).json(newTour)
  } catch (error) {
    next(error)
  }
}
export const getTourIn = async (req,res,next)=>{
  try {
    const tourIn = await Tour.find({category: 'Tour Trong Nước'})
    console.log(tourIn)
    res.status(200).json(tourIn)
  } catch (error) {
    next(error)
  }
}
export const getTourOut = async (req,res,next)=>{
  try {
    const tourOut = await Tour.find({category: 'Tour Ngoài Nước'})
    console.log(tourOut)
    res.status(200).json(tourOut)
  } catch (error) {
    next(error)
  }
}
