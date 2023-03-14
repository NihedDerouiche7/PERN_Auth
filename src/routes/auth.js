const { Router } = require("express");
const {
  getUsers,
  register,
  login,
  protected,
  logout,
} = require("../controllers/auth");
const {
  validationMiddleware,
} = require("../middlewares/validation-middleware");
const { registerValidation, loginValidation } = require("../validators/auth");
const { userAuth } = require("../middlewares/auth_middlware");
const router = Router();

router.get("/getUsers", getUsers);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/protected", userAuth, protected);
router.get("/logout", userAuth, logout);
module.exports = router;
