// Client-side code
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('Connected to server');
  authenticateUser();
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log(`Received message from server: ${message.content}`);
};

socket.onerror = (error) => {
  console.error(`WebSocket error: ${error}`);
};

const authenticateUser = () => {
  // Prompt the user to enter their username and password
  const username = prompt('Enter your username:');
  const password = prompt('Enter your password:');

  // Send an authentication message to the server
  const message = {
    type: 'auth',
    username,
    password
  };
  socket.send(JSON.stringify(message));
};

const sendMessage = () => {
  const input = document.getElementById('message-input');
  const message = {
    type: 'message',
    content: input.value
  };
  socket.send(JSON.stringify(message));
  input.value = '';
};

// Server-side code
const WebSocketServer = require('ws').Server;
const server = new WebSocketServer({ port: 8080 });

console.log('Server is running');

const users = [
  { username: 'alice', password: 'password123' },
  { username: 'bob', password: 'password456' }
];

server.on('connection', (socket) => {
  console.log('New client connected');

  let authenticated = false;
  let username = null;

  socket.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      if (!authenticated && message.type !== 'auth') {
        throw new Error('User is not authenticated');
      }
      switch (message.type) {
        case 'auth':
          const user = users.find((u) => u.username === message.username && u.password === message.password);
          if (!user) {
            throw new Error('Invalid username or password');
          }
          authenticated = true;
          username = user.username;
          console.log(`User ${username} authenticated`);
          break;
        case 'message':
          console.log(`Received message from user ${username}: ${message.content}`);
          // Broadcast the message to all connected clients
          server.clients.forEach((client) => {
            if (client.readyState === WebSocketServer.OPEN) {
              client.send(data);
            }
          });
          break;
        default:
          throw new Error(`Unknown message type: ${message.type}`);
      }
    } catch (error) {
      console.error(`Error handling message: ${error}`);
      // Send an error message to the client
      const errorMessage = {
        type: 'error',
        message: error.message
      };
      socket.send(JSON.stringify(errorMessage));
    }
  });

  socket.on('close', () => {
    console.log(`Client ${username} disconnected`);
  });
});
