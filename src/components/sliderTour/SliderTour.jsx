import React from "react";
import Slider from "react-slick";
import TourCard from "../tourCard/TourCard";
import "./SliderTour.css";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: 40 }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", zIndex: 2, left: 5 }}
      onClick={onClick}
    />
  );
}

export default function SliderTour({ dataTourIn, dataTourOut}) {
  console.log(dataTourIn);
  var settings = {
    dots:  true,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow  />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      {dataTourIn && (
        <Slider {...settings}>
          {dataTourIn.map((item) => (
            <div className="slide-image-item">
              <TourCard slideCard={true} data={item} key={item._id} />
            </div>
          ))}
        </Slider>
      )}
       {dataTourOut && (
        <Slider {...settings}>
          {dataTourOut.map((item) => (
            <div className="slide-image-item">
              <TourCard slideCard={true} data={item} key={item._id} />
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}
