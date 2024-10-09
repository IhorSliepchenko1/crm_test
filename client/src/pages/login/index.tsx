import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchLogin } from "../../features/login/loginSlice";
import { fetchAuth } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

type FormValues = {
     login: string;
     password: string;
};

const Login = () => {

     const dispatch = useAppDispatch()
     const { token } = useAppSelector((state) => state.token)
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
               <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("login")} />
                    <input {...register("password")} />

                    <button type="submit">Войти</button>
               </form>

               {/* <button onClick={() => dispatch(logout())}>logout</button> */}
          </>
     )
}

export default Login