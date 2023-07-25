const { response, request } = require("express");
const { Categoria } = require("../models");

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe.`,
    });
  }
  //Generar data a guardar.
  const data = {
    nombre,
  };
  console.log(data);
  const newCategoria = new Categoria(data);
  await newCategoria.save();

  res.status(201).json(newCategoria);
};

module.exports = {
  crearCategoria,
};
