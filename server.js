const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 2001;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const router = require('./router');

app.use(router);
app.use(cors());

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('new user has joined');

  socket.on('join', (msg) => {
    io.emit('testmsg', msg);
  });
  socket.on('msgSent', (value) => {
    console.log(value);
    // let sentBy = 'me';
    socket.broadcast.emit('msgbyme', value);
  });

  socket.on('disconnection', () => {
    console.log('a user has disconnected');
  });
});
