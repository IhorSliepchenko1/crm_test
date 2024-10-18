import { useDeleteCashRegisterMutation, useLazyGetAllCashRegisterQuery, useUpdateCashRegisterMutation } from "../../services/cashRegisterApi"

export const Card = () => {

     // вызов при удалении/обновлении
     const [triggerGetAllCashRegisterDeposit] = useLazyGetAllCashRegisterQuery()
     // удаление
     const [deleteCashRegister, deleteCashRegisterStatus] = useDeleteCashRegisterMutation()
     // обновление
     const [updateCashRegister, updateCashRegisterStatus] = useUpdateCashRegisterMutation()




     return (
          <div>Card</div>
     )
}
