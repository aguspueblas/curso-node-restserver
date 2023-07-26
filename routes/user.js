const { Router } = require("express");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");

const { check } = require("express-validator");
const {
  isValidRole,
  existEmail,
  findUserById,
} = require("../helpers/db-validators");

const {
  validarCampos,
  isAdminRole,
  tieneRole,
  validarJWT,
} = require("../middlewares");

const path = "/usuario";

const router = Router();

/**
 * @swagger
 * /api/usuario:
 *  get:
 *    summary: Retorna lista de usuarios.
 *    description: Obtener los usuarios.
 *    responses:
 *      200:
 *        description: Respuesta exitosa
 */
router.get(`${path}/`, usuariosGet);

/**
 * @swagger
 * /api/usuario/:id:
 *  put:
 *    summary: Modifica un usuario existente.
 *    description: Obtener los usuarios.
 *    responses:
 *      200:
 *        description: Respuesta exitosa
 */
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

/**
 * @swagger
 * /api/usuario:
 *  post:
 *    summary: Crea un usuario existente.
 *    description: Obtener los usuarios.
 *    responses:
 *      200:
 *        description: Respuesta exitosa
 */
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

/**
 * @swagger
 * /api/usuario:
 *  delete:
 *    summary: Crea un usuario existente.
 *    description: Obtener los usuarios.
 *    responses:
 *      200:
 *        description: Respuesta exitosa
 */
router.delete(
  `${path}/:id`,
  [
    validarJWT,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(findUserById),
  ],
  validarCampos,
  usuariosDelete
);

module.exports = router;
