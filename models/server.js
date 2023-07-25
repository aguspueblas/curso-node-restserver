const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const yaml = require("js-yaml");
const path = require("path");
const fs = require("fs");

const mainRoutes = require("../routes/index");

class server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.mainRoutes =
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
    this.app.use("/api", mainRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto: " + this.port);
    });
  }
}

module.exports = server;
