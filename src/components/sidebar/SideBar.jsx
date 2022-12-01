import React from 'react'
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="list-action-manage">
    <Link to="/manageaccount">
    <div className="left-manage-item">Thông tin tài khoản</div>
    </Link>
    <Link to="/bookedtour">
    <div className="left-manage-item">Đơn đặt tour</div>
    </Link>
    <Link to="/bookedcar">
    <div className="left-manage-item">Đơn đặt xe</div>
    </Link>
    <div className="left-manage-item">Đổi mật khẩu</div>
  </div>
  )
}
