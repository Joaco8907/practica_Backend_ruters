const express = require("express")
const app = express()
const routerUsuarios = require("./routes/usuariosRouter.js")
const usuarios = require("./datos/usuarios.js")
const HOSTNAME = "127.0.0.1"
const PORT = 3000


app.use(express.json())

app.use("/usuarios", routerUsuarios)

app.get("/", (req, res) => {
    res.json({ "mensaje": "Servidor andando" })
})
app.get("/estado", (req, res) => {
    res.send("El servidor esta andando")
})

app.get("/saludo", (req, res) => {
    res.send("Hola, bienvenido")
})

app.post("/saludo", (req, res) => {
    const nombre = req.body.nombre
    res.json({ mensaje: `hola ${nombre}` })
})

app.get("/despedida", (req, res) => {
    res.send("Gracias por tu visita")
})

app.get("/info", (req, res) => {
    res.json({
        nombre: "ana",
        edad: 2,
        activo: true
    })
})

// app.get("/usuarios", (req, res) => {
//     res.json(usuarios)
// })

app.post("/usuarios", (req, res) => {
    const nuevoUsuario = req.body
    if (!nuevoUsuario || !nuevoUsuario.nombre) {
        return res.status(400).send("ERROR: Falta el nombre del usuario")
    }
    usuarios.push(nuevoUsuario)
    res.json(nuevoUsuario)
})


app.get("/buscar", (req, res) => {
    const loQueBusca = req.query.nombre
    const esta = usuarios.find(busco => busco.nombre === loQueBusca)
    if (esta === undefined) {
        return res.status(404).send("no se encontro su busqueda")
    }
    res.json(esta)
})


app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const resultado = usuarios.find(usuario => usuario.id === id)
    try {
        if (resultado === undefined) {
            return res.status(404).send("Usuario no encontrado.")
        }
        res.json(resultado)
    } catch (error) {
        console.log(error, "Usuario no encontrado");
    }
})

app.delete("/usuarios/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const indice_a_borrar = usuarios.findIndex(usuario => usuario.id === id)
    if(indice_a_borrar === -1){
        return res.status(404).send(`No se encontro el id: ${id}`)
    }
    const borrado= usuarios.splice(indice_a_borrar, 1)
    res.json(borrado)
})

app.put("/Usuarios/:id", (req, res) => {
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
})

app.get("/filtro", (req, res) => {
    const nombre = req.query.nombre
    const ciudad = req.query.ciudad
    res.json({
        nombre: nombre,
        ciudad: ciudad
    })
})



app.listen(PORT, HOSTNAME, () => {
    console.log(`Servidor corriendo en HTTP://${HOSTNAME}:${PORT}`);
})