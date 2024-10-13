import { Outlet } from "react-router-dom"
import ProtectedRoute from "../protectedRoute"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuth } from "../../features/user/authSlice"
import { useEffect } from "react"
import NavBar from "../nav-bar"

const Layout = () => {
     const { token } = useSelector((state) => state.login)
     const dispatch = useDispatch()

     useEffect(() => {
          if (token) {
               console.log("Fetching auth with token:", token);
               dispatch(fetchAuth(token));
          }
     }, [token, dispatch]);



     return (
          <ProtectedRoute>
               <div >
                    <NavBar />
                    <div className="layout">
                         <Outlet />
                    </div>
               </div>
          </ProtectedRoute>
     )
}

export default Layout