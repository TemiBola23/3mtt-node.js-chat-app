# Node.js Scalable Chat App

This is a real-time chat application built with Node.js, Socket.IO, and Express. It supports:
- Multiple chat rooms
- Persistent chat history (`db.json`)
- Admin command to kick users

## Setup

```bash
npm install
node server.js
```

Visit `http://localhost:3000` in your browser.

## Features
- Switchable chat rooms
- Messages persist via `db.json`
- Admin feature: `/kick <socketId>` removes a user

## File Structure
- `server.js` – Node server with Socket.IO and persistence
- `public/` – Frontend files
- `db.json` – JSON-based chat history storage
