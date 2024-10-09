import { Outlet } from "react-router-dom";
import ProtectedRoute from "../protected";

const Layout = () => {
     return <ProtectedRoute>
          <Outlet />
     </ProtectedRoute>

}

export default Layout