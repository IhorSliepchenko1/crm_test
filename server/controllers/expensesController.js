const ApiError = require(`../error/ApiError`);
const { Expenses } = require(`../models/models`);
const { Op } = require(`sequelize`);
const uuid = require(`uuid`);
const path = require(`path`);


class ExpensesController {
     async deposit(req, res, next) {
          try {
               const { name, date, sum, typesExpenseId } = req.body;

               let fileName

               if (req.files) {
                    const { img } = req.files
                    fileName = uuid.v4() + `.jpg`;
                    img.mv(path.resolve(__dirname, `..`, `static`, fileName));
               }


               if (!name || !date || !sum) {
                    return next(ApiError.notFound(`Заполните все поля!`));
               }

               const userId = req.user.id;

               const expenses = await Expenses.create({
                    name,
                    date,
                    sum,
                    typesExpenseId,
                    userId,
                    img: fileName
               });

               return res.status(200).json(expenses);
          } catch (error) {
               next(ApiError.internal(error.message));
          }
     }
     async getAll(req, res, next) {
          let { limit, page, from, to } = req.query;
          try {
               page = page || 1;
               limit = limit || 20;
               let offset = page * limit - limit;
               let data;

               if (!from || !to) {
                    data = await Expenses.findAndCountAll({
                         limit,
                         offset,
                    });
               }

               if (from && to) {
                    data = await Expenses.findAndCountAll({
                         where: {
                              date: {
                                   // YYYY-MM-DD
                                   [Op.between]: [from, to],
                              }, ёё
                         },
                         limit,
                         offset,
                    });
               }

               return res.status(200).json(data);
          } catch (error) {
               next(ApiError.internal(error.message));
          }
     }
     async edit(req, res, next) {

          try {
               const { id } = req.params;
               const { name, date, sum, typesExpenseId } = req.body;

               const { img } = req.files;
               let fileName = uuid.v4() + `.jpg`;
               img.mv(path.resolve(__dirname, `..`, `static`, fileName));

               const userId = req.user.id;

               const expensesUpdate = await Expenses.update(
                    {
                         name: name || undefined,
                         date: date || undefined,
                         sum: sum || undefined,
                         typesExpenseId: typesExpenseId || undefined,
                         userId: userId || undefined,
                         img: fileName || undefined
                    },
                    { where: { id } }
               );

               return res.status(200).json(expensesUpdate);
          } catch (error) {
               next(ApiError.internal(error.message));
          }
     }
     async delete(req, res, next) {
          const { id } = req.params;

          try {
               const delId = await Expenses.findOne({ where: { id } })

               if (!delId) {
                    return next(ApiError.notFound(`id в базе отсутствует или ранее был удалён!`));
               }


               await Expenses.destroy({ where: { id } });
               // await deleteId.destroy();

               return res.status(200).json(`id: ${id} удалён `);
          } catch (error) {
               next(ApiError.internal(error.message));
          }
     }
}
module.exports = new ExpensesController();
