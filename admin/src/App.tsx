import { ToastContainer } from 'react-toastify';

import { Login } from "./pages"
import { useAdminStore } from './store/adminStore';
import { NavBar, SideBar } from './components';


function App() {

  const {adminToken} = useAdminStore();

  return adminToken ?(
    <div>
      <ToastContainer/>
      <NavBar/>
      <div>
        <SideBar/>
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
