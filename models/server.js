const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

class server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    //Conectar base de datos
    this.connectDataBase();
    //Middlewares
    this.middlewares();
    //rutas de mi app
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Parseo y lectura del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));
  }

  async connectDataBase() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto: " + this.port);
    });
  }
}

module.exports = server;
