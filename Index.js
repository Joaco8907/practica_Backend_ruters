const express = require("express")
const app = express()
const routerUsuarios = require("./routes/usuariosRouter.js")
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