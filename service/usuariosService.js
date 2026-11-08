const usuariosRepository = require("../repository/usuariosRepository.js");
const usuarios = require("../datos/usuarios.js");

const listarUsuariosServicio = () => {
  const listaUsuarios = usuariosRepository.listarUsuariosRepository();
  listaUsuarios.sort((a, b) => a.id - b.id);
  return listaUsuarios;
};

const crearUsuarioServicio = (nuevoUsuario) => {
  if (
    !nuevoUsuario ||
    typeof nuevoUsuario !== "object" ||
    Array.isArray(nuevoUsuario)
  ) {
    return null;
  }
  if (
    Object.values(nuevoUsuario).some(
      (valor) => valor === null || valor === undefined,
    )
  ) {
    return null;
  }
  if (nuevoUsuario.id !== undefined) {
    return null;
  }
  return usuariosRepository.crearUsuarioRepository(nuevoUsuario);
};

const buscarUsuarioPorNombreServicio = (nombre) => {
  const resultado = usuariosRepository.buscarUsuarioPorNombreRepository(nombre);
  if (resultado === undefined) {
    return null;
  }
  return resultado;
};

//Funciones por id
const buscarUsuarioPorIdServicio = (id) => {
  const resultado = usuariosRepository.buscarUsuarioPorIdRepository(id);
  if (resultado === undefined) {
    return null;
  }
  return resultado;
};

const actualizarUsuarioporIdServicio = (id, body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "datos invalidos";
  }
  const {id:idIgnorado, ...cambios} = body
  const resultado = usuariosRepository.actualizarUsuarioRepository(id,cambios)
  return resultado;
};

const eliminarUsuarioServicio = (id) => {
  const resultado = usuariosRepository.
  eliminarUsuarioRepository(id);
  return resultado
};

module.exports = {
  listarUsuariosServicio,
  buscarUsuarioPorIdServicio,
  crearUsuarioServicio,
  buscarUsuarioPorNombreServicio,
  actualizarUsuarioporIdServicio,
  eliminarUsuarioServicio,
};
