const express = require("express")
const app = express()
const routerUsuarios = require("./routes/usuariosRouter.js")
const HOSTNAME = "127.0.0.1"
const PORT = 3000


app.use(express.json())

app.use("/api/usuarios", routerUsuarios) 


app.listen(PORT, HOSTNAME, () => {
    console.log(`Servidor corriendo en HTTP://${HOSTNAME}:${PORT}`);
})