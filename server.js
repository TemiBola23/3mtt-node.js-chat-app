const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
let chatHistory = JSON.parse(fs.readFileSync("db.json", "utf8") || "{}");

app.use(express.static("public"));

io.on("connection", (socket) => {
  let room = "general";
  socket.join(room);

  socket.on("joinRoom", (newRoom) => {
    socket.leave(room);
    room = newRoom;
    socket.join(room);
    socket.emit("chatHistory", chatHistory[room] || []);
  });

  socket.emit("chatHistory", chatHistory[room] || []);

  socket.on("chatMessage", (msg) => {
    if (!chatHistory[room]) chatHistory[room] = [];
    const formattedMsg = { user: socket.id, text: msg, timestamp: new Date() };

    // Admin command
    if (msg.startsWith("/kick")) {
      const targetId = msg.split(" ")[1];
      io.to(targetId).emit("kicked");
      io.sockets.sockets.get(targetId)?.disconnect();
      return;
    }

    chatHistory[room].push(formattedMsg);
    fs.writeFileSync("db.json", JSON.stringify(chatHistory, null, 2));
    io.to(room).emit("chatMessage", formattedMsg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
