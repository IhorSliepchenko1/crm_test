const Router = require(`express`);
const router = new Router();
const cashRegisterController = require(`../controllers/cashRegisterController`);
const authMiddleware = require(`../middleware/authMiddleware`);
const checkRoleMiddleware = require(`../middleware/checkRoleMiddleware`);

router.post(`/deposit`, authMiddleware, cashRegisterController.deposit);
router.get(`/`, cashRegisterController.getAll);
// +
router.put(`/:id`, authMiddleware, cashRegisterController.edit);
router.delete(`/:id`, cashRegisterController.delete);

module.exports = router;
