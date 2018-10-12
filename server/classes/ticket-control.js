const fs = require('fs');

class Ticket {
    constructor(number, module) {
        this.number = number;
        this.module = module;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.ticketList = [];
        this.last4Ticket = [];

        let data = require('../data/data.json');
        console.log('DATA', data);
        if (data.today === this.today) {
            // Keep working
            this.last = data.last;
            this.ticketList = data.ticketList;
            this.last4Ticket = data.last4Ticket
        } else {
            // Restart
            this.restartCounters();
        }

    }

    restartCounters() {
        this.last = 0;
        this.ticketList = [];
        this.last4Ticket = [];
        this.saveFile();
    }

    next() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.ticketList.push(ticket);
        this.saveFile();
        return `Ticket ${this.last}`;
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLast4Tickets() {
        return this.last4Ticket;
    }

    serveTicket(module) {
        if (this.ticketList.length === 0) {
            return 'No tickets to serve';
        }

        let ticketNUmber = this.ticketList[0].number;
        this.ticketList.shift();

        let servingTicket = new Ticket(ticketNUmber, module);
        this.last4Ticket.unshift(servingTicket);
        if (this.last4Ticket.length > 4) {
            this.last4Ticket.splice(-1, 1); // Delete last in this list
        }
        console.log('LAST 4 TICKETS', this.last4Ticket);

        this.saveFile();
        return servingTicket;
    }

    saveFile() {
        let jsonDataString = JSON.stringify({
            last: this.last,
            today: this.today,
            ticketList: this.ticketList,
            last4Ticket: this.last4Ticket
        });
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}


module.exports = {
    TicketControl
}