export type User = {
     id: number
     login: string
     password: string
     role: string
     createdAt: Date
     updatedAt: Date
}

export type TypesExpenses = {
     id: number
     name: string
     createdAt: Date
     updatedAt: Date
}

export type CashRegister = {
     id: number
     cash: number
     cashless: number
     totalCash: number
     date: Date
     userId: number
     createdAt: Date
     updatedAt: Date
}

export type Expenses = {
     id: number
     name: string
     date: Date
     sum: number
     img: string
     userId: number
     createdAt: Date
     updatedAt: Date
     typesExpensesId: number
}
