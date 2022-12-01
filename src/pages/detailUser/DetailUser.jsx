import "./style.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import List from "../../components/table/Table";

const DetailUser = () => {
  const location = useLocation()
  console.log(location.state)
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Thông tin tài khoản</h1>
            <div className="item">
              <img
                src={`http://localhost:3001/${location.state.avatar}` || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{location.state.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{location.state.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{location.state.phonenumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ngày Sinh:</span>
                  <span className="itemValue">
                  {location.state.birthyear}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Age:</span>
                  <span className="itemValue">
                  {location.state.age}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Giới Tính:</span>
                  <span className="itemValue">{location.state.gender}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Danh Sách Tour đã đặt</h1>
        <List idUser={location.state.id}></List>

        </div>
      </div>
    </div>
  );
};

export default DetailUser;
