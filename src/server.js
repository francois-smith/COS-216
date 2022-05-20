//get required libraries from node_modules folder
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v1: uuidv1, v4: uuidv4 } = require('uuid');

//setup express and sockets manager
const app = express();
const http = require("http").Server(app);
const io = require('socket.io')(http);

//default login details for wheatley connection
const username = 'u21649988';
const password = 'Faffa0319';
const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

//setup required parsers for handling cookies and POST data
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set port to listen to based on input arguments
let port = process.argv.slice(2);

//create a cookie for every client that connects to allow dynamic ports to be accessible
//put before client static library to allow cookies to be set
app.get("/", (req, res) => {
    res.cookie(`uuid`,uuidv4(), {httpOnly: false, sameSite: 'none', secure: true});
    res.cookie(`port_number`, port.toLocaleString(), {httpOnly: false, sameSite: 'none', secure: true});
    res.sendFile(dir, "client/index.html");
});

//set directiory root relative to server.js file
let dir = __dirname;
dir = dir.replace("src", "");

//make static library for loading od client assets and files
app.use(express.static(dir + 'client'));

//setup port and log that server was setup correctly to desired port
http.listen(port.toLocaleString(), function(){
    console.log('listening on: '+port)
});

//array to hold a array of connected users on client
let users = [];
let userIDs = [];

//when login menu submits a post is sent and caught by the function below
app.post("/login", (req, res) => {
    //setup required header
    const https = require('https');
    
    //populate data to send to wheatley
    const data = JSON.stringify({
        type:"login",
        email: req.body.email,
        password: req.body.password,
        return: ["*"]
    });

    //setup wheatley location and connection path
    var hostName = "wheatley.cs.up.ac.za";
    var path = "/u21649988/api.php";

    //setup post options for POSTing to Wheatley
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

    //run request, always return status 200(asuming Wheatley will recieve request)
    //request is turned into JSON and passed back to client
    const request = https.request(options, (returnData) => {
        returnData.on('data', (response) => {
            res.status(200).json(JSON.parse(response.toString()));
        });
    });

    //if a error occured, log error to server console
    request.on('error', (error) => {
        console.log(error);
    });

    //close request, resulting in response to client
    request.write(data);
    request.end();
});

//get list of articles for a user to display and have the ability to leave comments on
app.post("/get_articles", (req, res) => {
    //setup required header
    const https = require('https');
    
    //populate data to send to wheatley
    const data = JSON.stringify({
        key: "47dee55dbeb7ce9cfff65c1e854d05443a3f432797603f96",
        type:"info",
        return: ["*"],
        limit: 20
    });

    //setup wheatley location and connection path
    var hostName = "wheatley.cs.up.ac.za";
    var path = "/u21649988/api.php";

    //setup post options for POSTing to Wheatley
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

    //run request, always return status 200(asuming Wheatley will recieve request)
    //request is turned into JSON and passed back to client
    const request = https.request(options, (returnData) => {
        returnData.on('data', (response) => {
            res.status(200).json(JSON.parse(response.toString()));
        });
    });

    //if a error occured, log error to server console
    request.on('error', (error) => {
        console.log(error);
    });

    //close request, resulting in response to client
    request.write(data);
    request.end();
});

app.post("/post_message", (req, res) => {
    //setup required header
    const https = require('https');
    
    //populate data to send to wheatley
    const data = JSON.stringify({
        type:"chat",
        message: req.body.message,
        return: ["*"]
    });

    //setup wheatley location and connection path
    var hostName = "wheatley.cs.up.ac.za";
    var path = "/u21649988/api.php";

    //setup post options for POSTing to Wheatley
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

    //run request, always return status 200(asuming Wheatley will recieve request)
    //request is turned into JSON and passed back to client
    const request = https.request(options, (returnData) => {
        returnData.on('data', (response) => {
            res.status(200).json(JSON.parse(response.toString()));
        });
    });

    //if a error occured, log error to server console
    request.on('error', (error) => {
        console.log(error);
    });

    //close request, resulting in response to client
    request.write(data);
    request.end();
});
  
//contains functions for user connections
io.sockets.on('connection', function(socket){
    //function called by each user upon connection
    socket.on('adduser', function(id){
        socket.user = id;
        users.push(id);
        userIDs.push(socket.id);
    });

    //when user diconnects remove them from user array
    socket.on('disconnect', function () {
        for(var i=0; i<users.length; i++) {
            if(users[i] == socket.user) {
                users = users.splice(users[i], 1);
                userIDs = userIDs.splice(userIDs[i], 1);
            }
        }
    });
});

function updateChat() {
    io.sockets.emit('update', chatList);
}

//start pickup of console commands and set encoding
process.stdin.resume();
process.stdin.setEncoding('utf8');

//when enter is pressed in console, consume the text
process.stdin.on('data', function (text) {
    //remove whitespace around the command
    let command = text.trim();

    //if LIST command, display a list of connected users by displaying their ID
    if (command === 'LIST') {
        console.log(users.length+" users currently connected");
        let i = 1;
        for(let user in users){
            console.log("user "+i+": "+users[i-1]);
            i++;
        }
    }

    //if KILL request is called
    if(command.substring(0, 4) === 'KILL') {
        //remove all whitespace including spaces between words
        let noSpace = command.trim().replaceAll(" ", "");

        //remove KILL from request(should leave only user number to delete)
        id = noSpace.substring(4);

        //if the id is not set, then there is no connection to KILL
        if(id != null){
            //check if id is out of bounds of user list
            if(id <= users.length-1){
                //search through connected users for user with passed in ID
                io.sockets.sockets.forEach((socket) => {
                    if(socket.id === userIDs[id]){
                        //if user is found disconnect them and display in console that user was removed
                        socket.disconnect(true);
                        console.log("killed user connection with id: "+id);
                    }
                });
            }
        }       
    }

    //when quit command is called
    if(command.substring(0, 4) === 'QUIT') {
        //emit quit command to all user, this will display a popup informing them that server has closed
        io.sockets.emit('quit');

        //log to console that quit is active
        console.log("server is shutting down, disconnecting all users");

        //loop through all active users and disconnect them
        io.sockets.sockets.forEach((socket) => {
            socket.disconnect(true);
        });

        //clear all references to users and close server
        users = [];
        userIDs = [];
        process.exit(1);
    }
});