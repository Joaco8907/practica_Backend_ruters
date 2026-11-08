const usuariosRepository = require("../repository/usuariosRepository.js")
const usuarios = require ("../datos/usuarios.js")



const listarUsuariosServicio = () =>{
  const listaUsuarios = usuariosRepository.listarUsuariosRepository()
  listaUsuarios.sort((a,b)=> a.id - b.id); 
  return listaUsuarios 
} 

const crearUsuarioServicio = (nuevoUsuario) => {
    if (!nuevoUsuario || typeof nuevoUsuario !== "object" || Array.isArray(nuevoUsuario)) {
        return null
    }
    if (Object.values(nuevoUsuario).some(valor => valor === null || valor === undefined)) {
        return null
    }
    return usuariosRepository.crearUsuarioRepository(nuevoUsuario)
}

const buscarUsuarioPorNombreServicio = (nombre) =>{
    const resultado = usuariosRepository.buscarUsuarioPorNombreRepository(nombre)
    if(resultado === undefined){
        return null
    }
    return resultado
}


//Funciones por id
const buscarUsuarioPorIdServicio = id =>{
    const resultado = usuariosRepository.buscarUsuarioPorIdRepository(id)
    if(resultado === undefined){
        return null
    }
    return resultado
}

const actualizarUsuarioporIdServicio = (id, body) => {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return "datos invalidos"
    }
    const { id: idIgnorado, ...cambios } = body
    const indiceActualizar = usuarios.findIndex(
        usuario => usuario.id === parseInt(id)
    )
    if (indiceActualizar === -1) {
        return null
    }
    usuarios[indiceActualizar] = {...usuarios[indiceActualizar], ...cambios}
    return usuarios[indiceActualizar]
}

const eliminarUsuarioServicio = (id)=>{
  const indiceBorrar = usuarios.findIndex(usuario=>usuario.id === parseInt(id))
  if( indiceBorrar === -1){
    return null
  }
  const usuarioBorrado = usuarios.splice(indiceBorrar, 1)
  return usuarioBorrado
}


module.exports = {
  listarUsuariosServicio,
  buscarUsuarioPorIdServicio,
  crearUsuarioServicio,
  buscarUsuarioPorNombreServicio,
  actualizarUsuarioporIdServicio,
  eliminarUsuarioServicio
};
