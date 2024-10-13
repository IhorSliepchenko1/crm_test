import { useState } from 'react'
import './Auth.scss'
import { useHandleChange } from '../../hooks/useHandleChange'
import Login from '../../components/inputs/login/login'
import Password from '../../components/inputs/password/password'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin } from '../../features/user/loginSlice'
import { fetchAuth } from '../../features/user/authSlice'
import { useNavigate } from 'react-router-dom'
import Error from '../../components/error'


const Auth = () => {
     const [data, setData] = useState({ login: ``, password: `` })
     const { handleChange } = useHandleChange(data, setData)

     const dispatch = useDispatch()
     const { error } = useSelector((state) => state.login)

     const navigate = useNavigate()

     const login = async () => {
          try {
               const loginResponse = await dispatch(fetchLogin(data)).unwrap();
               await dispatch(fetchAuth(`Bearer ${loginResponse}`)).unwrap();
               navigate(`/`);
          } catch (err) {
               console.error("Ошибка входа:", err);
          }
     };



     return (
          <form onSubmit={(e) => {
               e.preventDefault()
               login();
          }} className='form-auth'>
               <div className='input-container'>
                    <Login handleChange={handleChange} name="login" />
                    <Password handleChange={handleChange} name="password" />
               </div>
               {error && <Error message={`Ошибка входа`} />}

               <div className='btn-container'>
                    <button type='submit' className='btn-login'>Войти</button>

               </div>
          </form>
     )

}

export default Auth