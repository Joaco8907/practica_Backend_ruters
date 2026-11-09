const BD = require("../datos/usuarios.js")

const listarUsuariosRepository = () => BD;

const buscarUsuarioPorIdRepository = (id) =>{
    const usuario = BD.find(usuario => usuario.id === parseInt(id))    
    return (usuario)
}

const buscarUsuarioPorNombreRepository = (nombre) =>{
    const usuario = BD.find(busco => busco.nombre === nombre)
    return usuario;
}

const crearUsuarioRepository = 
(nuevoUsuario) =>{
    const idAsignado = nuevoUsuario.id || BD.length +1
    const usuario = {id:idAsignado, ...nuevoUsuario}

    BD.push(usuario)
    return usuario
}

const actualizarUsuarioRepository = (id, cambios) => {
    const indiceActualizar = BD.findIndex(
    (usuario) => usuario.id === parseInt(id));
    if (indiceActualizar === -1) {
    return null;
    }
    BD[indiceActualizar] = {...BD[indiceActualizar], ...cambios}
    const resultado = BD[indiceActualizar]
    return resultado;
}

const eliminarUsuarioRepository = (id)=>{
    const indiceBorrar = BD.findIndex
    (usuario =>usuario.id === parseInt(id));
    if(indiceBorrar === -1){
        return null
    }
    const usuarioBorrado = BD.splice(indiceBorrar, 1)
    return usuarioBorrado
}




module.exports = {listarUsuariosRepository,
                buscarUsuarioPorIdRepository,
                buscarUsuarioPorNombreRepository,
                crearUsuarioRepository,
                actualizarUsuarioRepository,
                eliminarUsuarioRepository
                }
