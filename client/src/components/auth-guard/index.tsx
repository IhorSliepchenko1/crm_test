import { useNavigate } from "react-router"
import { fetchAuth } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { ReactNode } from 'react';

const AuthGuard = ({ children }: { children: ReactNode }) => {
     const navigate = useNavigate()
     const token = useAppSelector((state) => state.token)
     const dispatch = useAppDispatch()



     useEffect(() => {
          if (token.token) {
               dispatch(fetchAuth(token.token as string))
               navigate(`/`)
          }
     }, [token])

     return children
}

export default AuthGuard

