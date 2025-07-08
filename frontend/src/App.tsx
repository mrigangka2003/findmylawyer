import { Routes,Route } from "react-router-dom"

import NavBar from "./components/NavBar"
import { 
  Home, 
  Lawyers,
  Contact,
  About,
  MyProfile,
  MyAppointments,
  Login,
  Appointment
} from "./pages"
import Footer from "./components/Footer"


function App() {

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/lawyers" element={<Lawyers/>}/>
        <Route path="/lawyers/:speciality" element={<Lawyers/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/my-profile" element={<MyProfile/>}/>
        <Route path="/my-appointments" element={<MyAppointments/>}/>
        <Route path="/appointment/:lawyerId" element={<Appointment/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
