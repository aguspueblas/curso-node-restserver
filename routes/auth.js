const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/auth/login",
  [
    check("correo", "El correo es obligatorio.").isEmail(),
    check("password", "El contrasenia es obligatorio.").not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
