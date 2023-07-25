const { Router } = require("express");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  isValidRole,
  existEmail,
  findUserById,
} = require("../helpers/db-validators");

const path = "/usuario";

const router = Router();

/**
 * @swagger
 * /api/usuarios:
 *  get:
 *    summary: Retorna lista de usuarios.
 *    description: Obtener los usuarios.
 *    responses:
 *      200:
 *        description: Respuesta exitosa
 */
router.get(`${path}/`, usuariosGet);

router.put(
  `${path}/:id`,
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(findUserById),
    check("rol").custom(isValidRole),
  ],

  validarCampos,
  usuariosPut
);

router.post(
  `${path}/`,
  [
    check("correo").custom(existEmail),
    check("nombre", "El nombre es obligatorio.").not().isEmpty(),
    check("password", "La contrasena es obligatoria.").isLength({ min: 6 }),
    check("rol").custom(isValidRole),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  `${path}/:id`,
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(findUserById),
  ],
  validarCampos,
  usuariosDelete
);

module.exports = router;
