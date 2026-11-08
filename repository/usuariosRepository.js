const usuarios = require("../datos/usuarios.js")

const listarUsuariosRepository = () => usuarios;

const buscarUsuarioPorIdRepository = (id) =>{
    const usuario = usuarios.find(usuario => usuario.id === parseInt(id))    
    return (usuario)
}




module.exports = {listarUsuariosRepository,
                buscarUsuarioPorIdRepository
                }
