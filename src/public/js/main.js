console.log("holu esto funciona")

const socket = io()

//generamos una instancia de socket.io del lado del cliente

let usuario
const chatBox = document.getElementById("chatBox")

//utilizamos sweet alert 2 para generar un mensaje de bienvenida

//swal es un objeto global de la libreria y para configurar cada alerta usabamos el metodo "fire"


Swal.fire({
    title:"Identificate",
    input:"text",
    text:"Ingresa un usuario para identificarte en el chat",
    allowOutsideClick: false, 
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre para continuar"
    }
}).then( result => {
    usuario = result.value
})


chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter"){
        if(chatBox.value.trim().length > 0){
            //Trim nos permite sacar los espacios en blanco del principio y el final de un string. Si el mensaje tiene mas de 0 caracteres, lo enviamos al servidor.
            socket.emit("mensaje", {usuario: usuario, mensaje: chatBox.value})
        }
    }
})

//listener de mensajes

socket.on("mensajesLogs", (data) => {
    const messagesLogs = document.getElementById("messagesLogs")

    let mensajes = ""

    data.forEach( mensaje => {
        mensajes += `
            <div class="message">
                <span class="user"> ${mensaje.usuario} </span>
                <div class="text"> ${mensaje.mensaje}</div>
        `
    })
    messagesLogs.innerHTML = mensajes
})
