import React from "react";
import { FaPlus } from "react-icons/fa";

export default function InputSlideImage({
  item,
  index,
  handleSlideImage,
  handleDeleteImageSlide,
}) {
  return (
    <div className="group-content-image" key={index}>
      <label style={{ display: "block" }}> Ảnh {index + 1}</label>
      <input
        type="file"
        id={`img-slide-${index}`}
        className="slide-image-item"
        onChange={(event) => handleSlideImage(event, index)}
      />
      {item && (
        <>
          <div className="image-item-container">
            <img src={item} alt="" className="img-slide-select" />
            <div className="action-slide-image">
              <button
                className="btn-update-slideimg"
                onClick={(e) =>{
                  e.preventDefault();
                  document.querySelector(`#img-slide-${index}`).click()
                }
                }
              >
                Cập Nhật
              </button>
              <button className="btn-delete-slideimg" onClick={() => handleDeleteImageSlide(index)} >Xoá</button>
            </div>
          </div>
        </>
      )}
      {item === "" && (
        <label htmlFor={`img-slide-${index}`}>
          <div className="img-slide-select">
            <FaPlus />
          </div>
        </label>
      )}
    </div>
  );
}
