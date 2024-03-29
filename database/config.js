const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_HOST);
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la conexion a la base de datos.");
  }
};

module.exports = { dbConnection };
