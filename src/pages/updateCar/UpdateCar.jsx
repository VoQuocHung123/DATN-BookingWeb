import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./updateCar.scss";
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
function UpdateCar() {
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
  const updateCar = async (values) => {
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
      await axios.put(`http://localhost:3001/api/cars/${location.state.id}`,formData)
      setOpenAddSnackbar(true)
      setTimeout(()=>{navigate(-1)},1000)
    } catch (error) {
      console.log(error)
    }
  }
  
  const formik = useFormik({
    initialValues: {
      name: location.state.name? location.state.name : "",
      category: location.state.category? location.state.category : "",
      price: location.state.price? location.state.price : "",
      soluong: location.state.soluong? location.state.soluong : "",
      description: location.state.description? location.state.description : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng không để trống "),
      category: Yup.string().required("Vui lòng không để trống"),
      price: Yup.number()
        .typeError("Giá phải là giá trị số")
        .required("Vui lòng không để trống"),
      soluong: Yup.number().typeError("Số lượng phải là số").required("Vui Lòng không để trống"),
      description: Yup.string().required("Vui lòng thêm mô tả"),
    }),
    onSubmit: (values) => {
      updateCar(values)
    },
  });

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thêm Mới Xe Cho Thuê</h1>
        </div>
        <div className="bottom">
          <form onSubmit={formik.handleSubmit}>
            <div className="left">
              <div className="formInput">
                <label>Tên Xe:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Nhập tên xe "
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <p className="msg-err">
                  {formik.errors.name &&
                    formik.touched.name &&
                    formik.errors.name}
                </p>
              </div>
              <div className="formInput">
                <label>Giá Cho Thuê Xe:</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className="form-input"
                  placeholder="Nhập giá cho thuê"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
                <p className="msg-err">
                  {formik.errors.price &&
                    formik.touched.price &&
                    formik.errors.price}
                </p>
              </div>
            
              <div className="formInput">
                <label>Số lượng :</label>
                <input
                  type="number"
                  id="soluong"
                  name="soluong"
                  className="form-input"
                  placeholder="Nhập số lượng"
                  value={formik.values.soluong}
                  style={{ width: 529 }}
                  onChange={formik.handleChange}
                />
                <p className="msg-err">{formik.errors.soluong && formik.touched.soluong && formik.errors.soluong}</p>
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
                  <option value="Xe Máy">Xe Máy</option>
                  <option value="Xe Ô Tô">Xe Ô Tô</option>
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
      <Alert variant="filled" severity="success">Thêm Xe mới thành công</Alert>
      </Snackbar>
    </div>
  );
}

export default UpdateCar;
