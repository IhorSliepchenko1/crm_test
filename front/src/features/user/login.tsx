import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "../../app/components/input"
import { Button } from "@nextui-org/react"
import {
     useLazyCheckQuery,
     useLoginMutation,
} from "../../app/services/userApi"
import { useNavigate } from "react-router-dom"
import { ErrorMessage } from "../../app/components/error-message"
import { hasErrorField } from "../../utils/has-error-field"

type Login = {
     login: string
     password: string
}

// type Props = {
//      setSelected: (value: string) => void
// }

export const Login = () => {
     const {
          handleSubmit,
          control,
     } = useForm<Login>({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               login: "",
               password: "",
          },
     })

     const [login, { isLoading }] = useLoginMutation()
     const navigate = useNavigate()
     const [error, setError] = useState("")
     const [triggerCurrentQuery] = useLazyCheckQuery()

     const onSubmit = async (data: Login) => {
          try {
               await login(data).unwrap()
               await triggerCurrentQuery().unwrap()
               navigate("/")
          } catch (err) {
               if (hasErrorField(err)) {
                    setError(err.data.error)
               }
          }
     }
     return (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
               <Input
                    control={control}
                    name="login"
                    label="Логин"
                    type="text"
                    required="Обязательное поле"
               />
               <Input
                    control={control}
                    name="password"
                    label="Пароль"
                    type="password"
                    required="Обязательное поле"
               />
               <ErrorMessage error={error} />

               <div className="flex gap-2 justify-end">
                    <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
                         Войти
                    </Button>
               </div>
          </form>
     )
}