import { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import "./navbar.css";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddSnackbar, setOpenAddSnackbar] = useState(false);
  const handleCloseAlert = () => {
    setOpenAddSnackbar(false);
  };
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    try {
      axios.defaults.withCredentials = true;
      await axios.post("http://localhost:3001/api/auth/logout");
      setOpenAddSnackbar(true)
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
    setAnchorEl(null);
  };
  return (
    <>
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">HK BOOKING</span>
        {!user ? (
          <div className="navItems">
            <Link to="/register">
            <button className="navButton">Đăng Ký</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Đăng Nhập</button>
            </Link>
          </div>
        ) : (
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <span style={{ fontSize: 13 }}> Xin chào : {user.username} </span>

              <Avatar alt="user" src={`http://localhost:3001/${user.avatar}`} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link className="nav-link" to="/manageaccount">
                <MenuItem onClick={handleClose}>Thông tin tài khoản</MenuItem>
              </Link>
              <Link  className="nav-link" to="/bookedtour">
                <MenuItem onClick={handleClose}>Tour đã đặt</MenuItem>
              </Link>
              <Link  className="nav-link" to="/bookedcar">
              <MenuItem onClick={handleClose}>Xe đã đặt</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </div>
    <Snackbar
        anchorOrigin={{vertical: 'bot',horizontal: 'left'}}
        open={openAddSnackbar}
        onClose={handleCloseAlert}
        autoHideDuration={1500}
      >
        <Alert variant="filled" severity="success" onClose={handleCloseAlert}>
              Đăng Xuất Thành Công
        </Alert>
      </Snackbar>

    </>
  );
};

export default Navbar;
