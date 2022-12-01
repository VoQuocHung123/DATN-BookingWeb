import {
  faBed,
  faCar,
  faCircleInfo,
  faHouse,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { useState, useContext } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate, NavLink } from "react-router-dom";

const Header = ({ type }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState();
  const [error, setError] = useState();
  const [activeNavbar, setActiveNavbar] = useState(false);
  const handleDate = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSearch = () => {
    if (title === "" && date === undefined) {
      setError("Vui lòng nhập nội dung tìm kiếm");
    } else {
      navigate("/tours", { state: { title, date } });
    }
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <NavLink
            to="/"
            className={({isActive})=> isActive ? 'active':'inactive'}
            style={{ lineHeight: "40px" }}
          >
            <div className={`headerListItem ${activeNavbar ? "active" : ""}`}>
              <FontAwesomeIcon icon={faHouse} />
              <span>Trang Chủ</span>
            </div>
          </NavLink>
          <NavLink
            to="/tours"
            className={({isActive})=> isActive ? 'active':'inactive'}
            style={{ lineHeight: "40px" }}
          >
            <div className={`headerListItem ${activeNavbar ? "active" : ""}`}>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Tours</span>
            </div>
          </NavLink>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Xe Du Lịch</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faUser} />
            <span>Liên Hệ</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCircleInfo} />
            <span>Giới Thiệu</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Tìm và đặt các trải nghiệm hấp dẫn</h1>
            <p className="headerDesc">
              Khám phá thêm về điểm đến và tận hưởng trọn vẹn chuyến đi
            </p>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Bạn muốn đi đâu  ?"
                  className="headerSearchInput"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <div className="">
                  <span className="span-title">Ngày bắt đầu</span>
                  <input
                    className="input-date"
                    type="date"
                    name="datestart"
                    id=""
                    onChange={handleDate}
                  />
                  <span className="span-title">Ngày kết thúc</span>
                  <input
                    className="input-date"
                    type="date"
                    name="dateend"
                    id=""
                    onChange={handleDate}
                  />
                </div>
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Tìm kiếm
                </button>
              </div>
            </div>
            {error && <span className="msg-err-search">{error}</span>}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
