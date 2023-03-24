require('dotenv').config();
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const cors = require('cors');
const WebSocket = require('ws');
app.use(cors());
const clients = new Set();

module.exports = {
  cursor: async function (ws, req) {
    clients.add(ws);
    const rngID = Math.floor(Math.random() * 1000000 + 1);
    ws.on('message', async (message) => {
      console.log('message', message);
      clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          message = JSON.parse(message);
          message.id = rngID;
          message = JSON.stringify(message);
          client.send(message);
        }
      });
    });

    ws.on('close', () => {
      // Remove the client from the clients set
      clients.delete(ws);

      // Send a message to all clients that the client has disconnected
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ id: rngID, type: 'disconnected' }));
        }
      });
    });
  }
};
