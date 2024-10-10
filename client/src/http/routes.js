import { URL } from "./url";

const AppRouter = {
     registration: `${URL}/user/registration`,
     login: `${URL}/user/login`,
     auth: `${URL}/user/auth`,

     cashRegisterDeposit: `${URL}/cash-register/deposit`,
     cashRegister: `${URL}/cash-register/`,

     expensesDeposit: `${URL}/expenses/deposit`,
     expenses: `${URL}/expenses/`,

     typeExpenses: `${URL}/type-expenses/`,
}


export default AppRouter;