const usuarios = require("../datos/usuarios.js")

const listarUsuariosRepository = () => usuarios;

const buscarUsuarioPorIdRepository = (id) =>{
    const usuario = usuarios.find(usuario => usuario.id === parseInt(id))    
    return (usuario)
}

const buscarUsuarioPorNombreRepository = (nombre) =>{
    const usuario = usuarios.find(busco => busco.nombre === nombre)
    return usuario;
}

const crearUsuarioRepository = 
(nuevoUsuario) =>{
    const idAsignado = nuevoUsuario.id || usuarios.length +1
    const usuario = {id:idAsignado, ...nuevoUsuario}

    usuarios.push(usuario)
    return usuario
}


module.exports = {listarUsuariosRepository,
                buscarUsuarioPorIdRepository,
                buscarUsuarioPorNombreRepository,
                crearUsuarioRepository
                }
