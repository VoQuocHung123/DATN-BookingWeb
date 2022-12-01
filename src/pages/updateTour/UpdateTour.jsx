import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./updateTour.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import InputSlideImage from "../../components/InputSlideImage/InputSlideImage";
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useLocation, useNavigate } from "react-router-dom";
function UpdateTour() {
  const [file, setFile] = useState("");
  const navigate = useNavigate()
  const location = useLocation();
  const [openAddSnackbar, setOpenAddSnackbar]= useState(false);
  const [previewSlideImage, setPreviewSlideImage] = useState( location.state.slideimage ? location.state.slideimage.map((item)=> item === "" ? "":`http://localhost:3001/${item}`) :  ["", "", "", ""]);
  const [slideImage, setSlideImage] = useState(location.state.slideimage.reduce((acc, value, index) => ({ ...acc, [`image${index + 1}`]: value }), {}))
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const handleSlideImage = (e, index) => {
    const file = e.target.files[0];
    const arrImageSlide = [...previewSlideImage];
    arrImageSlide[index] = URL.createObjectURL(file);
    setPreviewSlideImage(arrImageSlide);
    const dataSlide = {...slideImage,[`image${index+1}`] : file}
    setSlideImage(dataSlide)
  };
  const handleDeleteImageSlide = (index) => {
    const arrImageSlide = [...previewSlideImage];
    arrImageSlide[index] = "";
    setPreviewSlideImage(arrImageSlide);
    const dataSlide = {...slideImage,[`image${index+1}`] : ""}
    setSlideImage(dataSlide)
  };
  const updateTour = async (values) => {
    console.log(slideImage)
    try {
      const formData = new FormData();
      for( const name in values){
        formData.append(name, values[name])
      }
      for(const name in slideImage){
        formData.append(name,slideImage[name])
      }
      axios.defaults.withCredentials = true;
      await axios.put(`http://localhost:3001/api/tours/${location.state.id}`,formData)
      setOpenAddSnackbar(true)
      setTimeout(()=>{navigate(-1)},1000)
    } catch (error) {
      console.log(error)
    }
  }
  
  const formik = useFormik({
    initialValues: {
      title: location.state.title? location.state.title : "",
      timetour: location.state.timetour? location.state.timetour : "",
      numberseats: location.state.numberseats? location.state.numberseats : "",
      priceadults: location.state.priceadults? location.state.priceadults : "",
      pricechild: location.state.pricechild? location.state.pricechild : "",
      datestart: new Date(location.state.datestart).toLocaleDateString('zh-Hans-CN').replaceAll('/','-'),
      dateend:  new Date(location.state.dateend).toLocaleDateString('zh-Hans-CN').replaceAll('/','-'),
      category: location.state.category? location.state.category : "",
      description: location.state.description? location.state.description : "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Vui lòng nhập tiêu đề "),
      timetour: Yup.string().required("Vui lòng nhập thời gian tour"),
      numberseats: Yup.number()
        .typeError("Số chỗ phải là giá trị số")
        .required("Vui lòng nhập số chỗ"),
      priceadults: Yup.string().required("Vui lòng nhập giá người lớn"),
      pricechild: Yup.string().required("Vui lòng nhập giá trẻ em"),
      datestart: Yup.string().required("Vui lòng chọn ngày bắt đầu"),
      dateend: Yup.string().required("Vui lòng chọn ngày kết thúc"),
      category: Yup.string().required("Vui lòng chọn thể loại"),
      description: Yup.string().required("Vui lòng thêm mô tả"),
    }),
    onSubmit: (values) => {
      updateTour(values)
    },
  });

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thêm mới tour du lịch</h1>
        </div>
        <div className="bottom">
          <form onSubmit={formik.handleSubmit}>
            <div className="left">
              <div className="formInput">
                <label>Tiêu Đề:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  placeholder="Nhập tiêu đề "
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
                <p className="msg-err">
                  {formik.errors.title &&
                    formik.touched.title &&
                    formik.errors.title}
                </p>
              </div>
              <div className="formInput">
                <label>Thời gian:</label>
                <input
                  type="text"
                  id="timetour"
                  name="timetour"
                  className="form-input"
                  placeholder="Nhập thời gian"
                  value={formik.values.timetour}
                  onChange={formik.handleChange}
                />
                <p className="msg-err">
                  {formik.errors.timetour &&
                    formik.touched.timetour &&
                    formik.errors.timetour}
                </p>
              </div>
              <div className="child-form">
                <div className="formInput">
                  <label>Giá người lớn:</label>
                  <input
                    type="text"
                    id="priceadults"
                    name="priceadults"
                    className="form-input"
                    placeholder="Nhập giá người lớn"
                    value={formik.values.priceadults}
                    onChange={formik.handleChange}
                  />
                  <p className="msg-err">
                    {formik.errors.priceadults &&
                      formik.touched.priceadults &&
                      formik.errors.priceadults}
                  </p>
                </div>
                <div className="formInput">
                  <label>Giá trẻ em:</label>
                  <input
                    type="text"
                    id="pricechild"
                    name="pricechild"
                    className="form-input"
                    placeholder="Nhập giá trẻ em"
                    value={formik.values.pricechild}
                    onChange={formik.handleChange}
                  />
                  <p className="msg-err">
                    {formik.errors.pricechild &&
                      formik.touched.pricechild &&
                      formik.errors.pricechild}
                  </p>
                </div>
                <div className="formInput">
                  <label>Ngày khởi hành:</label>
                  <input
                    type="date"
                    id="datestart"
                    name="datestart"
                    className="form-input"
                    placeholder="Chọn ngày khởi hành"
                    value={formik.values.datestart}
                    onChange={formik.handleChange}
                  />
                  <p className="msg-err">
                    {formik.errors.datestart &&
                      formik.touched.datestart &&
                      formik.errors.datestart}
                  </p>
                </div>
                <div className="formInput">
                  <label>Ngày kết thúc:</label>
                  <input
                    type="date"
                    id="dateend"
                    name="dateend"
                    className="form-input"
                    placeholder="Chọn ngày kết thúc"
                    value={formik.values.dateend}
                    onChange={formik.handleChange}
                  />
                  <p className="msg-err">
                    {formik.errors.dateend &&
                      formik.touched.dateend &&
                      formik.errors.dateend}
                  </p>
                </div>
              </div>
              <div className="formInput">
                <label>Số lượng :</label>
                <input
                  type="number"
                  id="numberseats"
                  name="numberseats"
                  className="form-input"
                  placeholder="Nhập số lượng"
                  value={formik.values.numberseats}
                  style={{ width: 529 }}
                  onChange={formik.handleChange}
                />
                <p className="msg-err">{formik.errors.numberseats && formik.touched.numberseats && formik.errors.numberseats}</p>
              </div>
              <div className="formInput">
                <label>Danh Mục :</label>
                <select
                  name="category"
                  id="category"
                  className="form-input"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  style={{ width: 550 }}
                >
                  <option hidden>Chọn danh mục</option>
                  <option value="Tour Trong Nước">Tour Trong Nước</option>
                  <option value="Tour Ngoài Nước">Tour Ngoài Nước</option>
                </select>
                <p className="msg-err">{formik.errors.category && formik.touched.category && formik.errors.category}</p>
              </div>
              <div className="formInput" style={{ width: 550 }}>
                <label>Mô Tả :</label>
                <CKEditor
                  editor={Editor}
                  name="description"
                  id="description"
                  data={formik.values.description}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    formik.setFieldValue('description',data)
                    console.log(data);
                  }}
    
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
                <p className="msg-err">{formik.errors.description && formik.touched.description && formik.errors.description}</p>
              </div>
            </div>
            <div className="right">
              <div className="formInput">
                <label htmlFor="image">
                  Ảnh tiêu đề:{" "}
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => {
                    setFile(URL.createObjectURL(e.target.files[0]));
                    formik.setFieldValue("image", e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                />
                <p className="msg-err">{formik.errors.image && formik.touched.image && formik.errors.image}</p>
              </div>
              <img
                src={
                  file
                    ? file
                    : `http://localhost:3001/${location.state.image}` 
                }
                alt=""
              />
              <label htmlFor="" style={{ display: "block", marginTop: 20 }}>
                Ảnh Slide:{" "}
              </label>
              <div className="update-slide-image">
                {previewSlideImage.map((item, index) => {
                  return (
                    <InputSlideImage
                      item={item}
                      index={index}
                      handleDeleteImageSlide={handleDeleteImageSlide}
                      handleSlideImage={handleSlideImage}
                    ></InputSlideImage>
                  );
                })}
              </div>
              <button className="btn-update-tour" type="submit">Xác Nhận</button>
            </div>
          </form>
        </div>
      </div>
      <Snackbar open={openAddSnackbar} autoHideDuration={1500} >
      <Alert variant="filled" severity="success">Thêm Tour mới thành công</Alert>
      </Snackbar>
    </div>
  );
}

export default UpdateTour;
