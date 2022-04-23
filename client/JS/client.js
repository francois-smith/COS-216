const socket = io();

socket.on('connect', function(){
    socket.emit('adduser');
});