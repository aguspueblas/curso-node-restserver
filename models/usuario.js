const { Schema, model } = require("mongoose");
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         nombre:
 *           type: string
 *           description: The auto-generated id of the book
 *         correo:
 *           type: string
 *           description: The title of your book
 *         password:
 *           type: string
 *           description: The book author
 *         rol:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         estado:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio."],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contrasena es obligatoria."],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;

  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
