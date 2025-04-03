import './App.css'
import {Route, Routes} from "react-router";
import Dashboard from "./pages/HOME/index.jsx";
import Master from "./components/Admin/Layout/Master.jsx";
import BookList from "./pages/Books/BookList/index.jsx";
import SignIn from "./pages/Login/index.jsx";
import Register from "./pages/Register/Register.jsx";
import Booking from "./pages/Booking/booking.jsx";
import HostHouses from "./pages/hosthouses/hosthouses.jsx";
import HouseEdit from "./pages/houseedit/houseedit.jsx";
import ManagerUsers from "./pages/managerusers/managerusers.jsx";
import ManagerHouses from "./pages/managerhouses/managerhouses.jsx";
import Profile from "./pages/profile/profile.jsx";
import HouseDetail from "./pages/HouseDetail/housedetail.jsx";


function App() {
  return (
    <>
       <Routes>
           <Route path="/login" element={<SignIn />} />
           <Route path="/register" element={<Register />} />
           
           <Route path="/admin" element={<Master/>}>
               <Route path="home" element={<Dashboard />} />
               <Route path="books" element={<BookList />} />
               <Route path="booking" element={<Booking />} />
               <Route path="hosthouse" element={<HostHouses/>}/>
               <Route path="houseedit" element={<HouseEdit/>}/>
               <Route path="managerusers" element={<ManagerUsers/>}/>
               <Route path="managerhouses" element={<ManagerHouses/>}/>
               <Route path="profile" element={<Profile/>}/>
               <Route path="housedetail/:id" element={<HouseDetail />} />

               
           </Route>
       </Routes>
    </>
  )
}

export default App
