const { Router } = require("express");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isValidRole, existEmail } = require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post(
  "/",
  [
    check("correo").custom(existEmail),
    check("nombre", "El nombre es obligatorio.").not().isEmpty(),
    check("password", "La contrasena es obligatoria.").isLength({ min: 6 }),
    check("rol").custom(isValidRole),
    validarCampos,
  ],
  usuariosPost
);

router.delete("/", usuariosDelete);

module.exports = router;
