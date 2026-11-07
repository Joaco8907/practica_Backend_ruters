const usuarios = require("../datos/usuarios.js");
const usuarioServicio = require("../service/usuariosService.js")


const obtenerUsuarios = (req, res) => {
    const resultado = usuarioServicio.listarUsuarios ()
  res.json(resultado);
};


const crearUsuario = (req, res) => {
  const nuevoUsuario = req.body;
  if (!nuevoUsuario || !nuevoUsuario.nombre) {
    return res.status(400).send("ERROR: Falta el nombre del usuario");
  }
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
};

const buscarUsuarioPorNombre = (req, res) => {
    const loQueBusca = req.query.nombre
    const esta = usuarios.find(busco => busco.nombre === loQueBusca)
    if (esta === undefined) {
        return res.status(404).send("no se encontro su busqueda")
    }
    res.json(esta)
}




// funciones por id
const obtenerUsuariosPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const resultado = usuarios.find((usuario) => usuario.id === id);
  if (resultado === undefined) {
    return res.status(404).send("Usuario no encontrado.");
  }
  res.json(resultado);
};

const ActualizarUsuarioPorId = (req, res) => {
    const nombre_a_actualizar = req.body.nombre
    const id = parseInt(req.params.id)
    const indice_a_actualizar = usuarios.findIndex(usuario => usuario.id === id)
    if (indice_a_actualizar === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" })
    }
    if (!nombre_a_actualizar) {
        return res.status(400).json({ mensaje: "Falta el nombre" })
    }
    usuarios[indice_a_actualizar].nombre = nombre_a_actualizar
    res.json(usuarios[indice_a_actualizar])
}

const eliminarUsuarioPorId = (req,res)=>{
    const id_pasa_usuario = parseInt(req.params.id)
    const posicion_borrar = usuarios.findIndex(usuario=>usuario.id===id_pasa_usuario)
    if(posicion_borrar===-1){
        return res.status(404).send(`No encontre el id ${id_pasa_usuario} que me mandaste`)
    }
    const usuario_borrado = usuarios.splice(posicion_borrar, 1)
    res.status(200).json({mensaje:"Borrado aceptado", usuario_borrado})
}



module.exports = { obtenerUsuarios,
                obtenerUsuariosPorId, 
                crearUsuario, 
                buscarUsuarioPorNombre,
                ActualizarUsuarioPorId,
                eliminarUsuarioPorId
                };
