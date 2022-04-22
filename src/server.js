const app = require("express")();
const http = require("http").Server(app);
const io = require('socket.io')(http);
const api_url = "u21649988:Faffa0319!@wheatley.cs.up.ac.za/u21649988/api.php";
var port = process.argv.slice(2);

http.listen(port.toLocaleString(), function(){
    console.log('listening on :'+port)
});

app.get('/', function(req, res){
    let dir = __dirname;
    dir = dir.replace("src", "");
    res.sendFile(dir +'index.html');
});

let users = [];
io.sockets.on('connection', function(socket){
    socket.on('adduser', function(user){
        socket.user = user;
        users.push(user);
        updateClients();
    });

    socket.on('disconnect', function () {
        for(var i=0; i<users.length; i++) {
            if(users[i] == socket.user) {
                users = users.splice(users[i], 1);
            }
        }
        updateClients(); 
    });

    function updateClients() {
        io.sockets.emit('update', users);
    }
});