const ApiError = require(`../error/ApiError`);
const { CashRegister } = require(`../models/models`);
const { Op } = require(`sequelize`);

class CashRegisterController {
  async deposit(req, res, next) {
    const { cash, cashless, date } = req.body;

    try {
      if (!cash || !cashless || !date) {
        return next(ApiError.notFound(`Заполните все поля!`));
      }

      const checkDate = await CashRegister.findOne({ where: { date } });

      if (checkDate) {
        return next(ApiError.badRequest(`Сегодня уже вносили кассу`));
      }

      const today = new Date(Date.now()).toLocaleDateString();

      if (date > today) {
        return next(
          ApiError.badRequest(`Кассу можно внести только за сегодня`)
        );
      }

      const userId = req.user.id;
      const totalCash = cash + (cashless - (cashless / 100) * 1.3);

      const cashRegister = await CashRegister.create({
        cash,
        cashless,
        date,
        totalCash,
        userId,
      });

      return res.status(200).json(cashRegister);
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
        data = await CashRegister.findAndCountAll({
          limit,
          offset,
        });
      }

      if (from && to) {
        data = await CashRegister.findAndCountAll({
          where: {
            date: {
              // YYYY-MM-DD
              [Op.between]: [from, to],
            },
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
    const { id } = req.params;
    const { cash, cashless, date } = req.body;

    try {
      const totalCash = cash + (cashless - (cashless / 100) * 1.3);

      const cashRegisterUpdate = await CashRegister.update(
        {
          cash: cash || undefined,
          cashless: cashless || undefined,
          date: date || undefined,
          totalCash: totalCash || undefined,
        },
        { where: { id } }
      );

      return res.status(200).json(cashRegisterUpdate);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
  async delete(req, res, next) {
    const { id } = req.params;
    console.log(id);

    try {
      await CashRegister.destroy({ where: { id } });
      // await deleteId.destroy();

      return res.status(200).json(`id: ${id} удалён `);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}
module.exports = new CashRegisterController();
