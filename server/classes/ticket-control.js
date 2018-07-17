const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        } else {
            this.reiniciarConeto();
        }
    }

    reiniciarConeto() {
        this.ultimo = 0;
        this.grabarArchivo();
        this.tickets = [];
        this.ultimosCuatro = [];

    }

    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`
    }

    getUltimoCuatro() {
        return this.ultimosCuatro;
    }


    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets'
        }

        let numeroTicket = this.tickets[0].numero;

        this.tickets.shift();

        let currentTicket = new Ticket(numeroTicket, escritorio);

        this.ultimosCuatro.unshift(currentTicket);

        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1, 1) //borra el ultimo
        }

        console.log('ultimos 4', this.ultimosCuatro);

        this.grabarArchivo();

        return currentTicket;

    }

    grabarArchivo() {
        let jsonData = JSON.stringify({
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        });

        fs.writeFileSync('./server/data/data.json', jsonData);
    }
}

module.exports = {
    TicketControl
}