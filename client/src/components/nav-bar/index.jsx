import { useDispatch } from 'react-redux';
import { Button } from "@nextui-org/react";
import { logout } from '../../features/user/authSlice';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const dispatch = useDispatch()

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
      <Button color="primary" variant="flat" onClick={() => dispatch(logout())}>
        Выйти
      </Button>

    </nav>

  )
}

export default NavBar