import { lazy, Suspense, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"

import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import { useLawyerStore } from "./store/useLawyerStore"
import { Toaster } from "react-hot-toast"

// Lazy-loaded pages — each becomes its own chunk, loaded on demand
const Home = lazy(() => import("./pages/Home"))
const Lawyers = lazy(() => import("./pages/Lawyers"))
const Appointment = lazy(() => import("./pages/Appointment"))
const Login = lazy(() => import("./pages/Login"))
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"))
const About = lazy(() => import("./pages/About"))
const Contact = lazy(() => import("./pages/Contact"))
const MyProfile = lazy(() => import("./pages/MyProfile"))
const MyAppointments = lazy(() => import("./pages/MyAppointments"))
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"))
const LawyerDashboard = lazy(() => import("./pages/LawyerDashboard"))

// Routes that need the lawyers list pre-fetched
const LAWYER_ROUTES = ["/", "/lawyers", "/appointment"]

function AppContent() {
  const fetchLawyers = useLawyerStore((state) => state.fetchLawyers)
  const { pathname } = useLocation()

  useEffect(() => {
    const needsLawyers = LAWYER_ROUTES.some((r) => pathname.startsWith(r))
    if (needsLawyers) {
      fetchLawyers()
    }
  }, [fetchLawyers, pathname])

  return (
    <div className="bg-dark-900 min-h-screen">
      <Toaster position="top-center" />
      <NavBar />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#050505]">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        }
      >
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
      </Suspense>
      <Footer />
    </div>
  )
}

export default function App() {
  return <AppContent />
}
