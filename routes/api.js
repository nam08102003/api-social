const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const router = Router();

router.post("/auth/login", authController.handleLogin);
router.post("/auth/register", authController.handleRegister);

module.exports = router;
