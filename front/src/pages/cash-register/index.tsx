import { useGetAllCashRegisterQuery } from "../../app/services/cashRegisterApi"

export const CashRegister = () => {
     const { data } = useGetAllCashRegisterQuery()

     console.log(data);

     return (
          <></>
     )
}
