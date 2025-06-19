const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');

// Initialize app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Message persistence
const MESSAGE_FILE = 'messages.json';
let messages = loadMessages();

// Load previous messages
function loadMessages() {
  try {
    return JSON.parse(fs.readFileSync(MESSAGE_FILE)) || [];
  } catch (err) {
    return [];
  }
}

// Save messages
function saveMessages() {
  fs.writeFileSync(MESSAGE_FILE, JSON.stringify(messages));
}

// Admin namespace
const adminNamespace = io.of('/admin');

// Serve static files
app.use(express.static('public'));

// Handle connections
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Send message history
  socket.emit('messageHistory', messages);
  
  // Handle new messages
  socket.on('chatMessage', (msg) => {
    const messageObj = {
      id: Date.now(),
      text: msg.text,
      user: msg.user,
      room: msg.room || 'general',
      timestamp: new Date().toISOString()
    };
    
    messages.push(messageObj);
    saveMessages();
    
    // Broadcast to room
    io.to(messageObj.room).emit('message', messageObj);
  });
  
  // Handle room changes
  socket.on('joinRoom', (room) => {
    socket.leaveAll();
    socket.join(room);
    const roomMessages = messages.filter(m => m.room === room);
    socket.emit('messageHistory', roomMessages);
  });
  
  // Disconnect handler
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Admin controls
adminNamespace.on('connection', (socket) => {
  socket.on('kickUser', (userId) => {
    io.sockets.sockets.get(userId)?.disconnect();
  });
  
  socket.on('broadcast', (message) => {
    io.emit('adminMessage', message);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
