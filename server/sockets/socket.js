const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.emit('actual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimoCuatro()
    })

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    })

    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio) {
            return callback({
                err: false,
                message: 'El escritorio es necesario' 
            })
        }

        let currentTicket = ticketControl.atenderTicket(data.escritorio);
        
        callback(currentTicket);

        client.broadcast.emit('ultimos4', {
            actual: ticketControl.getUltimoTicket(),
            ultimosCuatro: ticketControl.getUltimoCuatro()
        })

    })

});