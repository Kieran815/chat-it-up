// server setup w/ express
var app = require('express')();
var http = require('http').createServer(app);
// add `socket.io` to express; initialize a new instance by passing the http (the HTTP server)
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  // sendFile to `index.html` for hosting/UI
  res.sendFile(__dirname + '/index.html');
});

// listen on the `connection` event for incoming sockets
io.on('connection', (socket) => {
  console.log('user connected');
  // ** when the user types in a message, the server gets it as a chat message event
  socket.on('chat message', (msg) => {
    // `io.emit` sends message to everyone
    io.emit('chat message', msg);
  });
  // socket also fires a special disconnect event
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});