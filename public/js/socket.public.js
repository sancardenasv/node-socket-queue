// Start communications
var socket = io();
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTicket = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorio = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('connect', function() {
    console.log('Connected socket to the server');
});

socket.on('disconnect', function() {
    console.log('Lost connection with server');
});

socket.on('getLastTicket', function(data) {
    console.log('Getting last ticket', data);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    updateHtml(data.last4);
});

function updateHtml(last4T) {
    for (let i = 0; i < last4T.length; i++) {
        lblTicket[i].text(`Ticket ${last4T[i].number}`);
        lblEscritorio[i].text(`Module ${last4T[i].module}`);

    }
}