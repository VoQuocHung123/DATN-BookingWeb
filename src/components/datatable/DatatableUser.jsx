import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns} from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const DatatableUser = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [titleDelete, setTitleDelete]= useState();
  const [openDeleteSnackbar, setOpenDeleteSnackbar]= useState(false);
  const [open, setOpen] = useState(false);
  const navigate= useNavigate();
  const localizedTextsMap = {
    columnMenuUnsort: "Loại bỏ sắp xếp",
    columnMenuSortAsc: "Sắp xếp nhỏ dần",
    columnMenuSortDesc: "Sắp xếp tăng dần",
    columnMenuFilter: "Tìm kiếm",
    columnMenuHideColumn: "Ẩn Cột",
    columnMenuShowColumns: "Hiện cột"
  };
  const getDataUsers = async () =>{
    try {
      axios.defaults.withCredentials = true;
      const listData = await axios.get('http://localhost:3001/api/users')
      listData.data.map((item)=>{
        return item['id']= item._id
      })
      console.log(listData.data)
      setDataUsers(listData.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
   getDataUsers()
  },[])
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseAlert = () =>{
    setOpenDeleteSnackbar(false)
  }

  const handleClose = () => {
    console.log('close')
    setOpen(false);
  };
  const handleDelete = async (id) => {
      try {
        axios.defaults.withCredentials = true;
        await axios.delete(`http://localhost:3001/api/users/${id}`)
        setDataUsers(dataUsers.filter((item) => item.id !== id));
        setOpenDeleteSnackbar(true)
      } catch (error) {
        console.log(error)
      }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: 'super-app-theme--header',
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
              <div className="viewButton" onClick={()=>navigate(`detail/${params.row.id}`,{ state: params.row })} >View</div>
              <div className="editButton" onClick={()=>navigate(`updateuser/${params.row.id}`,{ state: params.row })} >Edit</div>  
            <div
              className="deleteButton"
              onClick={()=>{ 
                setTitleDelete({...params.row})
                handleClickOpen()
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
      <div className="datatableTitle">
        Danh Sách Người Dùng
        <Link to="newuser" className="link">
          Thêm mới 
        </Link>
      </div>
      <DataGrid
        sx={{
          '& .super-app-theme--header': {
            backgroundColor: '#6439ff',
            color:'white',
          },
        }}
        className="datagrid"
        rows={dataUsers}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        localeText={localizedTextsMap}
        // checkboxSelection
      />
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Tài khoản với tên  ${titleDelete ? titleDelete.username : ""} sẽ bị xoá  ?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button onClick={()=>{
            handleDelete(titleDelete?titleDelete.id : "")
            handleClose()
            }} autoFocus>
            Đồng Ý
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openDeleteSnackbar} onClose={handleCloseAlert} autoHideDuration={1500} >
      <Alert variant="filled" severity="warning" onClose={handleCloseAlert}>Xoá người dùng thành công</Alert>
      </Snackbar>
    </div>
  );
};

export default DatatableUser;
