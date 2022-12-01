import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import NewUser from "./pages/newUser/NewUser";
import NewTour from "./pages/newTour/NewTour";
import UpdateUser from "./pages/updateUser/UpdateUser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import DetailUser from "./pages/detailUser/DetailUser";
import UpdateTour from "./pages/updateTour/UpdateTour";
import UpdateCar from "./pages/updateCar/UpdateCar";
import { AuthContext } from "./context/AuthContext";
import NewCar from "./pages/newCar/NewCar";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin">
            <Route
              index
              element={
                <ProtectedRoute>
                  {" "}
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List user={true} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="detail/:userId"
                element={
                  <ProtectedRoute>
                    {" "}
                    <DetailUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="newuser"
                element={
                  <ProtectedRoute>
                    {" "}
                    <NewUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="updateuser/:userId"
                element={
                  <ProtectedRoute>
                    {" "}
                    <UpdateUser />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="tours">
              <Route
                index
                element={
                  <ProtectedRoute>
                    {" "}
                    <List tour={true} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="newtour"
                element={
                  <ProtectedRoute>
                    {" "}
                    <NewTour />
                  </ProtectedRoute>
                }
              />
              <Route
                path="updatetour/:tourId"
                element={
                  <ProtectedRoute>
                    {" "}
                    <UpdateTour />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="bookingtours">
              <Route
                index
                element={
                  <ProtectedRoute>
                    {" "}
                    <List bookingtour={true} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="newtour"
                element={
                  <ProtectedRoute>
                    {" "}
                    <NewTour />
                  </ProtectedRoute>
                }
              />
              <Route
                path="updatetour/:tourId"
                element={
                  <ProtectedRoute>
                    {" "}
                    <UpdateTour />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="reviewtours">
              <Route
                index
                element={
                  <ProtectedRoute>
                    {" "}
                    <List reviewtour={true} />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="cars">
              <Route
                index
                element={
                  <ProtectedRoute>
                    {" "}
                    <List cars={true} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="newcar"
                element={
                  <ProtectedRoute>
                    {" "}
                    <NewCar />
                  </ProtectedRoute>
                }
              />
              <Route
                path="updatecar/:carId"
                element={
                  <ProtectedRoute>
                    {" "}
                    <UpdateCar />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="bookingcar">
              <Route
                index
                element={
                  <ProtectedRoute>
                    {" "}
                    <List bookingcar={true} />
                  </ProtectedRoute>
                }
              />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
