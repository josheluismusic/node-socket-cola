var label = $('#lblNuevoTicket');
var socket = io();

socket.on('connect', function(){
    console.log('connect');
    
})

socket.on('disconnect', function(){
    console.log('disconnect'); 
})

socket.on('actual', function(ticket){
    label.text(ticket.actual); 
})

$('button').on('click', function () {
   
    socket.emit('siguienteTicket', null, function (ticket) {
        label.text(ticket);
    })

});