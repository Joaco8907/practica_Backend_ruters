const usuarios = require("../datos/usuarios")

const obtenerUsuarios = (req,res) =>{
    const obtenerUsuarios = (req,res)=>{
        res.json(usuarios)
    }
}

module.exports = {obtenerUsuarios}