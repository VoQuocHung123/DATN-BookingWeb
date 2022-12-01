import "./ListBooked.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell,{ tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';

const ListBooked = ({ idUser, listTour, listCar }) => {
  const [dataBooking, setDataBooking] = useState([]);
  const getDataBooking = async () => {
    try {
      axios.defaults.withCredentials = true;
      if (listTour === true) {
        const dataBk = await axios.get(
          `http://localhost:3001/api/booktours/${idUser}`
        );
        console.log(dataBk.data);
        setDataBooking(dataBk.data);
      }
      if (listCar === true) {
        const dataBk = await axios.get(
          `http://localhost:3001/api/bookcars/${idUser}`
        );
        console.log(dataBk.data);
        setDataBooking(dataBk.data);
      }
    } catch (error) {}
  };
  const handleCancelBooked = async (idbooked) => {
    try {
      axios.defaults.withCredentials = true;
      if (listTour === true) {
        await axios.put(`http://localhost:3001/api/booktours/${idbooked}`, {
          status: "canceled",
        });
      }
      if (listCar === true) {
        await axios.put(`http://localhost:3001/api/bookcars/${idbooked}`, {
          status: "canceled",
        });
      }
      getDataBooking();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataBooking();
  }, []);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#003580',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    <>
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor: '#003580' ,color: 'white !important'}}>
          <TableRow  >
            <StyledTableCell width="20%" className="tableCell">
              {listTour === true ? `Tiêu Đề Tour` : `Tên Xe`}
            </StyledTableCell>
            <StyledTableCell width="25%" className="tableCell">
              Thông tin Khách Hàng
            </StyledTableCell>
            <StyledTableCell width="25%" className="tableCell">
              {listTour === true ? `Dữ Liệu Tour` : `Dữ Liệu Xe`}
            </StyledTableCell>
            <StyledTableCell width="15%" className="tableCell">
              Trạng Thái
            </StyledTableCell>
            <StyledTableCell width="10%" className="tableCell">
              Action
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataBooking.length === 0 ? (
            <tr>
              <td style={{ padding: 10, fontWeight: "bold", color: "red" }}>
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            dataBooking.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {listTour ? row.tourid?.title : row.carid?.name}
                  </div>
                </TableCell>
                <TableCell className="tableCell">
                  <ul>
                    <li>
                      <strong>Tên:</strong>
                      {row.userid?.username}
                    </li>
                    <li>
                      <strong>SDT:</strong>
                      {row.userid?.phonenumber}
                    </li>
                    <li>
                      <strong>Email:</strong>
                      {row.userid?.email}
                    </li>
                  </ul>
                </TableCell>
                <TableCell className="tableCell">
                  <ul>
                    <li>
                      <strong>
                        {listTour ? `Ngày bắt đầu: ` : `Ngày Nhận Xe: `}
                      </strong>
                      {listTour &&
                        new Date(row.tourid?.datestart)
                          .toLocaleDateString("zh-Hans-CN")
                          .replaceAll("/", "-")}
                      {listCar &&
                        new Date(row?.datetakecar)
                          .toLocaleDateString("zh-Hans-CN")
                          .replaceAll("/", "-")}
                    </li>

                    <li>
                      {listTour && (
                        <>
                          <strong>Số người lớn: </strong> {row.adults}
                        </>
                      )}
                    </li>
                    <li>
                      {listTour && (
                        <>
                          <strong>Số trẻ em: </strong> {row.children}
                        </>
                      )}
                      {listCar && (
                        <>
                          <strong>Ngày trả xe: </strong>{" "}
                          {new Date(row?.datepaycar)
                            .toLocaleDateString("zh-Hans-CN")
                            .replaceAll("/", "-")}
                        </>
                      )}
                    </li>
                    <li>
                      <strong>Tổng Tiền:</strong>
                      {row.totalprice}
                    </li>
                  </ul>
                </TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>
                    {row.status === "pending"
                      ? "Chờ xử lý"
                      : row.status === "processed"
                      ? "Đã xác nhận"
                      : row.status === "canceled" && "Đã huỷ"}
                  </span>
                </TableCell>
                <TableCell className="tableCell">
                  {row.status === "processed" || row.status === "canceled" ? (
                    <button
                      type="button"
                      className={`btn-click-canceledbook btn-2`}
                    >
                      Huỷ
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`btn-click-canceledbook `}
                      onClick={() => handleCancelBooked(row._id)}
                    >
                      Huỷ
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default ListBooked;
