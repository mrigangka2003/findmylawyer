import { ToastContainer } from 'react-toastify';

import { AddLawyer, AllAppointments, Dashboard, LawyersList, Login } from "./pages"
import { useAdminStore } from './store/adminStore';
import { NavBar, SideBar } from './components';
import { Route, Routes } from 'react-router-dom';



function App() {

  const {adminToken} = useAdminStore();

  return adminToken ?(
    <div>
      <ToastContainer/>
      <NavBar/>
      <div className='flex'>
        <SideBar/>
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-lawyers" element={<AddLawyer />} />
            <Route path="/lawyers-list" element={<LawyersList />} />
          </Routes>
        </main>
      </div>
    </div>
  ) : (
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App
