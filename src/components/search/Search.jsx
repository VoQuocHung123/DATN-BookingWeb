import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faCircleInfo,
  faHouse,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  const [date, setDate] = useState();
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();
  const handleDate = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };
  const handleSearch = () => {
    navigate("/tours", { state: { destination, date } });
  };
  return (
    <div className="headerSearch">
      <div className="headerSearchItem">
        <FontAwesomeIcon icon={faBed} className="headerIcon" />
        <input
          type="text"
          placeholder="Bạn muốn đi đâu  ?"
          className="headerSearchInput"
          onChange={(e) => setDestination(e.target.value)}
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
  );
}
