const Router = require(`express`);
const router = new Router();

const userRoutes = require(`./userRoutes.js`);
const cashRegisterRouter = require(`./cashRegisterRouter.js`);

router.use(`/user`, userRoutes);
router.use(`/cash-register`, cashRegisterRouter);

module.exports = router;
