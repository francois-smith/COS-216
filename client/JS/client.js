const uuid = ('; '+document.cookie).split(`; uuid=`).pop().split(';')[0];
console.log(uuid);
const socket = io('http://localhost:'+port);

socket.on('connect', function(){
    socket.emit('adduser', uuid);
});

socket.on('update', function (chatList){
    

});
