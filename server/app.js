'use strict';

var express = require('express');
var socketio = require('socket.io');

var app = express();

app.use(express.static('client'));

var server = app.listen(3000, function () {
  console.log('The magic happens on port 3000');
});

var io = socketio(server);

io.on('connection', function (socket) {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', function () {
    console.log('Client disconnected:', socket.id);
  });

  socket.on('sentChatMessage', function (msg) {
    // socket.emit('chatMessageToOne', msg);
    // socket.broadcast.emit('chatMessageToOthers', msg);
    // io.emit('chatMessageToAll', msg});
    io.emit('recievedChatMessage', msg);
  });
});
