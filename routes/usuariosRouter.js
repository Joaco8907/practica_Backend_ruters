const express = require("express");
const router = express.Router();
const usuariosController = require("../controller/usuariosController.js")


router.get("/prueba", (req, res) => {
  res.json({ mensaje: "Router Funcionando" });
});

router.get("/", usuariosController.obtenerUsuarios);
router.post("/", usuariosController.crearUsuario);
router.get("/buscar", usuariosController.buscarUsuarioPorNombre);

//metodos por Id.
router.get("/:id", usuariosController.obtenerUsuariosPorId);
router.patch("/:id", usuariosController.actualizarUsuarioPorId);
router.put("/:id",usuariosController.actualizarUsuarioPorId);
router.delete("/:id", usuariosController.eliminarUsuarioPorId);    

module.exports = router;
