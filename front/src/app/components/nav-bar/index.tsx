import { NavButton } from "../nav-button"
import { PiCashRegisterFill } from "react-icons/pi";
import { GiPayMoney } from "react-icons/gi";
// import { FaUsers } from "react-icons/fa";
import { LuType } from "react-icons/lu";
import { MdClose } from "react-icons/md";

import './index.scss'
type Props = {
     handleBurger: () => void
}

export const NavBar = ({ handleBurger }: Props) => {

     return (
          <nav className={`nav-bar`} id="nav">
               <div onClick={() => handleBurger()} className="burger-button close">
                    <MdClose />
               </div>
               <ul className="flex flex-col gap-5">
                    <li>
                         <NavButton classProps={`active_btn`} href="/" icon={<PiCashRegisterFill />}>
                              Кассы
                         </NavButton>
                    </li>
                    <li>
                         <NavButton classProps={`active_btn`} href="expenses" icon={<GiPayMoney />}>
                              Расходы
                         </NavButton>
                    </li>
                    {/* <li>
                         <NavButton classProps={`active_btn`} href="register" icon={<FaUsers />}>
                              Пользователи
                         </NavButton>
                    </li> */}
                    <li>
                         <NavButton classProps={`active_btn`} href="type-expenses" icon={<LuType />}>
                              Типы расходов
                         </NavButton>
                    </li>
               </ul>
          </nav>
     )
}