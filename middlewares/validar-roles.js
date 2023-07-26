const { request } = require("express");

const isAdminRole = (req = request, res, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol antes del token.",
    });
  }

  const { rol, nombre } = req.usuario;
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador.`,
    });
  }
  next();
};

const tieneRole = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol antes del token.",
      });
    }
    if (!roles.includes(req.usuario.rol)) {
      res.status(401).json({
        msg: `El servicio requiere uno de estos roles: ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  tieneRole,
};
