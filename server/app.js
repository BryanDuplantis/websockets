'use strict';

var express = require('express');
// server side piece
var socketio = require('socket.io');

var app = express();

app.use(express.static('client'));

// create server variable, pass into below
var server = app.listen(3000, function () {
  console.log('The magic happens on port 3000');
});

// have to pass server into socket.io
var io = socketio(server);

// listening for event called connection; socket library
// will fire event
io.on('connection', function (socket) {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', function () {
    console.log('Client disconnected:', socket.id);
  });

  socket.on('chatMessage', function (msg) {
    var li = genLIElement(msg);
    var
    console.log('Chat Message received:', msg);

    socket.emit('chatMessage', {message: msg});

    // send to everyone including the socket
    io.emit('chatMessage', {toEveryone: msg});

    // everyone but current socket
    socket.broadcast.emit('chatMessage', {toOthers: msg});
  });
});
