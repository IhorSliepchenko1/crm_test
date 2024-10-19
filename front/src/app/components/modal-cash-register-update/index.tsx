import { Modal as ModalNext, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Input } from "../input";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../error-message/index"
import { hasErrorField } from "../../../utils/has-error-field"
import { useEffect, useState } from "react";
import { useLazyGetAllCashRegisterQuery, useUpdateCashRegisterMutation } from "../../services/cashRegisterApi";
import { Deposit } from "../../types";

type Props = {
     isOpen: boolean
     onOpenChange: () => void
     page: number
     limit: number
     cash: number | undefined;
     cashless: number | undefined;
     dateProps: string | Date;
     id: number
}

export const ModalUpdate = ({
     isOpen,
     onOpenChange,
     page,
     limit,
     cash,
     cashless,
     dateProps,
     id
}: Props) => {

     const [error, setError] = useState("")

     const {
          handleSubmit,
          control,
          reset
     } = useForm<Deposit>({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               cash: cash,
               cashless: cashless,
               date: dateProps,
          },
     })

     const resetInput = () => {
          onOpenChange()
          reset()
          setError(``)
     }

     useEffect(() => {
          if (isOpen) {
               reset({
                    cash,
                    cashless,
                    date: dateProps,
               });
          }
     }, [isOpen, cash, cashless, dateProps, reset]);

     const [triggerGetAllCashRegisterDeposit] = useLazyGetAllCashRegisterQuery()
     const [updateUsercashRegisterDeposit, { isLoading }] = useUpdateCashRegisterMutation()



     const onSubmit = async (data: Deposit) => {
          try {
               await updateUsercashRegisterDeposit({ data, id }).unwrap()
               await triggerGetAllCashRegisterDeposit({ page, limit }).unwrap()
               resetInput()

          } catch (err) {

               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }
     return (
          <ModalNext
               isOpen={isOpen}
               onOpenChange={resetInput}
               placement="top-center"
          >
               <ModalContent>
                    {(onClose) => (
                         <><form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                              <ModalHeader className="flex flex-col gap-1">Внести кассу</ModalHeader>
                              <ModalBody>


                                   <Input control={control}
                                        name="cash"
                                        label="Наличные"
                                        type="number"
                                        required="Обязательное поле" />
                                   <Input control={control}
                                        name="cashless"
                                        label="Безналичные"
                                        type="number"
                                        required="Обязательное поле" />
                                   <Input control={control}
                                        name="date"
                                        label="Дата"
                                        type="date"
                                        required="Обязательное поле" />


                                   <ErrorMessage error={error} />

                              </ModalBody>
                              <ModalFooter className="flex justify-between">
                                   <Button color="danger" variant="solid" onPress={onClose}>
                                        Закрыть
                                   </Button>
                                   <Button
                                        fullWidth
                                        color="primary"
                                        type="submit"
                                        isLoading={isLoading}
                                   >
                                        Обновить
                                   </Button>
                              </ModalFooter>
                         </form>
                         </>
                    )}
               </ModalContent>
          </ModalNext>
     )
}
