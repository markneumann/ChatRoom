// require express and path
var express = require("express");
var path = require("path");
// create the express app
var app = express();
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("ChatRoom");
});
// initialize the array of users before starting the server
// function user(name){
//     this.id = name.split(' ').join('_');
//     this.name = name;
// }
//
// // always have one user
// FirstUser = new user("Welcome User");
var existing_users = ["Welcome User"];
console.log(existing_users);

// tell the express app to listen on port 8000
var server = app.listen(8001, function() {
 console.log("listening on port 8001");
});
// our socket listener
var io = require('socket.io').listen(server);
// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function (socket) {
  console.log("WE ARE USING SOCKETS!");
  console.log(socket.id);
  //all the socket code goes in here!
  // If you don't know where this code is supposed to go reread the above info
    socket.on("got_a_new_user", function (data){
        console.log("login clicked");
        console.log(data);
        name = data.input[0].value;
        socket.emit('existing_users', {response: existing_users});
        socket.broadcast.emit("new_user", {request: name});
    });
    socket.on("user_left", function (){
        console.log("user_left");
        console.log(data);
        io.emit('disconnect', {response: data});
    });
});
