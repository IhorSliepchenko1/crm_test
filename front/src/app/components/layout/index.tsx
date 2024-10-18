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

     const isAuthenticated = useSelector(selectIsAuthenticated)
     const navigate = useNavigate()

     useEffect(() => {
          if (!isAuthenticated) {
               navigate(`/auth`)
          }
     }, [isAuthenticated, navigate])

     const handleBurger = () => {
          const header: HTMLElement | null = document.getElementById("nav");
          header?.classList.toggle("active");

          const body = document.body;
          body.classList.toggle("no-scroll");

          body.addEventListener(`click`, (e) => {

               if (e.target instanceof HTMLElement && !e.target.classList.contains('nav-bar')) {
                    header?.classList.remove("active")
               }

          })
     }


     return (
          <>
               <Header handleBurger={() => {
                    handleBurger()
               }} />
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