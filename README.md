# Node.js Real-Time Chat App

## Overview

This project is a real-time chat application built with Node.js, Express, and Socket.IO. It demonstrates the use of Node.js’s event-driven, non-blocking I/O model and showcases how it handles multiple concurrent connections efficiently.

## Features

- Real-time communication using WebSockets
- Lightweight and scalable backend with Node.js
- Simple frontend using HTML, CSS, and JavaScript

## Node.js Scalability & Performance

The chat app leverages:
- **Event-driven architecture** to handle messages and user events.
- **Non-blocking I/O** to support multiple clients simultaneously.
- **Single-threaded event loop** to avoid the overhead of thread management.
- **Socket.IO integration** that complements Node’s asynchronous nature.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the server:
   ```bash
   npm start
   ```

3. Open browser at:
   ```
   http://localhost:3000
   ```

## Files

- `server.js`: Main server file using Express and Socket.IO.
- `public/index.html`: Client-side UI.
- `public/chat.js`: Handles client socket events.
- `public/styles.css`: Basic UI styling.
- `NodeJS_ChatApp_Report.md`: Full written report.
