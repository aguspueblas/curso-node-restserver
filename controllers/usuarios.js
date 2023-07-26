const { response, request } = require("express");
const Usuario = require("../models/usuario");

const { encryptPassword } = require("../helpers/db-validators");

const usuariosGet = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query;

  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).limit(limit).skip(offset),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, ...resto } = req.body;

  //TODO:validar contra BD.
  if (password) {
    resto.password = encryptPassword(password);
  }

  const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);
  res.status(200).json({
    usuarioDB,
  });
};

const usuariosPost = async (req, res = response) => {
  //Extraer el body de la peticion.
  const { _id, nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //TODO: Encriptar password
  usuario.password = encryptPassword(password);
  await usuario.save();
  res.status(201).json({
    usuario,
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  console.log(`Iniciando la baja logica del id: ${id}`);
  const usuario = await Usuario.findByIdAndUpdate(id, {
    estado: false,
  });
  console.log(`Se realizo con exito la baja logica del id: ${id}`);
  res.json({
    usuario,
    usuarioAuht: req.usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
