import express from "express"
import displayRoutes from 'express-routemap'
import exphbs from "express-handlebars"
import { Server } from "socket.io"

const app = express()
const PUERTO = 8080

//Midleware
app.use(express.static("./src/public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Configuramos Handlebars
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")


//Rutas
app.get("/", (req,res) =>{
    res.render("index")
})

//Listen
const httpServer = app.listen(PUERTO, ()=>{
    console.log(`escuchando en el puerto de mar del plata:${PUERTO}`)
    displayRoutes(app)

})

//websockets
const io = new Server(httpServer)


//generamos un array donde guardaremos los mensajes
let mensajes = []

io.on("connection", (socket)=>{
    console.log("Un cliente se conecto")
    
    socket.on("mensaje", (data) => {
        mensajes.push(data)
        //aca estoy guardando la informacion que me nevia el cliente (usuario + mensaje) y lo voy a almacenar en un array


        //emitimos mensaje al cliente con todo el array de datos:
        io.emit("mensajesLogs", mensajes)
        console.log(mensajes)
    })
})
