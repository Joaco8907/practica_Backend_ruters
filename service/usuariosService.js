const usuarios = require("../datos/usuarios.js");

const listarUsuariosServicio = () => usuarios.sort((a,b)=> a.id - b.id);


const crearUsuarioServicio = (nuevoUsuario) => {
  if (!nuevoUsuario ||!nuevoUsuario.nombre) {
    return null;
  }
  usuarios.push(nuevoUsuario);
  return nuevoUsuario;
};

const buscarUsuarioPorNombreServicio = (nombre) =>{
    const resultado = usuarios.find(busco => busco.nombre === nombre)

    if(resultado === undefined){
        return null
    }
    return resultado
}


//Funciones por id
const buscarUsuarioPorIdServicio = id =>{
    const resultado = usuarios.
    find(usuario => usuario.id === parseInt(id))
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
