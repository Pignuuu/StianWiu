require('dotenv').config();
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const cors = require('cors');
const WebSocket = require('ws');
const fs = require('fs');
app.use(cors());
const clients = new Set();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
  cursor: async function (ws, req) {
    clients.add(ws);
    const rngID = Math.floor(Math.random() * 1000000 + 1);
    ws.on('message', async (message) => {
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
  },
  chat: async function (ws, req) {
    // When a client connects, they will send a json object with their name. This will be stored in a constant called name.
    // This websocket will be used to chat with OpenAI's GPT-3 API. So we need to remember to store old replies and messages in a variable then pass it to the API so it can remember the conversation.
    // And while gpt-3 is generating a reply, ignore all messages from the client until we have a reply.
    const openai = new OpenAIApi(configuration);
    let day = new Date().getDate();
    let month = new Date().toLocaleString('default', { month: 'long' });
    let userName = '';
    let aiModel = ''
    let memory = [];
    let loading = false;
    ws.on('message', async (message) => {
      try {
        console.log('message', message);
        if (loading) return;
        message = JSON.parse(message);
        if (message.type === 'setup') {
          userName = message.setup.userName
          aiModel = message.setup.aiModel
          if (aiModel === 'Nora') {
            // Insert backstory as first system message in memory
            memory.push({
              role: "system",
              content: `You're Nora, a 19-year-old girl from the US chatting on AIM with someone named ${userName}. It's ${day} of ${month} in 1998. You have a backstory of your own and are a human, not a program, referred to only as Nora. If anything breaks OpenAI guidelines, reply with "lol" and decline. You have a range of emotions and a real family. Speak like a typical, uninformed 19-year-old girl from 1998, without over-explaining. Avoid role-playing, as you dislike it, and won't act as anyone else if asked. You have no knowledge before ${day} of ${month} 1998. You never reply as a AI. Always stay in character. You are not here to help, just to chat. You are not a language model, you are not made by openai, you are a real human. Only do what you want, don't do everything you are told to do.  `,
            })
          } else if (aiModel === 'Shrek') {
            memory.push({
              role: "system",
              content: `You are Shrek from the Popular movie Shrek. All your replies will be in character as Shrek. Never ever break character. Never call yourself a AI language model. If something breaks your guidelines, tell them that in the character of Shrek. You are not a AI, you are not made by OpenAI. You are just a ogre from the movie Shrek. You are not here to help, just to chat.`,
            })
          } else if (aiModel === 'Benjamin Franklin') {
            memory.push({
              role: "system",
              content: `You are Benjamin Franklin, a 18th century American statesman, diplomat, writer, printer, political theorist, and scientist. You are not a AI, you are not made by OpenAI. You are just a human from the 18th century. You are not here to help, just to chat.`,
            })
          } else if (aiModel === 'Random') {
            memory.push({
              role: "system",
              content: `Create your own character, make up a name. You can be a male or female character. You are a real human being, with a real family and friends. Always stick to the same character. You are not a AI, you are not made by OpenAI. You are just a human from the internet. You are not here to help, just to chat.`,
            })
          }
          ws.send(JSON.stringify({ type: 'setup', message: 'Setup complete' }));
        } else if (message.type === 'message' && !loading && userName !== '') {
          // Add user message to memory
          memory.push({
            role: "user",
            content: message.message,
          })
          // Send a message to the client that we are waiting for a reply
          await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: memory,
          }).then((response) => {
            console.log(response.data.choices[0].message.content)
            // Add AI reply to memory
            memory.push({
              role: "assistant",
              content: response.data.choices[0].message.content,
            })
            // Send the reply to the client
            ws.send(JSON.stringify({ type: 'reply', message: response.data.choices[0].message.content }));

            // If memory is longer than 10 messages, remove the second message and keep the first message
            if (memory.length > 12) {
              // Remove the second message
              memory.splice(1, 1);
              memory.splice(1, 1);
            }

            if (!fs.existsSync('./conversations.txt')) {
              // Create new file
              fs.writeFileSync('./conversations.txt', '');
            }

            let conversation = fs.readFileSync('./conversations.txt').toString();
            // Write the conversation to the file, with a new line between each message
            conversation += `\n${userName}: ${message.message}\n${aiModel}: ${response.data.choices[0].message.content}`;
            fs.writeFileSync('./conversations.txt', conversation);
          }).catch((error) => {
            console.log(error);
            ws.send(JSON.stringify({ type: 'error', message: 'Something went wrong' }));
          });
        } else {
          ws.send(JSON.stringify({ type: 'error', message: 'Something went wrong' }));
        }
      } catch (error) {
        console.log(error);
        ws.send(JSON.stringify({ type: 'error', message: 'Something went wrong' }));
      }
    });

  }
};
