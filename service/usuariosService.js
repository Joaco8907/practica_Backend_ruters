const usuarios = require("../datos/usuarios.js");

const listarUsuarios = () => usuarios;

const crearUsuario = (nuevoUsuario) => {
  if (!nuevoUsuario ||!nuevoUsuario.nombre) {
    return null;
  }
  usuarios.push(nuevoUsuario);
  return nuevoUsuario;
};

const buscarUsuarioPorNombre = (nombre) =>{
    const resultado = usuarios.find(busco => busco.nombre === nombre)
    
    if(resultado === undefined){
        return null
    }
    return resultado
}



//Funciones por id
const buscarUsuarioPorId = id =>{
    const resultado = usuarios.
    find(usuario => usuario.id === parseInt(id))
    if(resultado === undefined){
        return null
    }
    return resultado
}


module.exports = {
  listarUsuarios,
  buscarUsuarioPorId,
  crearUsuario,
  buscarUsuarioPorNombre
};
