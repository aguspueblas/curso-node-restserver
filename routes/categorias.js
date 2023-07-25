const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { crearCategoria } = require("../controllers/categorias");

const router = Router();

/**
 * {{url}}/api/categorias
 */
router.get("/categorias", (req, res) => {
  res.send({ msg: "OK" });
});

router.get("/categorias/:id", (req, res) => {
  res.send({ msg: "OK" });
});

router.post(
  "/categorias",
  [check("nombre", "El nombre es obligatorio.").not().isEmpty(), validarCampos],
  crearCategoria
);

router.put("/categorias/:id", (req, res) => {
  res.send({ msg: "OK" });
});

router.delete("/categorias/:id", (req, res) => {
  res.send({ msg: "OK" });
});

module.exports = router;
