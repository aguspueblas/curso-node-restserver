const validaCampos = require("../middlewares/validar-jwt");
const validarJwt = require("../middlewares/validar-roles");
const validaRoles = require("../middlewares/validar-campos");

module.exports = {
  ...validaCampos,
  ...validaRoles,
  ...validarJwt,
};
