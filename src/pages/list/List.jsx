import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableUser from "../../components/datatable/DatatableUser"
import DatatableTour from "../../components/datatable/DatatableTour"
import DatatableCar from "../../components/datatable/DatatableCar"
import DatatableBookingTour from "../../components/datatable/DatatableBookingTour"
import DatatableReview from "../../components/datatable/DatatableReview"
import DatatableBookingCar from "../../components/datatable/DatatableBookingCar"

const List = ({tour, user, bookingtour,bookingcar, reviewtour, cars}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {tour && <DatatableTour/>}
        {user && <DatatableUser/>}
        {bookingtour && <DatatableBookingTour/>}
        {reviewtour && <DatatableReview/>}
        {cars && <DatatableCar/>}
        {bookingcar && <DatatableBookingCar/>}
      </div>
    </div>
  )
}

export default List