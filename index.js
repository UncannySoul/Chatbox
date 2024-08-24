const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize express and create HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages and broadcast them to all clients
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
