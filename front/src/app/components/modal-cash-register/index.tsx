import { Modal as ModalNext, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Input } from "../input";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../error-message/index"
import { hasErrorField } from "../../../utils/has-error-field"
import { useState } from "react";
import { useCashRegisterDepositMutation, useLazyGetAllCashRegisterQuery } from "../../services/cashRegisterApi";
import { Deposit } from "../../types";
import { Button } from "../button";
import { useCalendarInputDate } from "../../hooks/useCalendarInputDate";

type Props = {
     isOpen: boolean
     onOpenChange: () => void
     page: number
     limit: number
}

export const Modal = ({ isOpen, onOpenChange, page, limit }: Props) => {

     const { calendarDate } = useCalendarInputDate()
     const [error, setError] = useState("")

     const {
          handleSubmit,
          control,
          reset
     } = useForm<Deposit>({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               cash: 0, cashless: 0, date: calendarDate(new Date(Date.now())),
          },
     })

     const resetInput = () => {
          onOpenChange()
          reset()
          setError(``)
     }

     const [triggerGetAllCashRegisterDeposit] = useLazyGetAllCashRegisterQuery()
     const [cashRegisterDeposit] = useCashRegisterDepositMutation()



     const onSubmit = async (data: Deposit) => {
          try {
               await cashRegisterDeposit(data).unwrap()
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
                                   <Button color="success" variant="solid" type="submit">
                                        Внести
                                   </Button>
                              </ModalFooter>
                         </form>
                         </>
                    )}
               </ModalContent>
          </ModalNext>
     )
}
