// import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import style from './index.module.scss'
import { NavLink } from 'react-router-dom';
import { logout } from '../../features/user/authSlice'

const NavBar = () => {

  const dispatch = useDispatch()


  return (
    <nav className={style.nav}>
      <ul>
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
      <button onClick={() => dispatch(logout())}>Выход</button>
    </nav>
  )
}

export default NavBar