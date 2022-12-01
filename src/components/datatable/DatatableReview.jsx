import "./datatable.scss";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Rating from "@mui/material/Rating";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from '@mui/material/FormControl';

const DatatableUser = () => {
  const [dataReview, setdataReview] = useState([]);
  const [titleDelete, setTitleDelete] = useState();
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const [openEditStatusSnackbar, setOpenEditStatusSnackbar] = useState(false);
  const [open, setOpen] = useState(false);
  const localizedTextsMap = {
    columnMenuUnsort: "Loại bỏ sắp xếp",
    columnMenuSortAsc: "Sắp xếp nhỏ dần",
    columnMenuSortDesc: "Sắp xếp tăng dần",
    columnMenuFilter: "Tìm kiếm",
    columnMenuHideColumn: "Ẩn Cột",
    columnMenuShowColumns: "Hiện cột"
  };
  const [statusReview, setStatusReview] = useState()
  const getdataReview = async () => {
    try {
      axios.defaults.withCredentials = true;
      const listData = await axios.get("http://localhost:3001/api/reviews/");
      listData.data.map((item) => {
        return (item["id"] = item._id);
      });
      console.log(listData.data);
      setdataReview(listData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdataReview();
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseAlert = () => {
    setOpenDeleteSnackbar(false);
    setOpenEditStatusSnackbar(false);
  };

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };
  function renderRating(dataReview) {
    return <Rating readOnly value={dataReview.row.rating} />;
  }
  const handleDelete = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      await axios.delete(`http://localhost:3001/api/reviews/${id}`);
      setdataReview(dataReview.filter((item) => item.id !== id));
      setOpenDeleteSnackbar(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = async (id,event) => {
    setStatusReview(event.target.value);
    console.log(id)
    try {
      axios.defaults.withCredentials = true;
      await axios.put(`http://localhost:3001/api/reviews/${id}`,{status:event.target.value})
      setOpenEditStatusSnackbar(true);
      getdataReview()
    } catch (error) {
      
    }
  };
  const reviewTourColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "tourid",
      headerName: "Tên Tour",
      width: 170,
      headerClassName: "super-app-theme--header",
      renderCell: (params)=>{
        return(
          <p>{params.row.tourid?.title}</p>
        )
      }
    },
    {
      field: "userid",
      headerName: "Tên User",
      width: 120,
      headerClassName: "super-app-theme--header",
      renderCell: (params)=>{
        return(
          <p>{params.row.userid?.username}</p>
        )
      }
    },
    {
      field: "content",
      headerName: "Nội Dung",
      width: 270,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "rating",
      headerName: "Sao Đánh Giá",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: renderRating,
      editable: true,
    },
    {
      field: "status",
      headerName: "Trạng Thái",
      width: 100,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>{
        return(
          <span className={`status ${params.row.status}`}>{params.row.status==='disable' ? 'Ẩn': params.row.status==='enable' ? 'Hiện' :''}</span>
        )
      }
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
             <FormControl sx={{ mt: 1,mb: 1, minWidth: 100 }} size="small">
              <InputLabel id="demo-select-small">status</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={params.row.status}
                label="status"
                onChange={(e)=>handleChange(params.row.id,e)}
              >
                <MenuItem value={"disable"}>Ẩn </MenuItem>
                <MenuItem value={"enable"}>Hiện</MenuItem>
              </Select>
              </FormControl>
            <div
              className="deleteButton"
              onClick={() => {
                setTitleDelete({ ...params.row });
                handleClickOpen();
              }}
              style={{width: 70, height: 30, textAlign: "center"}}
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
      <div className="datatableTitle">Danh Sách Đánh Giá</div>
      <DataGrid
        sx={{
          "& .super-app-theme--header": {
            backgroundColor: "#6439ff",
            color: "white",
          },
        }}
        className="datagrid"
        rows={dataReview}
        columns={reviewTourColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        localeText={localizedTextsMap}
        experimentalFeatures={{ newEditingApi: true }}
        // checkboxSelection
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Đánh giá này của   ${
            titleDelete ? titleDelete.username : ""
          } sẽ bị xoá  ?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button
            onClick={() => {
              handleDelete(titleDelete ? titleDelete.id : "");
              handleClose();
            }}
            autoFocus
          >
            Đồng Ý
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openDeleteSnackbar}
        onClose={handleCloseAlert}
        autoHideDuration={1500}
      >
        <Alert variant="filled" severity="success" onClose={handleCloseAlert}>
          Xoá Đánh Giá Thành Công
        </Alert>
      </Snackbar>
      <Snackbar
        open={openEditStatusSnackbar}
        onClose={handleCloseAlert}
        autoHideDuration={1500}
      >
        <Alert variant="filled" severity="success" onClose={handleCloseAlert}>
          Cập nhật trạng thái thành công
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DatatableUser;
