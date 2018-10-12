const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();


io.on('connection', (client) => {
    console.log('User conected to server');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });

    // Escuchar el cliente
    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.next();
        console.log('NEXT TICKET REQUESTED', next);

        callback(next);
    });

    // Send last ticket
    client.emit('getLastTicket', {
        'lastTicket': ticketControl.getLastTicket(),
        'last4': ticketControl.getLast4Tickets()
    }, () => {});

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on('serveTicket', (data, callback) => {
        console.log('SERVING TICKET');
        if (!data.module) {
            return callback({
                err: true,
                msg: 'module is required in request'
            });
        }

        let ticketToServe = ticketControl.serveTicket(data.module);

        client.broadcast.emit('getLastTicket', {
            'lastTicket': ticketControl.getLastTicket(),
            'last4': ticketControl.getLast4Tickets()
        });

        return callback(ticketToServe);
    });

});