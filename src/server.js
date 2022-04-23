//libraries
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const http = require("http").Server(app);
const io = require('socket.io')(http);

//Url to api and allow server to use post requests
const api_url = "u21649988:Faffa0319!@wheatley.cs.up.ac.za/u21649988/api.php";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//setup parsers
app.use(cookieParser());
app.use(bodyParser.json());
app.set('view engine', 'ejs');

//set directory to root
let dir = __dirname;
dir = dir.replace("src", "");

//set port to listen to based on arguments
let port = process.argv.slice(2);

app.get("/", (req, res) => {
    let username = req.cookies.username;
    res.cookie(`port_number`,port.toLocaleString(), {httpOnly: false});
    res.sendFile(dir, "client/index.html");
});
  
app.post("/login", (req, res) => {
    console.log("dwawdaw");
    res.send("success");
    // let bad_auth = req.query.msg ? true : false;
  
    // if (bad_auth) {
    //     return res.render("login", {
    //         error: "Invalid username or password",
    //     });
    // } 
    // else{
    //   // else just render the login
    //   return res.render("login");
    // }
});
  
app.post("/process_login", (req, res) => {
    let { username, password } = req.body;
  
    let userdetails = {
      username: "Bob",
      password: "123456",
    };

    if (username === userdetails["username"] && password === userdetails["password"]) {
        res.cookie("username", username);
        return res.redirect("/welcome");
    }
    else {
        return res.redirect("/login?msg=fail");
    }
});

app.get("/logout", (req, res) => {
    res.clearCookie("username");
    return res.redirect("/login");
});

//make static library for client files
app.use(express.static(dir + 'client'));

//console log to display port and that setup was successful 
http.listen(port.toLocaleString(), function(){
    console.log('listening on :'+port)
});

//array to hold list of connected users
let users = [];

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