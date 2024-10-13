import { useDispatch } from 'react-redux';
import { Button } from "@nextui-org/react";
import { logout } from '../../features/user/authSlice';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const dispatch = useDispatch()

  return (



    <div className='flex items-center justify-between header'>
      <div className='nav'>
        <NavLink to="/">
          Касса
        </NavLink>


        <NavLink to="/expenses">
          Расходы
        </NavLink>

        <NavLink to="/register">
          Регистрация
        </NavLink>

      </div>


      <Button color="primary" variant="flat" onClick={() => dispatch(logout())}>
        Выйти
      </Button>

    </div>

  )
}

export default NavBar