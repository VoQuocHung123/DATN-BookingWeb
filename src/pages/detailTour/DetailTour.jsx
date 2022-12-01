import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { Carousel } from "antd";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import { useLocation, useNavigate } from "react-router-dom";
import "./DetailTour.css";
import BasicTabs from "../../components/tabPanel/TabPanel";
import { useState, React, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function DetailTour() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [totalPriceAdult, setTotalPriceAdult] = useState(0);
  const [totalPriceChild, setTotalPriceChild] = useState(0);
  const [dataBookTour, setDataBookTour] = useState({
    adults: 0,
    children: 0,
    totalprice: 0,
  });
  const [error, setError] = useState("");
  const [openAddSnackbar, setOpenAddSnackbar] = useState(false);
  const setOpen = () => {
    if (user) {
      setOpenModal(!openModal);
    } else {
      navigate("/login");
    }
  };
  const handleClose = () => setOpenModal(false);
  const handleCloseAlert = () => {
    setOpenAddSnackbar(false);
  };
  const contentStyle = {
    margin: 0,
    height: "360px",
    width: "800px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    objectFit: "contain",
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
  };

  const onChange = (currentSlide) => {
    // console.log(currentSlide);
  };
  const handleChangePriceAdult = (e) => {
    console.log(e.target.value);
    let total = Number(e.target.value) * Number(location.state.priceadults);
    setTotalPriceAdult(total);
    setDataBookTour({ ...dataBookTour, adults: e.target.value });
  };
  const handleChangePriceChild = (e) => {
    let total = Number(e.target.value) * Number(location.state.pricechild);
    setTotalPriceChild(total);
    setDataBookTour({ ...dataBookTour, children: e.target.value });
  };
  const handleCancelForm = () => {
    setTotalPriceAdult(0);
    setTotalPriceChild(0);
    setError("");
    setOpenModal(false);
  };
  const handleSubmitForm = async () => {
    try {
      if (location.state.numberseats === 0) {
        return setError("Tour này đã đủ số lượng người tham gia");
      }
      if (totalPriceAdult + totalPriceChild <= 0) {
        return setError("Số lượng người tham gia phải lớn hơn 1");
      }
      console.log(dataBookTour);
      if (
        Number(dataBookTour.adults) + Number(dataBookTour.children) >
        location.state.numberseats
      ) {
        return setError("Số lượng người tham gia vượt quá chỗ trống");
      }
      const objData = {
        ...dataBookTour,
        totalprice: totalPriceAdult + totalPriceChild,
      };
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `http://localhost:3001/api/booktours/${location.state._id}`,
        objData
      );
      console.log(res);
      setOpenAddSnackbar(true);
      handleCancelForm();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="container-detail">
        <div className="page-top">
          <div className="slide-image-page">
            <Carousel
              afterChange={onChange}
              style={{ width: 800 }}
              autoplay={true}
            >
              <div>
                <img
                  style={contentStyle}
                  src={`http://localhost:3001/${location.state.image}`}
                ></img>
              </div>
              {location.state.slideimage.map((item) => {
                if (item !== "") {
                  return (
                    <div>
                      <img
                        style={contentStyle}
                        src={`http://localhost:3001/${item}`}
                      ></img>
                    </div>
                  );
                }
              })}
            </Carousel>
          </div>
          <div className="rigth-page">
            <div className="right-content">
              <ul className="list-content">
                <li>Loại Tour: {location.state.category} </li>
                <li>
                  Ngày Khởi Hành:{" "}
                  {new Date(location.state.datestart)
                    .toLocaleDateString("zh-Hans-CN")
                    .replaceAll("/", "-")}
                </li>
                <li>
                  Ngày Kết Thúc:{" "}
                  {new Date(location.state.dateend)
                    .toLocaleDateString("zh-Hans-CN")
                    .replaceAll("/", "-")}
                </li>
                <li>Thời Gian: {location.state.timetour}</li>
                <li>Giá Người Lớn: {location.state.priceadults}</li>
                <li>Giá Trẻ Em:{location.state.pricechild}</li>
                <li style={{ color: "red" }}>
                  Số Chỗ Còn Lại: {location.state.numberseats}
                </li>
              </ul>
              <button className="btn-booking" onClick={setOpen}>
                ĐẶT TOUR
              </button>
            </div>
          </div>
        </div>
        <div className="page-bottom">
          <h2 className="title-detail">{location.state.title}</h2>
          <div className="tab-page">
            <BasicTabs data={location.state} />
          </div>
        </div>
      </div>
      {openModal && (
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="header-form">
              <label>Form Đặt Tour</label>
            </div>
            <div className="body-form">
              <h3 className="title-info-form">Thông tin người đặt</h3>
              <div className="box-content-form">
                <ul className="list-info-form">
                  <li>Tên: {user.username}</li>
                  <li>Email: {user.email}</li>
                  <li>Tuổi: {user.age}</li>
                  <li>Số Điện Thoại: {user.phonenumber}</li>
                  <li>Giới Tính: {user.gender === "male" ? "Nam" : "Nữ"}</li>
                </ul>
                <Avatar
                  alt="Remy Sharp"
                  src={`http://localhost:3001/${user.avatar}`}
                  sx={{ width: 80, height: 80 }}
                />
              </div>
              <h3 className="title-info-form">Thông tin đơn đặt</h3>
              <div className="date-start">
                Ngày đi:
                <input
                  className="input-date-start"
                  type="date"
                  value={new Date(location.state.datestart)
                    .toLocaleDateString("zh-Hans-CN")
                    .replaceAll("/", "-")}
                  disabled
                ></input>{" "}
              </div>
              <span className="date-start">
                Số người lớn:{" "}
                <input
                  className="input-adult"
                  onChange={handleChangePriceAdult}
                  type="number"
                />
              </span>
              <span className="date-start">
                Số trẻ em:{" "}
                <input
                  className="input-child"
                  onChange={handleChangePriceChild}
                  type="number"
                />
              </span>
              <h3 className="title-info-form">
                Thành tiền:{" "}
                <strong className="total-price">
                  {totalPriceAdult + totalPriceChild} VNĐ
                </strong>{" "}
              </h3>
              <h5 className="msg-err-form">{error && error}</h5>
            </div>
            <div className="box-btn-event">
              <button className="btn-cancel-form" onClick={handleCancelForm}>
                Huỷ bỏ
              </button>
              <button className="btn-accept-form" onClick={handleSubmitForm}>
                Đồng Ý
              </button>
            </div>
          </Box>
        </Modal>
      )}
      <Snackbar
        open={openAddSnackbar}
        onClose={handleCloseAlert}
        autoHideDuration={1500}
      >
        <Alert variant="filled" severity="success" onClose={handleCloseAlert}>
          Đặt Tour Thành Công
        </Alert>
      </Snackbar>
    </>
  );
}
