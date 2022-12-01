import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios";

const List = ({ idUser }) => {
  const [dataBooking, setDataBooking] = useState([]);
  useEffect(() => {
    const getDataBooking = async () => {
      try {
        axios.defaults.withCredentials = true;
        const dataBk = await axios.get(
          `http://localhost:3001/api/booktours/${idUser}`
        );
        console.log(dataBk.data);
        setDataBooking(dataBk.data);
      } catch (error) {}
    };
    getDataBooking();
  }, []);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> ID</TableCell>
            <TableCell className="tableCell">Tiêu Đề Tour </TableCell>
            <TableCell className="tableCell">Thông tin Khách Hàng</TableCell>
            <TableCell className="tableCell">Dữ Liệu Tour</TableCell>
            <TableCell className="tableCell">Trạng Thái</TableCell>
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
                <TableCell className="tableCell">{row._id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">{row.tourid?.title}</div>
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
                      <strong>Ngày bắt đầu:</strong>
                      {new Date(row.tourid?.datestart)
                        .toLocaleDateString("zh-Hans-CN")
                        .replaceAll("/", "-")}
                    </li>
                    <li>
                      <strong>Số người lớn:</strong>
                      {row.adults}
                    </li>
                    <li>
                      <strong>Số trẻ em:</strong>
                      {row.children}
                    </li>
                  </ul>
                </TableCell>
                <TableCell className="tableCell">
                    <span className={`status ${row.status}`}>{row.status==='pending' ? 'Chờ xử lý': row.status==='processed' ? 'Đã xác nhận' : row.status==='canceled' && 'Đã huỷ'}</span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
