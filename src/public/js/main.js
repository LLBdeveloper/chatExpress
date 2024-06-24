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

//Función para mostrar la alerta de identificación
const identificarUsuario = () => {
    Swal.fire({
        title: "IDENTIFICATE",
        input: "text",
        text: "Ingresa un usuario para identificarte en el chat",
        allowOutsideClick: false,
        background: '#2c2c2c', // Fondo gris oscuro
        color: '#f4f4f9', // Texto blanco
        confirmButtonColor: '#ff00ff', // Botón de confirmación fucsia
        inputValidator: (value) => {
            return !value && "Necesitas escribir un nombre para continuar";
        }
    }).then(result => {
        if (result.value === "gboy" || result.value === "lautarin") {
            usuario = result.value;
            // Remover la clase blurred del contenedor principal
            // document.querySelector('.borroso').classList.remove('blurred'); 


        } else {
            Swal.fire({
                icon: 'error',
                title: 'Usuario incorrecto',
                text: 'El nombre de usuario no es válido. Inténtalo de nuevo.',
                background: '#2c2c2c',
                color: '#f4f4f9',
                confirmButtonColor: '#ff00ff',
            }).then(() => {
                identificarUsuario(); // Volver a mostrar la alerta de identificación
            });
        }
    });
};

// Llamar a la función para mostrar la alerta de identificación
identificarUsuario();



chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter"){
        if(chatBox.value.trim().length > 0){
            //Trim nos permite sacar los espacios en blanco del principio y el final de un string. Si el mensaje tiene mas de 0 caracteres, lo enviamos al servidor.
            socket.emit("mensaje", {usuario: usuario, mensaje: chatBox.value})
            chatBox.value = ""
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
                <span class = "user"> ${mensaje.usuario} </span>
                <div class = "text"> ${mensaje.mensaje}</div>
            </div>
        `
    })
    messagesLogs.innerHTML = mensajes
})




// const socket = io()

// //generamos una instancia de socket.io del lado del cliente

// let usuario
// const chatBox = document.getElementById("chatBox")

// //utilizamos sweet alert 2 para generar un mensaje de bienvenida
// //swal es un objeto global de la libreria y para configurar cada alerta usabamos el metodo "fire"
// Swal.fire({
//     title: "IDENTIFICATE",
//     input: "text",
//     text: "Ingresa un usuario para identificarte en el chat",
//     allowOutsideClick: false,
//     background: '#2c2c2c', // Fondo gris oscuro
//     color: '#f4f4f9', // Texto blanco
//     confirmButtonColor: '#ff00ff', // Botón de confirmación fucsia
//     inputValidator: (value) => {
//         return !value && "Necesitas escribir un nombre para continuar";
//     }
// }).then(result => {
//     usuario = result.value;
// });

// // Función para mostrar la alerta de identificación
// // const identificarUsuario = () => {
// //     Swal.fire({
// //         title: "IDENTIFICATE",
// //         input: "text",
// //         text: "Ingresa un usuario para identificarte en el chat",
// //         allowOutsideClick: false,
// //         background: '#2c2c2c', // Fondo gris oscuro
// //         color: '#f4f4f9', // Texto blanco
// //         confirmButtonColor: '#ff00ff', // Botón de confirmación fucsia
// //         inputValidator: (value) => {
// //             return !value && "Necesitas escribir un nombre para continuar";
// //         }
// //     }).then(result => {
// //         if (result.value === "gboy" || result.value === "lautarin") {
// //             usuario = result.value;
// //             // Remover la clase blurred del contenedor principal
// //             document.querySelector('.borroso').classList.remove('blurred'); 


// //         } else {
// //             Swal.fire({
// //                 icon: 'error',
// //                 title: 'Usuario incorrecto',
// //                 text: 'El nombre de usuario no es válido. Inténtalo de nuevo.',
// //                 background: '#2c2c2c',
// //                 color: '#f4f4f9',
// //                 confirmButtonColor: '#ff00ff',
// //             }).then(() => {
// //                 identificarUsuario(); // Volver a mostrar la alerta de identificación
// //             });
// //         }
// //     });
// // };

// // // Llamar a la función para mostrar la alerta de identificación
// // identificarUsuario();


// chatBox.addEventListener("keyup", (event) => {
//     if(event.key === "Enter"){
//         if(chatBox.value.trim().length > 0){
//             //Trim nos permite sacar los espacios en blanco del principio y el final de un string. Si el mensaje tiene mas de 0 caracteres, lo enviamos al servidor.
//             socket.emit("mensaje", {usuario: usuario, mensaje: chatBox.value})
//             chatBox.value = ""
//         }
//     }
// })

// // // Listener de mensajes previos
// // socket.on("mensajesPrevios", (data) => {
// //     const messagesLogs = document.getElementById("messagesLogs");
// //     let mensajes = "";

// //     data.forEach(mensaje => {
// //         mensajes += `
// //             <div class="message">
// //                 <span class="user">${mensaje.usuario}</span>
// //                 <div class="text">${mensaje.mensaje}</div>
// //             </div>
// //         `;
// //     });
// //     messagesLogs.innerHTML = mensajes;
// // });

// //listener nuevos de mensajes
// socket.on("mensajesLogs", (data) => {
//     const messagesLogs = document.getElementById("messagesLogs")

//     let mensajes = ""

//     data.forEach( mensaje => {
//         mensajes += `
//             <div class="message">
//                 <span class = "user"> ${mensaje.usuario} </span>
//                 <div class = "text"> ${mensaje.mensaje}</div>
//             </div>
//         `
//     })
//     messagesLogs.innerHTML = mensajes
// })
