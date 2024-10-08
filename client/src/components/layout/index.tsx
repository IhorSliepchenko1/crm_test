import { Outlet } from "react-router-dom";
import AuthGuard from "../auth-guard";

const Layout = () => {
     return (<AuthGuard>
          <Outlet />
     </AuthGuard>)
}

export default Layout