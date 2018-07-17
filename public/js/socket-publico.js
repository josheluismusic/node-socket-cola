var socket = io();

socket.on('connect', function () {
    console.log('connect');

})

socket.on('disconnect', function () {
    console.log('disconnect');
})

socket.on('actual', function (ticket) {
    actualizaHTML(ticket);
})

socket.on('ultimos4', function (ticket) {
    
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    actualizaHTML(ticket);
})


function actualizaHTML(ticket) {
    if (ticket.ultimosCuatro.length > 0) {

        for (let index = 0; index <= 4; index++) {

            var item = ticket.ultimosCuatro[index];
            var lblTicket = '#lblTicket' + (index + 1);
            var lblEscritorio = '#lblEscritorio' + (index + 1);

            $(lblTicket).text('Ticket ' + item.numero);
            $(lblEscritorio).text('Escritorio ' + item.escritorio);
        }
    }
}