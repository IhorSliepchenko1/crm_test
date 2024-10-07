const Router = require(`express`);
const router = new Router();
const cashRegisterController = require(`../controllers/cashRegisterController`);
const authMiddleware = require(`../middleware/authMiddleware`);

router.post(`/deposit`, authMiddleware, cashRegisterController.deposit);
router.get(`/`, cashRegisterController.getAll);
router.put(`/:id`, cashRegisterController.edit);
router.delete(`/:id`, cashRegisterController.delete);

module.exports = router;
