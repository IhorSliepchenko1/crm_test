const ApiError = require(`../error/ApiError`);
const { CashRegister, Expenses } = require(`../models/models`);


class Balance {
     async getBalance(req, res, next) {
          try {
               const allCashRegister = await CashRegister.findAll();
               const allExpenses = await Expenses.findAll();

               const totalCash = allCashRegister.map((item) => {
                    return +item.totalCash
               }).reduce((acc, item) => acc + item)

               const totalExpenses = allExpenses.map((item) => {
                    return +item.sum
               }).reduce((acc, item) => acc + item)

               return res.status(200).json({ totalCash, totalExpenses, balance: totalCash - totalExpenses });
          }
          catch (error) {
               next(ApiError.internal(error.message));
          }
     }

}

module.exports = new Balance();
