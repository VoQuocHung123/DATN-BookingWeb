import React from "react";
import "./booktours.scss";

export default function BookTours({ dataBookCar, onUpdate, dataBookTour }) {
  return (
    <>
      <tr className="table-item">
        {dataBookTour && <td>{dataBookTour.tourid?.title}</td>}
        {dataBookCar && <td>{dataBookCar.carid?.name}</td>}
        <td className="infor-user">
          {dataBookTour && (
            <ul>
              <li>
                <strong>Tên:</strong>
                {dataBookTour.userid?.username}
              </li>
              <li>
                <strong>Số Điện Thoại:</strong>
                {dataBookTour.userid?.phonenumber}
              </li>
              <li>
                <strong>Email:</strong>
                {dataBookTour.userid?.email}
              </li>
            </ul>
          )}
          {dataBookCar && (
            <ul>
              <li>
                <strong>Tên:</strong>
                {dataBookCar.userid?.username}
              </li>
              <li>
                <strong>Số Điện Thoại:</strong>
                {dataBookCar.userid?.phonenumber}
              </li>
              <li>
                <strong>Email:</strong>
                {dataBookCar.userid?.email}
              </li>
            </ul>
          )}
        </td>
        <td className="infor-tour">
          {dataBookTour && (
            <ul>
              <li>
                <strong>Ngày bắt đầu:</strong>{" "}
                {new Date(dataBookTour.tourid?.datestart)
                  .toLocaleDateString("zh-Hans-CN")
                  .replaceAll("/", "-")}
              </li>
              <li>
                <strong>Số người lớn:</strong> {dataBookTour.userid.adults}
              </li>
              <li>
                <strong>Số trẻ em:</strong>
                {dataBookTour.userid.children}
              </li>
              <li>
                <strong>Tổng tiền:</strong>
                {dataBookTour.userid.totalprice}
              </li>
            </ul>
          )}
          {dataBookCar && (
            <ul>
              <li>
                <strong>Ngày nhận xe :</strong>{" "}
                {new Date(dataBookCar?.datetakecar)
                  .toLocaleDateString("zh-Hans-CN")
                  .replaceAll("/", "-")}
              </li>
              <li>
                <strong>Ngày trả xe :</strong>
                {new Date(dataBookCar?.datepaycar)
                  .toLocaleDateString("zh-Hans-CN")
                  .replaceAll("/", "-")}
              </li>
              <li>
                <strong>Tổng tiền:</strong>
                {dataBookCar?.totalprice}
              </li>
            </ul>
          )}
        </td>
        <td>
          {dataBookTour && (
            <span className={`status ${dataBookTour?.status}`}>
              {dataBookTour?.status === "pending"
                ? "Chờ xử lý"
                : dataBookTour?.status === "processed"
                ? "Đã xác nhận"
                : dataBookTour?.status === "canceled" && "Đã huỷ"}
            </span>
          )}
          {dataBookCar && (
            <span className={`status ${dataBookCar?.status}`}>
              {dataBookCar?.status === "pending"
                ? "Chờ xử lý"
                : dataBookCar?.status === "processed"
                ? "Đã xác nhận"
                : dataBookCar?.status === "canceled" && "Đã huỷ"}
            </span>
          )}
        </td>
        <td>
          {dataBookCar && (
            <select
              onChange={(e) => onUpdate(dataBookCar, e)}
              style={{ width: 100 }}
            >
              <option hidden>Action</option>
              <option value={"pending"}>Chờ xử lý</option>
              <option value={"processed"}>Đã xác nhận</option>
              <option value={"canceled"}>Đã huỷ</option>
              <option value={"delete"}>Xoá</option>
            </select>
          )}
          {dataBookTour && (
            <select
              onChange={(e) => onUpdate(dataBookTour, e)}
              style={{ width: 100 }}
            >
              <option hidden>Action</option>
              <option value={"pending"}>Chờ xử lý</option>
              <option value={"processed"}>Đã xác nhận</option>
              <option value={"canceled"}>Đã huỷ</option>
              <option value={"delete"}>Xoá</option>
            </select>
          )}
        </td>
      </tr>
    </>
  );
}
