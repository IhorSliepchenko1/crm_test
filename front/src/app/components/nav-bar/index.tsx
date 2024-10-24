import { ToggleTheme } from "../toggle-them"
import { Navbar, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectIsAuthenticated } from "../../../features/user/userSlice";
import { CiLogout } from "react-icons/ci"
import { NavButton } from "../nav-button";


export const NavBar = () => {

     const isAuthenticated = useSelector(selectIsAuthenticated)
     const dispatch = useDispatch()
     const navigate = useNavigate()

     const handleLogout = () => {
          dispatch(logout())
          navigate(`/auth`)
     }

     return (

          <Navbar >
               <NavbarContent >
                    <NavbarItem>
                         <NavButton to="/" active={`active`}>
                              Касса
                         </NavButton>
                    </NavbarItem>
                    <NavbarItem >
                         <NavButton to="/expenses" >
                              Расходы
                         </NavButton>
                    </NavbarItem>
                    <NavbarItem>
                         <NavButton to="/type-expenses">
                              Типы расходов
                         </NavButton>
                    </NavbarItem>
               </NavbarContent>
               <NavbarContent justify="end">
                    <NavbarItem>
                         <NavbarContent>
                              <ToggleTheme />

                              {isAuthenticated && (
                                   <Button
                                        color="default"
                                        variant="flat"
                                        className="gap-2 logout"
                                        onClick={handleLogout}
                                   >
                                        <CiLogout /> <span>Выйти</span>
                                   </Button>
                              )} </NavbarContent>


                    </NavbarItem>
               </NavbarContent>
          </Navbar>

     );
}
