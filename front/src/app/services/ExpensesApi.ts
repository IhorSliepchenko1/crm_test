import { Expenses } from "../types"
import { api } from "./api"

export const expensesApi = api.injectEndpoints({
     endpoints: (builder) => ({

          // добавление 
          expensesDeposit: builder.mutation<
               Expenses,
               { expensesData: FormData }

          >({
               query: (expensesData) => ({
                    url: "expenses/deposit",
                    method: "POST",
                    body: expensesData,
               }),
          }),

          //получение 

          getAllExpenses: builder.query<Expenses[], {
               page: number,
               limit: number,
          }>({
               query: ({ page,
                    limit }) => ({
                         url: "expenses/",
                         method: "GET",
                         params: { page, limit },
                    }),
          }),

          //редактирование 
          updateExpenses: builder.mutation<Expenses,
               { expensesData: FormData, id: number }>({
                    query: ({ expensesData, id }) => ({
                         url: `/expenses/${id}`,
                         method: "PUT",
                         body: expensesData,
                    }),
               }),

          // удаление 
          deleteExpenses: builder.mutation<void, number>({
               query: (id) => ({
                    url: `/expenses/${id}`,
                    method: "DELETE",
               }),
          }),
     }),
})

export const {
     useDeleteExpensesMutation,
     useExpensesDepositMutation,
     useGetAllExpensesQuery,
     useLazyGetAllExpensesQuery,
     useUpdateExpensesMutation
} = expensesApi

export const { endpoints: {
     expensesDeposit, getAllExpenses, updateExpenses, deleteExpenses
} } = expensesApi
