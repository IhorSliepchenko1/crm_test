import { Header } from "../header"
import { Container } from "../container"
import { NavBar } from "../nav-bar"
import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
     selectIsAuthenticated,
} from "../../../features/user/userSlice"
import { useEffect } from "react"


export const Layout = () => {

     // const [burgerBtn, setBurgerBtn] = useState(false)

     const isAuthenticated = useSelector(selectIsAuthenticated)
     const navigate = useNavigate()

     useEffect(() => {
          if (!isAuthenticated) {
               navigate(`/auth`)
          }
     }, [])

     const handleBurger = () => {
          // setBurgerBtn((prev) => !prev)
          const header: HTMLElement | null = document.getElementById("nav");

          if (header) {
               header.classList.toggle("active");
          }

          // const menuIcon = document.getElementById("menu");
          // menuIcon.classList.toggle("_active");

          const body = document.body;
          body.classList.toggle("no-scroll");
     }


     return (
          <>
               <Header handleBurger={handleBurger} />
               <Container>
                    <div className="flex-2">
                         <NavBar handleBurger={handleBurger} />
                    </div>
                    <div className="flex-1 p-4">
                         <Outlet />
                    </div>
               </Container>
          </>
     )
}