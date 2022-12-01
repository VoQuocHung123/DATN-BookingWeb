import React from "react";
import Header from "../../../components/header/Header";
import Navbar from "../../../components/navbar/Navbar";
import Avatar from "@mui/material/Avatar";
import "../ManageAccount.css";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";
import ListBooked from "../../../components/listbooked/ListBooked";
import SideBar from "../../../components/sidebar/SideBar";

export default function TourAccount() {
  const { user } = useContext(AuthContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dataUser, setDataUser] = useState(user);
  console.log(dataUser);

  const handleCloseAlert = () => {
    setOpenSnackbar(false);
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
  useEffect(() => {
    getUserbyId();
  }, [openSnackbar]);

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
            <ListBooked idUser={user._id} listTour={true}></ListBooked>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        onClose={handleCloseAlert}
        autoHideDuration={1500}
      >
        <Alert variant="filled" onClose={handleCloseAlert} severity="success">
          Chỉnh sửa người dùng thành công
        </Alert>
      </Snackbar>
    </>
  );
}
