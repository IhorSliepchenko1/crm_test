import { CiLogout } from "react-icons/ci"

import {
     Button,
     Navbar,
     NavbarContent,
     NavbarItem,
} from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"
import { selectIsAuthenticated, logout } from "../../../features/user/userSlice"
import { useNavigate } from "react-router-dom"
import { ToggleTheme } from "../toggle-them"
import { GiHamburgerMenu } from "react-icons/gi";


type Props = {
     handleBurger: () => void
}

export const Header = ({ handleBurger }: Props) => {

     const isAuthenticated = useSelector(selectIsAuthenticated)
     const dispatch = useDispatch()
     const navigate = useNavigate()

     const handleLogout = () => {
          dispatch(logout())
          navigate(`/auth`)
     }

     return (

          <Navbar className="max-w-max min-w-full">

               <div onClick={() => handleBurger()} className="burger-button">
                    <GiHamburgerMenu />
               </div>
               <NavbarContent justify="end">
                    <ToggleTheme />

                    <NavbarItem>
                         {isAuthenticated && (
                              <Button
                                   color="default"
                                   variant="flat"
                                   className="gap-2 logout"
                                   onClick={handleLogout}
                              >
                                   <CiLogout /> <span>Выйти</span>
                              </Button>
                         )}
                    </NavbarItem>
               </NavbarContent>


          </Navbar>

     )
}