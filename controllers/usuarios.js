const { response, request } = require('express')


const usuariosGet = (req = request,res = response) => {

    const {q, nombre = 'No name', apiKey} = req.query;

  res.json({
    msg: 'Get API controller',
    query: q,
    nombre: nombre,
    apiKey: apiKey
  })
}

const usuariosPut = (req,res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'Put API controller',
        id: id
    })
}

const usuariosPost = (req,res = response) => {
    //Extraer el body de la peticion.
    const {nombre, edad} = req.body;
    res.json({
        msg: 'Post API controller',
        nombre: nombre,
        edad: edad
    })
}

const usuariosDelete = (req,res = response) => {
    res.json({
        msg: 'Delete API controller'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}
