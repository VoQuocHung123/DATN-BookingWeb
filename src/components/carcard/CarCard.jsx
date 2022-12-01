import "./CarCard.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import { useState, React, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";

const CarCard = ({ dataCar }) => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate= useNavigate();
  const [dataBookCar, setDataBookCar] = useState({datetakecar: new Date(), datepaycar: new Date(), totalprice: 0})
  const [error, setError]= useState('')
  const [dateTakeCar,setDateTakeCar] = useState(0);
  const [datePayCar,setDatePayCar]= useState(0);
  const [totalPrice,setTotalPrice] = useState(0);
  const [openAddSnackbar, setOpenAddSnackbar]= useState(false);
  
  const setOpen = () => {
    if(user){
      setOpenModal(!openModal);
    }else{
      navigate('/login')
    }
  };
  const handleClose = () => setOpenModal(false);
  const handleCloseAlert = () =>{
    setOpenAddSnackbar(false)
  }
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
  const handleCancelForm = ()=>{
    setTotalPrice(0)
    setError('')
    setDatePayCar(0)
    setDateTakeCar(0)
    setOpenModal(false)
  }
  const handleSubmitForm = async ()=>{
    console.log(dateTakeCar)
    try {
      if(dateTakeCar + datePayCar === 0){
        return setError("Vui Lòng Chọn Ngày Nhận Và Ngày Trả")
      }
      const objData = {...dataBookCar, totalprice: totalPrice}
      axios.defaults.withCredentials = true;
      const res = await axios.post(`http://localhost:3001/api/bookcars/${dataCar._id}`,objData)
      console.log(res)
      setOpenAddSnackbar(true)
      handleCancelForm()
    } catch (error) {
      console.log(error)
    }
  }
  const handleChangeDateTake = async (e)=>{
    let stringDate = e.target.value
    setDateTakeCar(Number(stringDate.slice(stringDate.length-2,stringDate.length)))
    setDataBookCar({...dataBookCar, datetakecar: e.target.value})
  }
  const handleChangeDatePay = async (e)=>{
    let stringDate = e.target.value
    const a = Number(stringDate.slice(stringDate.length-2,stringDate.length))
    setDatePayCar(a)
    setTotalPrice((a-dateTakeCar)*dataCar.price)
    setDataBookCar({...dataBookCar, datepaycar: e.target.value})
  }
  return (
    <>
      <div className="fpItem">
        <img
          src={`http://localhost:3001/${dataCar?.image}`}
          alt=""
          className="fpImg"
        />
        <span className="fpName">{dataCar?.name}</span>
        <span className="fpCity">{dataCar?.category}</span>
        <span className="fpPrice">{dataCar?.price} VNĐ</span>
        <div className="fpRating">
          <button onClick={setOpen}>Thuê Ngay</button>
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
              <span className="datetake-label">
                Ngày Nhận Xe: <input className="input-datetake"  onChange={handleChangeDateTake} type="date" /> 
              </span>
              <span className="datepay-label">
                Ngày Trả Xe: <input className="input-datepay" onChange={handleChangeDatePay} type="date" /> 
              </span>
              <h3 className="title-info-form">Thành tiền: <strong className="total-price">{totalPrice} VNĐ</strong> </h3>
              <h5 className="msg-err-form">{error && error}</h5>
            </div>
            <div className="box-btn-event">
              <button className="btn-cancel-form" onClick={handleCancelForm}>Huỷ bỏ</button>
              <button className="btn-accept-form" onClick={handleSubmitForm}>Đồng Ý</button>
            </div>
          </Box>
        </Modal>
      )}
         <Snackbar open={openAddSnackbar} onClose={handleCloseAlert} autoHideDuration={1500} >
      <Alert variant="filled" severity="success" onClose={handleCloseAlert}>Đặt Xe Thành Công</Alert>
      </Snackbar>
    </>
  );
};

export default CarCard;
