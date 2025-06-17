# Chat App Architecture and Scalability Report

## Architecture

- **Backend**: Express + Socket.IO
- **Frontend**: HTML + Vanilla JS
- **Data Storage**: Simple `db.json` file for chat history

## Node.js Principles Applied
- **Non-blocking I/O**: Real-time message broadcasting
- **Scalability**: Modular room system, could scale with Redis/DB
- **Real-world Use**: Basis for scalable messaging apps

## Features
- Persistent message storage
- Chat rooms
- Admin tools (kick user)

## Performance Testing
Simulated load with 100 socket connections – no crash, low memory impact
