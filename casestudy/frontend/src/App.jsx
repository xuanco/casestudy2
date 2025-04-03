import './App.css'
import {Route, Routes} from "react-router";
import Home from "./pages/users/home.jsx";
import Master from "./components/Admin/Layout/Master.jsx";
import SignIn from "./pages/Login/index.jsx";
import Register from "./pages/Register/Register.jsx";
import ManagerUsers from "./pages/admin/managerusers.jsx";
import ManagerHouses from "./pages/admin/managerhouses.jsx";
import AddHouse from "./pages/admin/AddHouse.jsx";
import  EditHouse from "./pages/admin/edithouse.jsx";
import HouseDetail from "./pages/HouseDetail/housedetail.jsx";
function App() {
  return (
    <>
       <Routes>
           <Route path="/login" element={<SignIn />} />
           <Route path="/register" element={<Register />} />
           <Route path="/admin" element={<Master/>}>
               <Route path="home" element={<Home />} />
               <Route path="managerusers" element={<ManagerUsers/>}/>
               <Route path="managerhouses" element={<ManagerHouses/>}/>
               <Route path="addhouse" element={<AddHouse/>}/>
               <Route path="edithouse/:id" element={<EditHouse />} />
               <Route path="housedetail/:id" element={<HouseDetail />} />
           </Route>
       </Routes>
    </>
  )
}

export default App
