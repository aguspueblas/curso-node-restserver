const { response, request } = require("express");
const Usuario = require("../models/usuario");

const bcryptjs = require("bcryptjs");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No name", apiKey } = req.query;

  res.json({
    msg: "Get API controller",
    query: q,
    nombre: nombre,
    apiKey: apiKey,
  });
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "Put API controller",
    id: id,
  });
};

const usuariosPost = async (req, res = response) => {
  //Extraer el body de la peticion.
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //TODO: Encriptar password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  await usuario.save();
  res.json({
    msg: "Post API controller",
    usuario,
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "Delete API controller",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
