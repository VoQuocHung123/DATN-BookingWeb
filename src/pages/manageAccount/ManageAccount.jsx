import React from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Avatar from "@mui/material/Avatar";
import "./ManageAccount.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState , useEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";
import SideBar from "../../components/sidebar/SideBar";

export default function ManageAccount() {
  
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dataUser, setDataUser] = useState(user);
  console.log(dataUser)
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const FILE_SIZE = 160 * 1024;
  const handleCloseAlert = () =>{
    setOpenSnackbar(false)
  }
  const updateUser = async (values) => {
    try {
      const formData = new FormData();
      for (const name in values) {
        formData.append(name, values[name]);
      }
      axios.defaults.withCredentials = true;
      await axios.put(`http://localhost:3001/api/users/${user._id}`, formData);
      setOpenSnackbar(true);
      getUserbyId()
    } catch (error) {
      console.log(error);
    }
  };
  const getUserbyId = async () => {
    try {
      axios.defaults.withCredentials = true;
      const dataUser = await axios.get(
        `http://localhost:3001/api/users/${user._id}`
      );
      setDataUser(dataUser.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getUserbyId()
  },[])
  const formik = useFormik({
    initialValues: {
      username: dataUser.username ? dataUser.username : "",
      birthyear: dataUser.birthyear ? dataUser.birthyear : "",
      phonenumber: dataUser.phonenumber ? dataUser.phonenumber : "",
      age: dataUser.age ? dataUser.age : "",
      email: dataUser.email ? dataUser.email : "",
      gender: dataUser.gender ? dataUser.gender : "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Nh???p t??n ng?????i d??ng"),
      birthyear: Yup.string().required("Nh???p ng??y sinh "),
      phonenumber: Yup.number()
        .typeError("SDT ph???i l?? gi?? tr??? s???")
        .required("Nh???p v??o SDT"),
      age: Yup.number()
        .typeError("Tu???i ph???i l?? ki???u s???")
        .required("Nh???p v??o tu???i"),
      email: Yup.string()
        .email("?????a ch??? email kh??ng h???p l???")
        .required("Nh???p v??o email"),
      gender: Yup.string().required("Ch???n gi???i t??nh"),
    }),
    onSubmit: (values) => {
      updateUser(values);
    },
  });
  return (
    <>
   
      <Navbar />
      <Header type="list" />
      <div className="container-account">
        <div className="left-manage">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="user"
              sx={{ width: 56, height: 56 }}
              src={`http://localhost:3001/${dataUser.avatar}`}
            />
            <strong className="username-account">{dataUser.username}</strong>
          </div>
          <SideBar/>
        </div>
        <div className="right-manage">
          <div className="left-form">
            <img
              src={file ? file : `http://localhost:3001/${dataUser.avatar}`}
              alt=""
            />
          </div>
          <div className="right-form">
            <form onSubmit={formik.handleSubmit}>
              <div className="formInput">
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
                <p className="msg-err">
                  {formik.errors.avatar &&
                    formik.touched.avatar &&
                    formik.errors.avatar}
                </p>
              </div>
              <div className="formInput">
                <label>T??n ng?????i d??ng:</label>
                <input
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  type="text"
                  id="username"
                  name="username"
                  className="form-input"
                  placeholder="Nh???p t??n ng?????i d??ng"
                />
                <p className="msg-err">
                  {formik.errors.username &&
                    formik.touched.username &&
                    formik.errors.username}
                </p>
              </div>
              <div className="formInput">
                <label>Ng??y sinh:</label>
                <input
                  value={formik.values.birthyear}
                  onChange={formik.handleChange}
                  type="text"
                  id="birthyear"
                  name="birthyear"
                  className="form-input"
                  placeholder="Nh???p ng??y sinh"
                />
                <p className="msg-err">
                  {formik.errors.birthyear &&
                    formik.touched.birthyear &&
                    formik.errors.birthyear}
                </p>
              </div>
              <div className="formInput">
                <label>S??? ??i???n Tho???i:</label>
                <input
                  value={formik.values.phonenumber}
                  onChange={formik.handleChange}
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                  className="form-input"
                  placeholder="Nh???p s??? ??i???n tho???i"
                />
                <p className="msg-err">
                  {formik.errors.phonenumber &&
                    formik.touched.phonenumber &&
                    formik.errors.phonenumber}
                </p>
              </div>
              <div className="formInput">
                <label>Tu???i:</label>
                <input
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  type="text"
                  id="age"
                  name="age"
                  className="form-input"
                  placeholder="Nh???p tu???i ng?????i d??ng"
                />
                <p className="msg-err">
                  {formik.errors.age && formik.touched.age && formik.errors.age}
                </p>
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
                  placeholder="Nh???p email ng?????i d??ng"
                />
                <p className="msg-err">
                  {formik.errors.email &&
                    formik.touched.email &&
                    formik.errors.email}
                </p>
              </div>
              <div className="formInput">
                <label>Gi???i t??nh:</label>
                <select
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  className="form-input"
                  name="gender"
                  id="gender"
                  style={{ width: 317 }}
                >
                  <option hidden>Ch???n gi???i t??nh</option>
                  <option value="male">Nam</option>
                  <option value="female">N???</option>
                </select>
                <p className="msg-err">
                  {formik.errors.gender &&
                    formik.touched.gender &&
                    formik.errors.gender}
                </p>
              </div>
              <button className="btn-save-info" type="submit">
                X??c Nh???n
              </button>
            </form>
          </div>
        </div>
      </div>
      <Snackbar open={openSnackbar} onClose={handleCloseAlert} autoHideDuration={1500}>
        <Alert variant="filled" onClose={handleCloseAlert} severity="success">
          Ch???nh s???a ng?????i d??ng th??nh c??ng
        </Alert>
      </Snackbar>
    </>
  );
}
