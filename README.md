# Node.js Chat Application

A scalable real-time chat application demonstrating Node.js's event-driven architecture and non-blocking I/O capabilities.

## Features
- Multiple chat rooms
- Message persistence
- Admin controls
- Real-time updates via WebSockets
- Scalable architecture

## Setup
1. Install Node.js (v14+)
2. Clone repository
3. Install dependencies:
   ```bash
   npm install express socket.io
   ```
4. Start server:
   ```bash
   node server.js
   ```
5. Access at `http://localhost:3000`

## Performance Testing
To run load tests:
```bash
npm install -g autocannon
autocannon -c 100 -d 30 http://localhost:3000
```

## Architecture
- **Frontend**: HTML/CSS/JavaScript with Socket.IO client
- **Backend**: Node.js with Express and Socket.IO
- **Storage**: JSON file for message persistence

## Admin Access
Visit `http://localhost:3000/admin.html` for admin controls
```
