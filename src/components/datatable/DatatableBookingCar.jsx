import "./datatable.scss";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { booktourColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import BookTours from "../booktours/BookTours";

const DatatableBookingCar = () => {
  const [dataTours, setDataTours] = useState([]);
  const [titleDelete, setTitleDelete] = useState();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const getDataTours = async () => {
    try {
      axios.defaults.withCredentials = true;
      const listData = await axios.get("http://localhost:3001/api/bookcars");
      listData.data.map((item) => {
        return (item["id"] = item._id);
      });
      console.log(listData.data);
      setDataTours(listData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataTours();
  }, []);
  const updateStatus = async (data, e) => {
    console.log(data);
    console.log(e.target.value);
    if (e.target.value === "delete") {
      setOpen(!open);
      setTitleDelete(data);
    } else {
      axios.defaults.withCredentials = true;
      await axios.put(`http://localhost:3001/api/bookcars/${data._id}`, {
        status: e.target.value,
      });
      getDataTours();
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      await axios.delete(`http://localhost:3001/api/tours/${id}`);
      setDataTours(dataTours.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="editButton"
              onClick={() =>
                navigate(`updatetour/${params.row.id}`, { state: params.row })
              }
            >
              Edit
            </div>
            <div
              className="deleteButton"
              onClick={() => {
                setTitleDelete({ ...params.row });
                handleClickOpen();
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">Quản Lý Đặt Xe</div>
      <table>
        <thead>
          <tr className="table-header">
            <th>Tên Xe</th>
            <th style={{ width: 220 }}>Thông Tin Khách Hàng</th>
            <th style={{ width: 220 }}>Dữ Liệu Thuê</th>
            <th>Trạng Thái </th>
            <th style={{ width: 80 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataTours.length === 0 ? (
            <tr>
              <td style={{ padding: 10, fontWeight: "bold", color: "red" }}>
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            dataTours.map((item, index) => {
              return (
                <BookTours
                  key={index}
                  dataBookCar={item}
                  onUpdate={updateStatus}
                ></BookTours>
              );
            })
          )}
        </tbody>
      </table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Bạn có chăc muốn xoá đơn đặt này ?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button
            onClick={async () => {
              axios.defaults.withCredentials = true;
              await axios.delete(
                `http://localhost:3001/api/booktours/${titleDelete._id}`
              );
              setDataTours(dataTours.filter((item) => item._id !== titleDelete._id));
              handleClose();
            }}
            autoFocus
          >
            Đồng Ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DatatableBookingCar;
