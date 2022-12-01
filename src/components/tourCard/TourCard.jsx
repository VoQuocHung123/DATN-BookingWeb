import React from "react";
import "./TourCard.css";
import { useNavigate } from "react-router-dom";

export default function TourCard({ data, slideCard, searchCard, newCard }) {
  const navigate = useNavigate();
  const { _id, title, timetour, image, priceadults } = data;
  const handleClick = () => {
    navigate(`/detailtour/${_id}`, { state: data });
  };
  return (
    <>
      {searchCard && (
        <div className="fpItemSearch" onClick={handleClick}>
          <div className="container-img-label">
            <img
              src={`http://localhost:3001/${image}`}
              alt=""
              className="fpImg"
              style={{ height: 180 }}
            />
          </div>
          <span className="fpNameSearch">{title}</span>
          <span className="fpCitySearch">{timetour}</span>
          <span className="fpPrice">{priceadults} VNĐ</span>
        </div>
      )}
      {slideCard && (
        <div className="fpItemSlide" onClick={handleClick}>
          <div className="container-img-label">
            <img
              src={`http://localhost:3001/${image}`}
              alt=""
              className="fpImg"
              style={{ height: 180 }}
            />
          </div>
          <span className="fpNameSlide">{title}</span>
          <span className="fpCitySlide">{timetour}</span>
        </div>
      )}
      {newCard && (
        <div className="fpItem" onClick={handleClick}>
          <div className="container-img-label">
            <span className="label-new">Mới nhất</span>
            <img
              src={`http://localhost:3001/${image}`}
              alt=""
              className="fpImg"
            />
          </div>
          <span className="fpName">{title}</span>
          <span className="fpCity">{timetour}</span>
          <span className="fpPrice">{priceadults} VNĐ</span>
        </div>
      )}
    </>
  );
}
