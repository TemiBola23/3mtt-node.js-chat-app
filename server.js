const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Load or initialize chat history
let chatHistory = {};
try {
  chatHistory = JSON.parse(fs.readFileSync("db.json", "utf8") || "{}");
} catch {
  chatHistory = {};
}

// Serve static files
app.use(express.static("public"));

io.on("connection", (socket) => {
  let room = "general";
  socket.join(room);
  socket.emit("chatHistory", chatHistory[room] || []);

  // Handle room changes
  socket.on("joinRoom", (newRoom) => {
    socket.leave(room);
    room = newRoom;
    socket.join(room);
    socket.emit("chatHistory", chatHistory[room] || []);
  });

  // Handle incoming messages and admin commands
  socket.on("chatMessage", (msg) => {
    if (msg.startsWith("/kick")) {
      const targetId = msg.split(" ")[1];
      io.to(targetId).emit("kicked");
      io.sockets.sockets.get(targetId)?.disconnect();
      return;
    }

    const formattedMsg = {
      user: socket.id,
      text: msg,
      timestamp: new Date().toISOString(),
    };

    if (!chatHistory[room]) chatHistory[room] = [];
    chatHistory[room].push(formattedMsg);
    fs.writeFileSync("db.json", JSON.stringify(chatHistory, null, 2));
    io.to(room).emit("chatMessage", formattedMsg);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
