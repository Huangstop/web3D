var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var online = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/HW05_login.html');
});

app.get('/go', function(req, res){
  res.sendFile(__dirname + '/HW05_chat.html');
});

io.on('connection', function(socket){  // connection is same as connect
  socket.on('login', function(name){
	++online;
    io.emit('login', name, online);
  });
  
  socket.on('disconnect', function () {
	--online;
	io.sockets.emit('disconnect', online);
  });
  
  socket.on('chat message', function(msg, name){
    io.emit('chat message', msg, name);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});