import "./newUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Link, useNavigate } from "react-router-dom";

const NewUser = () => {
  const [file, setFile] = useState("");
  const [openAddSnackbar, setOpenAddSnackbar]= useState(false);
  const navigate = useNavigate()
  const SUPPORTED_FORMATS = [
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/png',
  ];
  const FILE_SIZE = 160 * 1024;
  const createUser = async (values)=>{
    try {
      const formData = new FormData();
      for( const name in values){
        formData.append(name, values[name])
      }
      axios.defaults.withCredentials = true;
      await axios.post('http://localhost:3001/api/users',formData)
      setOpenAddSnackbar(true)
      setTimeout(()=>{navigate(-1)},1000)
      
     
    } catch (error) {
      console.log(error)
    }
  }
  const formik = useFormik({
    initialValues: {
      username: "",
      birthyear: "",
      phonenumber: "",
      age: "",
      email: "",
      gender: "",
      password: "",
      avatar: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Nhập tên người dùng"),
      birthyear: Yup.string().required("Nhập ngày sinh "),
      phonenumber: Yup.number()
        .typeError("SDT phải là giá trị số")
        .required("Nhập vào SDT"),
      age: Yup.number()
        .typeError("Tuổi phải là kiểu số")
        .required("Nhập vào tuổi"),
      email: Yup.string()
        .email("Địa chỉ email không hợp lệ")
        .required("Nhập vào email"),
      gender: Yup.string().required("Chọn giới tính"),
      password: Yup.string()
        .min(5, "Mật khẩu phải nhiều hơn 5 kí tự")
        .required("Nhập vào mật khẩu"),
      avatar: Yup.mixed()
      .required('Nhập vào hình ảnh')
      .test(
        'fileSize',
        'file quá lớn',
        (value) => value && value.size <= FILE_SIZE,
      )
      .test(
        'fileformat',
        'file không được hỗ trợ',
        (value) => value && SUPPORTED_FORMATS.includes(value.type),
      ),
    }),
    onSubmit: (values) =>{
      console.log(values)
      createUser(values)
    }
  });
  return (
    <div className="newUser">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thêm mới người dùng</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? file
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={formik.handleSubmit}>
              <div className="formInput" >
                <label htmlFor="avatar">
                  Avatar: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="avatar"
                  onChange={(e) => {
                    setFile(URL.createObjectURL(e.target.files[0]));
                    formik.setFieldValue("avatar", e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                />
                  <p className="msg-err">{formik.errors.avatar && formik.touched.avatar && formik.errors.avatar}</p>
              </div>
              <div className="formInput">
                <label>Tên người dùng:</label>
                <input
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  type="text"
                  id="username"
                  name="username"
                  className="form-input"
                  placeholder="Nhập tên người dùng"
                />
                <p className="msg-err">{formik.errors.username && formik.touched.username && formik.errors.username}</p>
              </div>
              <div className="formInput">
                <label>Ngày sinh:</label>
                <input
                  value={formik.values.birthyear}
                  onChange={formik.handleChange}
                  type="text"
                  id="birthyear"
                  name="birthyear"
                  className="form-input"
                  placeholder="Nhập ngày sinh"
                />
                <p className="msg-err">{formik.errors.birthyear && formik.touched.birthyear && formik.errors.birthyear}</p>
              </div>
              <div className="formInput">
                <label>Số Điện Thoại:</label>
                <input
                  value={formik.values.phonenumber}
                  onChange={formik.handleChange}
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                  className="form-input"
                  placeholder="Nhập số điện thoại"
                />
                <p className="msg-err">{formik.errors.phonenumber && formik.touched.phonenumber && formik.errors.phonenumber}</p>
              </div>
              <div className="formInput">
                <label>Tuổi:</label>
                <input
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  type="text"
                  id="age"
                  name="age"
                  className="form-input"
                  placeholder="Nhập tuổi người dùng"
                />
                <p className="msg-err">{formik.errors.age && formik.touched.age && formik.errors.age}</p>
              </div>
              <div className="formInput">
                <label>Email:</label>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  type="text"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="Nhập email người dùng"
                />
                <p className="msg-err">{formik.errors.email && formik.touched.email && formik.errors.email}</p>
              </div>
              <div className="formInput">
                <label>Giới tính:</label>
                <select
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  className="form-input"
                  name="gender"
                  id="gender"
                  style={{ width: 294 }}
                >
                  <option hidden>Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
                <p className="msg-err">{formik.errors.gender && formik.touched.gender && formik.errors.gender}</p>
              </div>
              <div className="formInput">
                <label>Password:</label>
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="Nhập mật khẩu "
                />
                <p className="msg-err">{formik.errors.password && formik.touched.password && formik.errors.password}</p>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
      <Snackbar open={openAddSnackbar} autoHideDuration={1500} >
      <Alert variant="filled" severity="success">Thêm người dùng thành công</Alert>
      </Snackbar>
    
    </div>
  );
};

export default NewUser;
