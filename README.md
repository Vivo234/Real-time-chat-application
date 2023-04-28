# Real-time-chat-application
This is a chat application that allows users to send and receive messages in real time

Simple Chat Application using WebSocket and Authentication
This is a simple chat application that uses WebSockets for real-time communication between clients and a server. The application requires users to authenticate themselves before they can send messages.

Technologies Used
JavaScript
WebSocket API
Running the Application
Clone the repository or download the code.
Install dependencies using npm or yarn:

npm install
or

yarn install
Start the server:

node server.js
Open index.html in a web browser to connect to the chat server.
User Authentication
When a client connects to the server, the server prompts the user to enter their username and password. The server then checks if the user credentials are valid and authenticates the user if they are.

Sending Messages
After a user is authenticated, they can send messages to the server by typing in the message input field and pressing enter. The message is then sent to the server, which broadcasts it to all connected clients.

Error Handling
The server performs error handling to prevent crashes and ensure that the application behaves as expected. If an error occurs, the server sends an error message to the client.

Disclaimer
This is just a basic implementation and should not be used as-is in production environments. It is recommended that you use a more robust authentication system and implement additional security measures to protect user data.

