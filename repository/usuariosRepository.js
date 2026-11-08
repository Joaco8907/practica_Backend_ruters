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

const crearUsuarioRepository = (body) =>{
    
}


module.exports = {listarUsuariosRepository,
                buscarUsuarioPorIdRepository,
                buscarUsuarioPorNombreRepository
                }
