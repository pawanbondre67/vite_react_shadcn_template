import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
const Layout = () => {
    return (
        <main>
            <Outlet />
            <ToastContainer /> 
        </main>
    )
}

export default Layout;