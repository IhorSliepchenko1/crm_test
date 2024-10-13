import { Input } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useForm, Resolver } from "react-hook-form"

type FormValues = {
     login: string
     password: string
}

const resolver: Resolver<FormValues> = async (values) => {
     return {
          values: values.login ? values : {},
          errors: !values.password
               ? {
                    login: {
                         type: "Ошибка",
                         message: "Обязательное поле",
                    },
               }
               : {},
     }
}

export default function Auth() {
     const [isVisible, setIsVisible] = useState(false);
     const toggleVisibility = () => setIsVisible(!isVisible);

     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm<FormValues>({ resolver })
     const onSubmit = handleSubmit((data) => console.log(data))

     return (
          <DefaultLayout>
               <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                         <h4 className="font-bold text-large">Введите логин и пароль</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                         <div className="w-full flex flex-col gap-4">
                              <Input type="text" variant={"underlined"} label="Логин" placeholder="Введите логин" />
                              <Input
                                   label="Пароль"
                                   variant="underlined"
                                   placeholder="Введите пароль"
                                   endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                             {isVisible ? (
                                                  <FaEyeSlash />
                                             ) : (
                                                  <FaRegEye />

                                             )}
                                        </button>
                                   }
                                   type={isVisible ? "text" : "password"}
                              />


                              <form onSubmit={onSubmit}>
                                   <input {...register("firstName")} placeholder="Bill" />
                                   {errors?.firstName && <p>{errors.firstName.message}</p>}

                                   <input {...register("lastName")} placeholder="Luo" />

                                   <input type="submit" />
                              </form>
                         </div>
                    </CardBody>
               </Card>
          </DefaultLayout>
     );
}