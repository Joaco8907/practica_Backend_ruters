const usuarios = require("../datos/usuarios.js");
const usuarioServicio = require("../service/usuariosService.js")


const obtenerUsuarios = (req, res) => {
    const resultado = usuarioServicio.listarUsuariosServicio ()
  res.json(resultado);
};


const crearUsuario = (req, res) => {
  const nuevoUsuario = req.body;
  const respuesta = usuarioServicio.crearUsuarioServicio(nuevoUsuario)
  if(respuesta === null){
    return res.status(404).
    json({mensaje:"no se pudo crear un nuevo usuario"});
  }
    res.status(201).json(respuesta);
};

const buscarUsuarioPorNombre = (req, res) => {
    const nombre = req.query.nombre
    const resultado = usuarioServicio.buscarUsuarioPorNombreServicio(nombre)
    if (resultado === null) {
        return res.status(404).send("no se encontro su busqueda")
    }
    res.json(resultado)
}


// funciones por id
const obtenerUsuariosPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const resultado = usuarioServicio.buscarUsuarioPorIdServicio(id)
  if (resultado === null) {
    return res.status(404).json({mensaje:"Usuario no encontrado."});
  }
  res.json(resultado);
};

const ActualizarUsuarioPorId = (req, res) => {
    const body = req.body
    const id = req.params.id
    const resultado = usuarioServicio.actualizarUsuarioporIdServicio(id, body)
   if(resultado === "falta nombre" ){
    return res.status(400).send(resultado)
   }
    if(resultado === null){
     return res.status(404).send("no se realizo la actualizacion")
   }
    res.json(resultado)
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
