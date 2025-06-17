
# 🧠 Scalable Real-Time Chat Application

This is a Node.js-based real-time chat application built with Express and Socket.IO. It supports persistent message history, chat rooms, admin commands, and basic scalability features.

---

## 🚀 Features

- ✅ Real-time messaging using Socket.IO  
- ✅ Multiple chat rooms support  
- ✅ Persistent chat history stored in `db.json`  
- ✅ Admin command `/kick <socketId>` to remove users  
- ✅ Performance tested with `autocannon`  
- ✅ Modular and scalable architecture  
- ✅ Easy setup with minimal dependencies  

---

## 🏗️ Technologies Used

- **Node.js** – JavaScript runtime  
- **Express** – Web server  
- **Socket.IO** – Real-time WebSocket communication  
- **fs (File System)** – Local file-based database  
- **autocannon** – HTTP benchmarking tool  

---

## 📁 Project Structure

/project-root │ ├── public/               # Client-side assets │   ├── index.html │   └── client.js │ ├── db.json               # Persistent message history ├── server.js             # Main Node.js server ├── README.md             # Project overview (this file) ├── REPORT.md             # Technical report & performance analysis ├── package.json          # App metadata and dependencies └── package-lock.json

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js v14+ installed  
- Git (optional)

### Steps

```bash
# 1. Clone the repository or extract the zip
git clone https://github.com/Temibola23/chat-app.git
cd chat-app

# 2. Install dependencies
npm install

# 3. Start the server
npm start

Visit http://localhost:3000 in your browser.


---

💬 How to Use

Joining Rooms

1. Open the app


2. Select or enter a room name


3. Start chatting! Each room has its own message log



Admin Commands (Type in chat input)

/kick <socketId> – Remove a user from the chat


> Example: /kick Nhx08yZiQ4aPxi2TAAAD



Message History

Chat history is saved in db.json under each room’s name.

Messages are automatically loaded when you rejoin the room.



---

📈 Performance Testing

Load testing was done using autocannon:

npx autocannon -c 100 -d 10 http://localhost:3000

~1400 requests/second

Latency < 30ms

Stable memory usage


See full test metrics in REPORT.md


---

📌 Limitations

No user authentication

JSON file storage not ideal for production or distributed environments

Admin features are basic (no ban/warn list yet)



---

🛠 Future Improvements

Switch to Redis or MongoDB for scalable persistence

Add JWT-based user authentication

Expand admin dashboard (warn/ban)

Add Docker support for containerization



---

👨‍💻 Author & Course Info

Temitope Bolatito
Course: Introduction to Backend Development (COMP 101), Temibola Technology College
Instructor: Dr Jane Doe
GitHub: https://github.com/Temibola23


---

📄 License

This project is for academic and demonstration purposes.
