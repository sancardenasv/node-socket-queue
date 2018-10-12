// Start communications
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('The module is required');

}

var module = searchParams.get('escritorio');
console.log('MODULE', module);
$('h1').text(`Module ${module}`);

var label = $('small');
$('button').on('click', function() {
    socket.emit('serveTicket', { module: module }, function(resp) {
        console.log(resp);
        if (resp.number) {
            label.text(`Ticket ${resp.number}`);
        } else {
            label.text(resp);
            alert(resp);
        }
    });
});