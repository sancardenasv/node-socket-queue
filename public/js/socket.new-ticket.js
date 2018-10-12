// Start communications
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Connected socket to the server');
});

socket.on('disconnect', function() {
    console.log('Lost connection with server');
});

socket.on('getLastTicket', function(data) {
    console.log('Getting last ticket', data);
    label.text(data.lastTicket);
});

$('button').on('click', function() {
    console.log('CLICK');
    // Push information to socket
    socket.emit('nextTicket', {}, function(nextTicket) {
        console.log('Callback executed; server response: ', nextTicket);

        label.text(nextTicket);
    });
});