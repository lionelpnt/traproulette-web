'use strict';

// Express server for prebuilt react app

const express = require('express');
const app = express();
const Server = require('http').Server;
const server = new Server(app);

app.use('/', express.static(__dirname + '/../react/build'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/../react/build/index.html');
});
server.listen(3000);
console.log('Traproulette front is running')
