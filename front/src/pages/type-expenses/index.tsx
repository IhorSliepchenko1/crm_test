import { useForm } from "react-hook-form"
import { Input } from "../../app/components/input"
import { Button } from "@nextui-org/react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

type NameType = {
     name: string
}

export const TypeExpenses = () => {
     const {
          // handleSubmit,
          control,
     } = useForm<NameType>({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               name: "",
          },
     })

     const array = [
          `type -1`,
          `type -1`,
          `type -1`,
          `type -1`,
          `type -1`,
          `type -1`,
     ]

     return (
          <div>
               <div className="flex items-center gap-1 mb-6">
                    <Input control={control}
                         name="name"
                         label="Тип расхода"
                         type="text"
                         required="Обязательное поле" />

                    <Button color="success" isIconOnly>
                         <IoMdAddCircleOutline />
                    </Button>
               </div>

               <div>
                    {
                         array.map((item) => (

                              <div style={{ borderBottom: `1px solid` }} className="flex items-center justify-between py-1.5">
                                   <div>{item}</div>
                                   <div className="flex gap-2">
                                        <Button color="danger" isIconOnly>
                                             <MdDelete />
                                        </Button>
                                        <Button color="warning" isIconOnly>
                                             <MdEdit />
                                        </Button>
                                   </div>

                              </div>
                         ))
                    }
               </div>
          </div>
     )
}
