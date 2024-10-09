import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchLogin } from "../../features/login/loginSlice";
import { fetchAuth } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import style from "./login.module.scss"


type FormValues = {
     login: string;
     password: string;
};

const Login = () => {

     const dispatch = useAppDispatch()
     const { token } = useAppSelector((state) => state.token)
     const { status } = useAppSelector((state) => state.token)

     const { register, handleSubmit } = useForm<FormValues>();
     const navigate = useNavigate()
     const onSubmit = (data: FormValues) => {
          dispatch(fetchLogin({ data }));
     }

     useEffect(() => {

          if (token) {
               dispatch(fetchAuth(token));
               navigate(`/`)
          }

     }, [dispatch, navigate, token])


     return (
          <>
               <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                    <div className={style.input_container}>
                         <TextField
                              label="Login"
                              type="text"
                              variant="standard"
                              {...register("login")}

                         />

                         <TextField
                              label="Password"
                              type="password"
                              variant="standard"
                              {...register("password")}
                         />
                    </div>
                    {status === `rejected` ? <div className={style.error}>Ошибка входа!</div> : <></>}
                    <div className={style.btn_slot}>
                         <Button variant="contained" type="submit">Войти</Button>
                    </div>
               </form>

          </>
     )
}

export default Login