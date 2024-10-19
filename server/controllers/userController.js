const ApiError = require(`../error/ApiError`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const { User } = require(`../models/models`);

const generateJwt = (id, login, role) => {
  return jwt.sign({ id, login, role }, process.env.SECRET_KEY, {
    expiresIn: `24h`,
  });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { login, password, role } = req.body;

      if (!login || !password) {
        return next(ApiError.notFound(`Логин и пароль обязательны!`));
      }


      if (password.length < 6) {
        return next(ApiError.badRequest(`Пароль должен быть не менее 6 символов`));
      }

      const candidate = await User.findOne({ where: { login } });

      if (candidate) {
        return next(ApiError.badRequest(`${login} уже существует`));
      }

      const hashPassword = await bcrypt.hash(password, 12);
      const user = await User.create({ login, password: hashPassword, role });
      const token = generateJwt(user.id, user.login, user.role);

      return res.json({ token });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async login(req, res, next) {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        return next(ApiError.notFound(`Логин и пароль обязательны!`));
      }

      const user = await User.findOne({ where: { login } });

      if (!user) {
        return next(ApiError.badRequest(`${login} не найден`));
      }

      const comparePassword = bcrypt.compareSync(password, user.password);

      if (!comparePassword) {
        return next(ApiError.unauthorized(`Указан неверный пароль`));
      }

      const token = generateJwt(user.id, user.login, user.role);

      return res.json({ token });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.login, req.user.role);

      return res.json({ token });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

module.exports = new UserController();
