import './Auth.scss'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '../../features/user/loginSlice'
import { fetchAuth } from '../../features/user/authSlice'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../theme'
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form"
import { CustomInput } from '../../components/input'

const Auth = () => {
     const {
          handleSubmit,
          control,
          formState: { errors },
     } = useForm({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               login: "",
               password: "",
          },
     })

     const dispatch = useDispatch()
     const navigate = useNavigate()

     const onSubmit = async (data) => {
          try {
               const loginResponse = await dispatch(fetchLogin(data)).unwrap();
               await dispatch(fetchAuth(`Bearer ${loginResponse}`)).unwrap();
               navigate(`/`);
          } catch (err) {
               console.error("Ошибка входа:", err);
          }
     };

     const { theme, toggleTheme } = useTheme();


     return (
          <>
               <div className="flex justify-end cursor-pointer" onClick={toggleTheme}>
                    {theme === `light` ? <CiLight /> : <CiDark />}
               </div>
               <form onSubmit={handleSubmit(onSubmit)} className='form-auth'>

                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                         <CustomInput
                              control={control}
                              name="login"
                              label="Логин"
                              type="text"
                              required="Обязательное поле"
                         />
                         <CustomInput
                              control={control}
                              name="password"
                              label="Пароль"
                              type="password"
                              required="Обязательное поле"
                         />
                    </div>

                    {errors.exampleRequired && <span>Ошибка</span>}



                    <div className='flex justify-end mt-3 w-full'>
                         <Button color="primary" type='submit' >
                              Войти
                         </Button>
                    </div>

               </form></>
     )

}

export default Auth