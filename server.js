var express = require('express');
var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);


/*
Redirigir siempre al chat
 */

app.use(express.static(__dirname+'/public/'));

app.get('*', function(req, res) {
  res.sendFile( __dirname + '/public/index.html');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

//hacer que socket escuche una conexion

io.on('connection', function(socket) {  
    console.log('Un cliente se ha conectado');
    // socket.emit('messages', mensajes);

//que escuche nuevos mensajes
socket.on('new-message', function(mensajes) {  
    // mensajes.push(chat.mensajes);

    io.sockets.emit('messages', mensajes);
    });
});
/** *** *** ***
 *  Configuramos Socket.IO para estar a la escucha de
 *  nuevas conexiones.
//  */
// io.on('connection', function(socket) {
  
//   console.log('Un cliente se ha conectado');
//   socket.emit('messages', elemento);
//   });
 
//   socket.on('disconnect', function() {
//     console.log('User disconnected');
//   });
  
// });



// io.on('connection', function(socket) {  
//   console.log('Alguien se ha conectado con Sockets');
//   socket.emit('messages', messages);

//   socket.on('new-message', function(data) {
//     messages.push(data);

//     io.sockets.emit('messages', messages);
//   });
// });