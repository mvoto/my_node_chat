var express     = require('express');
var app         = express();
var server      = require('http').createServer(app);
var io          = require('socket.io').listen(server);
var redisClient = require('./redis.js');

// New client connection
io.on('connection', function(client){
  console.log('Client connected...');
  // Client joining chat
  client.on('join', function(name){
    client.nickname = name;
    console.log(client.nickname + ' joined !');
  });

  // Listens to messages and broadcasts to everyone
  client.on('messages', function(data){
    var nickname = client.nickname;
    client.broadcast.emit('messages', nickname + ': ' + data);
    client.emit('messages', nickname + ': ' + data);
    console.log(client.nickname + ' sent: ' + data);
  });
});

// Serves static files from `public`
app.use(express.static(__dirname + '/public'));

// Handles all routes to the webserver
app.get('/*', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

server.listen(8080);
