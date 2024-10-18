import { CashRegister } from "../types"
import { api } from "./api"

type CashData = {
     cash: number, cashless: number, date: Date, id: number
}

export const cahsRegisterApi = api.injectEndpoints({
     endpoints: (builder) => ({

          // добавление 
          cashRegisterDeposit: builder.mutation<
               CashRegister,
               { cashData: CashData }

          >({
               query: (cashData) => ({
                    url: "cash-register/deposit",
                    method: "POST",
                    body: cashData,
               }),
          }),

          //получение 

          getAllCashRegister: builder.query<CashRegister[], void>({
               query: () => ({
                    url: "cash-register/",
                    method: "GET",
               }),
          }),

          //редактирование 
          updateCashRegister: builder.mutation<CashRegister, { cashData: CashData }>({
               query: ({ cashData }) => ({
                    url: `/cash-register/${cashData.id}`,
                    method: "PUT",
                    body: cashData,
               }),
          }),

          // удаление 
          deleteCashRegister: builder.mutation<void, number>({
               query: (id) => ({
                    url: `/cash-register/${id}`,
                    method: "DELETE",
               }),
          }),
     }),
})

export const {
     useCashRegisterDepositMutation,
     useDeleteCashRegisterMutation,
     useGetAllCashRegisterQuery,
     useUpdateCashRegisterMutation,
     useLazyGetAllCashRegisterQuery,
} = cahsRegisterApi

export const { endpoints: {
     cashRegisterDeposit,
     getAllCashRegister,
     updateCashRegister,
     deleteCashRegister,
} } = cahsRegisterApi
