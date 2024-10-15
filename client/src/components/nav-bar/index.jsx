import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/authSlice';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../theme'
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { AiOutlinePoweroff } from "react-icons/ai";

const NavBar = () => {
  const dispatch = useDispatch()
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className='flex items-center justify-between header'>
      <ul className='ul'>
        <li>
          <NavLink to="/">
            Касса
          </NavLink>
        </li>
        <li>
          <NavLink to="/expenses">
            Расходы
          </NavLink>
        </li>
        <li>
          <NavLink to="/register">
            Регистрация
          </NavLink>
        </li>
      </ul>
      <div className='flex items-center gap-4'>
        <div className="flex justify-end cursor-pointer" onClick={toggleTheme}>
          {theme === `light` ? <CiLight /> : <CiDark />}
        </div>
        <AiOutlinePoweroff className='cursor-pointer'  onClick={() => dispatch(logout())} />
      </div>
    </nav>

  )
}

export default NavBar