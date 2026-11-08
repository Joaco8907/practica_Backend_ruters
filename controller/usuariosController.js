const usuarioServicio = require("../service/usuariosService.js");

const obtenerUsuarios = (req, res) => {
  const resultado = usuarioServicio.listarUsuariosServicio();
  res.json(resultado);
};

const crearUsuario = (req, res) => {
  const nuevoUsuario = req.body;
  const respuesta = usuarioServicio.crearUsuarioServicio(nuevoUsuario);
  if (respuesta === null) {
    return res.status(400).json({
      mensaje: "Datos del usuario incompletos",
    });
  }
  res.status(201).json(respuesta);
};

const buscarUsuarioPorNombre = (req, res) => {
  const nombre = req.query.nombre;
  const resultado = usuarioServicio.buscarUsuarioPorNombreServicio(nombre);
  if (resultado === null) {
    return res.status(404).send("no se encontro su busqueda");
  }
  res.json(resultado);
};

// funciones por id
const obtenerUsuariosPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const resultado = usuarioServicio.buscarUsuarioPorIdServicio(id);
  if (resultado === null) {
    return res.status(404).json({ mensaje: "Usuario no encontrado." });
  }
  res.json(resultado);
};

const actualizarUsuarioPorId = (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const resultado = usuarioServicio.actualizarUsuarioporIdServicio(id, body);
  if (resultado === "datos invalidos") {
    return res.status(400).json({ mensaje: "Datos invalidos" });
  }
  if (resultado === null) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }
  res.json(resultado);
};

const eliminarUsuarioPorId = (req, res) => {
  const respuesta = usuarioServicio.eliminarUsuarioServicio(req.params.id);
  if (respuesta === null) {
    return res
      .status(404)
      .send(`No encontre el id ${req.params.id} que me mandaste`);
  }
  res.status(200).json(respuesta);
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuariosPorId,
  crearUsuario,
  buscarUsuarioPorNombre,
  actualizarUsuarioPorId,
  eliminarUsuarioPorId,
};
