import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useTheme } from "../../../../theme-provider";
import { Button } from "../../button";
import { Input } from "../../input";
import { ErrorMessage } from "../../error-message";
import { Control, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { TypesExpenses } from "../../../types";
import { Chip } from "@nextui-org/react";


type Expenses = {
     name: string;
     sum: number;
     date: string;
}

type Props = {
     isOpen: boolean
     resetInput: () => void
     control: Control<Expenses>
     handleSubmit: UseFormHandleSubmit<Expenses>
     onSubmit: SubmitHandler<Expenses>
     error: string
     setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
     types: TypesExpenses[] | []
     setTypeId: (value: React.SetStateAction<string>) => void | undefined
     handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
     update?: boolean
     typeName?: string
     setUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalExpensesBase = ({
     isOpen,
     resetInput,
     control,
     handleSubmit,
     onSubmit,
     error,
     handleFileChange,
     types,
     setTypeId,
     update = false,
     typeName,
     setUpdate
}: Props) => {
     const { theme } = useTheme()


     return (
          <Modal
               isOpen={isOpen}
               onOpenChange={resetInput}
               placement="top-center"
               className={`${theme} text-foreground-500`}
          >
               <ModalContent>
                    {(onClose) => (
                         <><form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                              <ModalHeader className="flex flex-col gap-1">Внести расход</ModalHeader>
                              <ModalBody>


                                   <Input control={control}
                                        name="name"
                                        label="Наименование расхода"
                                        type="text"
                                        required="Обязательное поле" />
                                   <Input control={control}
                                        name="sum"
                                        label="Сумма расхода"
                                        type="number"
                                        required="Обязательное поле" />
                                   <Input control={control}
                                        name="date"
                                        label="Дата"
                                        type="date"
                                        required="Обязательное поле" />


                                   {
                                        update ? <div className="flex justify-between">
                                             <Chip color="secondary">тип: {typeName}</Chip>


                                             <Chip className="cursor-pointer" color="warning" onClick={() => setUpdate((prev) => !prev)}>сменить тип?</Chip></div> : <Select
                                                  label="Тип расходов"
                                                  className="max-w-xs"
                                                  onChange={(e) => setTypeId(e.target.value)
                                                  }
                                             >
                                             {types.map((type) => (
                                                  <SelectItem key={type.id} value={type.id}>
                                                       {type.name}
                                                  </SelectItem>
                                             ))}
                                        </Select>
                                   }



                                   <input
                                        type="file"
                                        name="img"
                                        placeholder="Выберите файл"
                                        onChange={handleFileChange}
                                   />

                                   <ErrorMessage error={error} />

                              </ModalBody>
                              <ModalFooter className="flex justify-between">
                                   <Button color="danger" variant="solid" onPress={onClose}>
                                        Закрыть
                                   </Button>
                                   <Button color="success" variant="solid" type="submit">
                                        Внести
                                   </Button>
                              </ModalFooter>
                         </form>
                         </>
                    )}
               </ModalContent>
          </Modal >
     )
}
