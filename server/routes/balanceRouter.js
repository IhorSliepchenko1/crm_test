const Router = require(`express`);
const router = new Router();
const balanceController = require(`../controllers/balanceController`);

router.get(`/`, balanceController.getBalance);

module.exports = router;