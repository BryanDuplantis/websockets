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
socketio(server);
