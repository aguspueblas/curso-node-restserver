const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "Error: No hay token en la request.",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);

    const usuarioAuth = await Usuario.findById(uid);
    if (!usuarioAuth?.estado) {
      console.error(`Usuario ${usuarioAuth.nombre} esta inactivo.`);
      return res.status(401).json({
        msg: `Token no valido`,
      });
    }

    req.usuario = usuarioAuth;
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token invalido.",
    });
  }
  console.log(token);
  next();
};

module.exports = { validarJWT };
