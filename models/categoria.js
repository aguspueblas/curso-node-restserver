const { Schema, model } = require("mongoose");

const categoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio."],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: false,
  },
});

module.exports = model("Categoria", categoriaSchema);
