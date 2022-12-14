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
              {listTour === true ? `Ti??u ????? Tour` : `T??n Xe`}
            </StyledTableCell>
            <StyledTableCell width="25%" className="tableCell">
              Th??ng tin Kh??ch H??ng
            </StyledTableCell>
            <StyledTableCell width="25%" className="tableCell">
              {listTour === true ? `D??? Li???u Tour` : `D??? Li???u Xe`}
            </StyledTableCell>
            <StyledTableCell width="15%" className="tableCell">
              Tr???ng Th??i
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
                Kh??ng c?? d??? li???u
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
                      <strong>T??n:</strong>
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
                        {listTour ? `Ng??y b???t ?????u: ` : `Ng??y Nh???n Xe: `}
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
                          <strong>S??? ng?????i l???n: </strong> {row.adults}
                        </>
                      )}
                    </li>
                    <li>
                      {listTour && (
                        <>
                          <strong>S??? tr??? em: </strong> {row.children}
                        </>
                      )}
                      {listCar && (
                        <>
                          <strong>Ng??y tr??? xe: </strong>{" "}
                          {new Date(row?.datepaycar)
                            .toLocaleDateString("zh-Hans-CN")
                            .replaceAll("/", "-")}
                        </>
                      )}
                    </li>
                    <li>
                      <strong>T???ng Ti???n:</strong>
                      {row.totalprice}
                    </li>
                  </ul>
                </TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>
                    {row.status === "pending"
                      ? "Ch??? x??? l??"
                      : row.status === "processed"
                      ? "???? x??c nh???n"
                      : row.status === "canceled" && "???? hu???"}
                  </span>
                </TableCell>
                <TableCell className="tableCell">
                  {row.status === "processed" || row.status === "canceled" ? (
                    <button
                      type="button"
                      className={`btn-click-canceledbook btn-2`}
                    >
                      Hu???
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`btn-click-canceledbook `}
                      onClick={() => handleCancelBooked(row._id)}
                    >
                      Hu???
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
