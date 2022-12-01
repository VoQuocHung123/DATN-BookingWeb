import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import TourCard from "../../components/tourCard/TourCard";
import "./home.css";
import axios from "axios";
import SliderTour from "../../components/sliderTour/SliderTour";
import CarCard from "../../components/carcard/CarCard";

const Home = () => {
  const [dataNewTour, setDataNewTour] = useState([]);
  const [dataTourIn, setDataTourIn] = useState([]);
  const [dataTourOut, setDataTourOut] = useState([]);
  const [dataCar, setDataCar] = useState([]);
  const getDataNewTour = async () => {
    try {
      axios.defaults.withCredentials = true;
      const newTour = await axios.get(
        `http://localhost:3001/api/tours/newtour?limit=3`
      );
      console.log(newTour.data);
      setDataNewTour(newTour.data);
    } catch (error) {}
  };
  const getDataTourIn = async () => {
    try {
      axios.defaults.withCredentials = true;
      const newTour = await axios.get(`http://localhost:3001/api/tours/tourin`);
      console.log(newTour.data);
      setDataTourIn(newTour.data);
    } catch (error) {}
  };
  const getDataTourOut = async () => {
    try {
      axios.defaults.withCredentials = true;
      const newTour = await axios.get(
        `http://localhost:3001/api/tours/tourout`
      );
      console.log(newTour.data);
      setDataTourOut(newTour.data);
    } catch (error) {}
  };
  const getDataCar = async () =>{
    try {
      axios.defaults.withCredentials = true;
      const dataCar = await axios.get(
        `http://localhost:3001/api/cars?limit=4&page=1`
      );
      setDataCar(dataCar.data.cars);
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getDataNewTour();
    getDataTourIn();
    getDataTourOut();
    getDataCar();
  }, []);
  return (
    <div className="home-main">
      <Navbar />
      <Header />
      <div className="homeContainer">
        <h1 className="homeTitle">Tours Du Lịch Mới Nhất</h1>
        <div className="featured">
          {dataNewTour?.map((item) => {
            return <TourCard newCard={true} data={item} key={item._id}></TourCard>;
          })}
        </div>
        <h1 className="homeTitle">Tour Trong Nước</h1>
        <SliderTour dataTourIn={dataTourIn} />
        <h1 className="homeTitle">Tour Ngoài Nước</h1>
        <SliderTour dataTourOut={dataTourOut} />
        <h1 className="homeTitle">Thuê Xe</h1>
        <div className="fp">
        {dataCar.map((item)=>{
          return <CarCard dataCar={item} key={item._id} />
        })}
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
