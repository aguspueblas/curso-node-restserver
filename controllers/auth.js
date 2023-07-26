const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJwt } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;
  try {
    //:Verificar si el email existe.
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: `Usuario / Password no son correctas.`,
      });
    }
    // Si el usuario esta activo.
    if (!usuario.estado) {
      return res.status(400).json({
        msg: `Estado del usuario: de baja`,
      });
    }
    // Verificar la contrasena
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: `Contrasenia incorrecta`,
      });
    }
    const token = await generarJwt(usuario.id);
    res.json({
      msg: "Login ok",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el admin.",
    });
  }
};

module.exports = {
  login,
};
