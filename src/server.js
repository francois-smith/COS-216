//libraries
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//setup express and sockets manager
const app = express();
const http = require("http").Server(app);
const io = require('socket.io')(http);

//default login details for wheatley connection
const username = 'u21649988';
const password = 'Faffa0319';
const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

//setup parsers
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set directory to root
let dir = __dirname;
dir = dir.replace("src", "");

//set port to listen to based on arguments
let port = process.argv.slice(2);

//make static library for client files
app.use(express.static(dir + 'client'));

//console log to display port and that setup was successful 
http.listen(port.toLocaleString(), function(){
    console.log('listening on :'+port)
});

//array to hold list of connected users
let users = [];

//set cookie for port on every user
app.get("/", (req, res) => {
    res.cookie(`port_number`,port.toLocaleString(), {httpOnly: false, sameSite: 'none', secure: true});
    res.sendFile(dir, "client/index.html");
});

//when post comes in for login
app.post("/login", (req, res) => {
    const https = require('https');
    
    const data = JSON.stringify({
        type:"login",
        email: req.body.email,
        password: req.body.password,
        return: ["*"]
    });

    var hostName = "wheatley.cs.up.ac.za";
    var path = "/u21649988/api.php";

    const options = {
        hostname: hostName,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
            'Content-Length': Buffer.byteLength(data)
        }
    };

    let returnString;
    const request = https.request(options, (res) => {
        res.on('data', (response) => {
            returnString = response;
            console.log(response.toString());
        });
    });

    request.on('error', (error) => {
        console.log(error);
    });

    request.write(data);
    request.end(data);
});
  
app.get("/logout", (req, res) => {
    // res.clearCookie("username");
    // return res.redirect("/login");
});

//contains functions for user connections
io.sockets.on('connection', function(socket){
    socket.on('adduser', function(name){
        //socket.user = user;
        //users.push(user);
    });

    socket.on('disconnect', function () {
        for(var i=0; i<users.length; i++) {
            if(users[i] == socket.user) {
                users = users.splice(users[i], 1);
            }
        }
    });
});