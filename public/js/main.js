var socket = io.connect('http://localhost:3000', { 'forceNew': true });
 
//escuchando mensajes del socket
//TODO debes analizar si es necesario enviar todos los mensajes
// o solo enviar el ultimo mensaje
socket.on('messages', function(data) {  
    render(data);
});
function render(data) {  
    console.log(data);
//aqui esta el error, al momento de pintar las conversaciones guardadas al acceder a mensajes

    var html = '<div class="conversacion"><p class="text">' +data.contenido+ '</p><p class="hora">'+ data.fecha+ '</p></div>'
        //}
 //aqui hay otro error, tiene que imprimirlo en un div para otros cuando se abre el mismo puerto en otra ventana
    document.getElementById('messages').innerHTML = html;
}
 
//añadiendo mensajes al socket
function addMessage(e) {  
    var mensajes = {
        contenido : wspText,
        fecha : mostrartiempo
    };
    socket.emit('new-message', mensajes);
    return false;
}
 
var mostrarHora = function(){
var fechas = new Date();
 
 var minutos=fechas.getMinutes()
    if(minutos<10)
        minutos="0"+minutos
 var horas=fechas.getHours()
 
    if(horas<10)
        horas="0"+horas
 
 var time = horas+":"+minutos;
 
    return time;
}
 
$(document).keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') {
          wsp();
    }
});
 
function getInputValue() {
    var inputBox = document.getElementById("text");
    return inputBox.value;
}
 
function wsp() {
    var inputBoxValue = getInputValue();
    if (inputBoxValue !== "") {
        doWsp(inputBoxValue);
        clean();
    }
}
 
function doWsp(wspText) {
 
    var mostrartiempo = mostrarHora();
    var elemento = document.createElement("div");
    var porponer = document.getElementById("messages");
    //Crear el elemento
    elemento.className = "box-green";
 
    elemento.innerHTML = '<p class="text2">'+ wspText + '</p>'+ '<p class="hora2">'+ mostrartiempo + '</p>';
 
    porponer.appendChild(elemento);
 
    var ex = porponer.lastChild;
 
    //nose que hacia esto x otro lado x d
    var mensajes = {
        contenido : wspText,
        fecha : mostrartiempo
    };
    socket.emit('new-message', mensajes);
}
 
function clean() {
    var inputBox = document.getElementById("text");
    inputBox.value = "";
    inputBox.focus();
}
 
// var socket = io.connect('http://localhost:3000', { 'forceNew': true });
 
// socket.on('messages', function(data) {  
//     console.log(data);
// });
 
// function render(data, elemento) {  
//     var html = data.map(function(elem, index){
//         return(elemento)
//     }).join(" ");
 
//     document.getElementById('messages').innerHTML = html;
// }
 
// socket.on('messages', function(data) {  
//     render(data);
// });
 
$("#search").on("keyup", buscar);
 
function buscar(){
  var tarjetas = $(".box-contactos");
  var texto    = $("#search").val();
  texto        = texto.toLowerCase();
  tarjetas.show();
  for(var i=0; i< tarjetas.size(); i++){
    var contenido = tarjetas.eq(i).text();
    contenido     = contenido.toLowerCase();
    var index     = contenido.indexOf(texto);
    if(index == -1){
      tarjetas.eq(i).hide();
    }  
  }
}
 
$(document).ready(function(){
        boxwhite(chat)
});
 
 
 
function boxwhite(conversacion_lista){
    conversacion_lista.forEach(function (conversacion){
        var cantidad_mensajes = conversacion.mensajes.length;
    var div=document.createElement("div")
        div.setAttribute("class","box-contactos")
        div.setAttribute("onclick","mostrar(this)")
        div.innerHTML="<img class='circulo-contactos' src='image/"+conversacion.imagen+"'/><h4 class='names-contactos'>"+conversacion.nombre+"</h4><p class ='contactos'>"+conversacion.mensajes[cantidad_mensajes-1].contenido+"</p><p class='time'>"+conversacion.mensajes[cantidad_mensajes-1].fecha+"</p>"
        $(".box-white").append(div)
    });
}
 
// function mostrar(chat){
   
//  var nuevo_sitio = document.getElementsByClassName('cabecera')
//      nuevo_sitio.innerHTML = '<h4 class="'+ chat.tipo + '">'+
//      chat.nombre + '</h4><p class="nombres">'+ chat.integrantes + '</p>'
// }


function mostrar(contacto){
    var image=$(contacto).find("img").attr("src")
    var img='<img class = "img-circulo" src='+image+'>'
    var nombre=$($(contacto)).children("h4.names-contactos").text()
    var hora=$($(contacto)).children(".time").text()
    $(".fondo-whatsapp").html("")
    $(".cabecera").children(".row").children(".col-sm-1").html(img)
    $(".cabecera").children(".row").children(".col-sm-8").children(".nombre_cabecera").html(nombre)

    for(var indice=0;indice<chat.length;indice++)
        if(nombre==chat[indice].nombre){
            if(chat[indice].tipo=="grupo")
                $(".cabecera").children(".row").children(".col-sm-8").children(".hora_cabecera").html(chat[indice].integrantes)
            else
                $(".cabecera").children(".row").children(".col-sm-8").children(".hora_cabecera").html(hora)
        }
}