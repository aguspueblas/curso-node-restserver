const Role = require("../models/rol");
const Usuario = require("../models/usuario");

const isValidRole = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol: ${rol} no esta registrado.`);
  }
};

const existEmail = async (correo = "") => {
  const existeEmail = await Usuario.findOne({
    correo,
  });
  if (existeEmail) {
    throw new Error(`El correo: ${correo} ya existe en nuestros registros.`);
  }
};

module.exports = {
  isValidRole,
  existEmail,
};
