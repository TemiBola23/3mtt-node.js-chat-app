
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const dbFile = path.join(__dirname, 'db.json');

let history = {};
try {
  history = JSON.parse(fs.readFileSync(dbFile));
} catch {
  history = {};
}

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  let username = '';
  let room = '';

  socket.on('joinRoom', (data) => {
    username = data.username;
    room = data.room;
    socket.join(room);
    socket.username = username;
    socket.room = room;

    if (history[room]) {
      history[room].forEach(msg => {
        socket.emit('chat message', `${msg.user}: ${msg.message}`);
      });
    }

    io.to(room).emit('chat message', `${username} joined ${room}`);
  });

  socket.on('chat message', (msg) => {
    if (msg.startsWith('/kick') && username === 'admin') {
      const userToKick = msg.split(' ')[1];
      const clients = Array.from(io.sockets.sockets.values());
      clients.forEach((client) => {
        if (client.username === userToKick && client.room === room) {
          client.disconnect();
        }
      });
      io.to(room).emit('chat message', `${userToKick} was kicked by admin`);
      return;
    }

    if (!history[room]) history[room] = [];
    history[room].push({ user: username, message: msg, timestamp: new Date().toISOString() });
    fs.writeFileSync(dbFile, JSON.stringify(history, null, 2));

    io.to(room).emit('chat message', `${username}: ${msg}`);
  });

  socket.on('disconnect', () => {
    io.to(room).emit('chat message', `${username} left ${room}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
