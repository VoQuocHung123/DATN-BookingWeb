import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { carColumns} from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DatatableCar = () => {
  const [dataCars, setDataCars] = useState([]);
  const [titleDelete, setTitleDelete]= useState();
  const [open, setOpen] = useState(false);
  const navigate= useNavigate()
  const localizedTextsMap = {
    columnMenuUnsort: "Loại bỏ sắp xếp",
    columnMenuSortAsc: "Sắp xếp nhỏ dần",
    columnMenuSortDesc: "Sắp xếp tăng dần",
    columnMenuFilter: "Tìm kiếm",
    columnMenuHideColumn: "Ẩn Cột",
    columnMenuShowColumns: "Hiện cột"
  };
  const getDataCar = async () =>{
    try {
      axios.defaults.withCredentials = true;
      const listData = await axios.get('http://localhost:3001/api/cars')
      listData.data.cars.map((item)=>{
        return item['id']= item._id
      })
      console.log(listData.data.cars)
      setDataCars(listData.data.cars)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
   getDataCar()
  },[])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async (id) => {
      try {
        axios.defaults.withCredentials = true;
        await axios.delete(`http://localhost:3001/api/cars/${id}`)
        setDataCars(dataCars.filter((item) => item.id !== id));
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
              <div className="editButton" onClick={()=>navigate(`updatecar/${params.row.id}`,{ state: params.row })} >Edit</div>  
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
        Danh Sách Xe Cho Thuê
        <Link to="newcar" className="link">
          Thêm mới 
        </Link>
      </div>
      <DataGrid
        sx={{
          '& .super-app-theme--header': {
            backgroundColor: '#67cc62',
            color:'white',
          },
        }}
        className="datagrid"
        rows={dataCars}
        columns={carColumns.concat(actionColumn)}
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
          {`Xe có tên  ${titleDelete ? titleDelete.name : ""} sẽ bị xoá  ?`}
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
    </div>
  );
};

export default DatatableCar;
