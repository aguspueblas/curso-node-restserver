const Role = require("../models/rol");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
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

const encryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
};

const findUserById = async (id) => {
  const user = await Usuario.findById(id);
  if (!user) {
    throw new Error(`El usuario con id: ${id} no existe.`);
  }
};

module.exports = {
  isValidRole,
  existEmail,
  encryptPassword,
  findUserById,
};
