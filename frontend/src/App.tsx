import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import NavBar from "./components/NavBar"
import {
  Home,
  Lawyers,
  Contact,
  About,
  MyProfile,
  MyAppointments,
  Login,
  Appointment,
  AdminDashboard,
  LawyerDashboard,
  ForgotPassword,
} from "./pages"
import Footer from "./components/Footer"
import { useLawyerStore } from "./store/useLawyerStore"
import { Toaster } from "react-hot-toast"

function App() {
  const fetchLawyers = useLawyerStore((state) => state.fetchLawyers);

  useEffect(() => {
    fetchLawyers();
  }, [fetchLawyers]);

  return (
    <div className="bg-dark-900 min-h-screen">
      <Toaster position="top-center" />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lawyers" element={<Lawyers />} />
        <Route path="/lawyers/:speciality" element={<Lawyers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:lawyerId" element={<Appointment />} />

        {/* Dashboards */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
        <Route path="/user/dashboard" element={<MyAppointments />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
