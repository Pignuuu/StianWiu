<template>
  <div class="chat-window" v-if="this.username !== ''">
    <div class="chat-messages">
      <div class="message" v-for="(message, index) in this.chat" :key="index">
        <div class="ai" v-if="message.ai">
          <span class="name">{{ model }}:</span>
          <span>
            {{ message.message }}
          </span>
        </div>
        <div class="user" v-else>
          <span class="name">{{ message.username }}:</span>
          <span>
            {{ message.message }}
          </span>
        </div>
      </div>
    </div>
    <div class="input-body">
      <input
        v-if="!this.loading"
        type="text"
        placeholder="Type your message here..."
        maxlength="200"
        v-model="message"
        class="inputField"
      />
      <input
        v-else
        type="text"
        :placeholder="this.loadingText"
        maxlength="200"
        v-model="message"
        disabled
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
  <div v-else>
    <div class="noName">
      <h2>Please enter your username</h2>
    </div>
    <div class="input-body">
      <input
        type="text"
        placeholder="Type your name here..."
        maxlength="200"
        v-model="message"
      />
      <button @click="sendUsername">Send</button>
    </div>
  </div>
</template>

<script>
let liveChat;
export default {
  name: "ChatWindow",
  data() {
    return {
      username: "",
      characterLimit: 200,
      model: "Nora",
      loading: false,
      message: "",
      chat: [],
      liveChat: null,
      loadingText: "Nora is typing...",
    };
  },
  created() {
    // Create a listener for the enter key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && this.message !== "" && !this.loading) {
        if (this.username === "") {
          this.sendUsername();
        } else {
          this.sendMessage();
        }
      }
    });

    // Create a looping loading animation using the . character in loadingText
    setInterval(() => {
      if (this.loading) {
        if (this.loadingText.length === 17) {
          this.loadingText = "Nora is typing";
        } else {
          this.loadingText += ".";
        }
      }
    }, 500);
  },
  methods: {
    async scrollChat() {
      // Auto scroll to bottom
      // Get the chat body
      const chatBody = document.querySelector(".chat-messages");
      // Scroll to the bottom
      chatBody.scrollTop = chatBody.scrollHeight;
    },
    async sendUsername() {
      // Set the username
      this.username = this.message;
      // Clear the message
      this.message = "";

      liveChat = await new WebSocket(
        // "ws://192.168.10.139:8132/api/general/chat"
        "wss://stianwiu.me/api/general/chat"
      );

      liveChat.onmessage = async (event) => {
        let data = JSON.parse(event.data);
        if (data.type === "setup") return;
        // Take number of characters and calculate the time it would take to type. Then wait that amount of time

        await new Promise((resolve) =>
          setTimeout(resolve, data.message.length * 50)
        );

        data.ai = true;
        this.chat.push(data);
        this.loading = false;
        this.scrollChat();
      };

      liveChat.onclose = () => {
        // Push a message to the chat
        this.chat.push({
          username: this.model,
          message: `${this.model} has left the chat.`,
          ai: true,
        });
      };

      liveChat.onopen = () => {
        liveChat.send(
          JSON.stringify({
            type: "setup",
            setup: {
              userName: this.username,
              aiModel: this.model,
            },
          })
        );
      };
    },
    sendMessage() {
      // Check if the message is empty
      if (this.message === "") {
        return;
      }
      // Check if the message is too long
      if (this.message.length > this.characterLimit) {
        return;
      }
      // Send the message

      // Push the message to the chat
      this.chat.push({
        username: this.username,
        message: this.message,
        ai: false,
      });

      liveChat.send(
        JSON.stringify({
          type: "message",
          message: this.message,
        })
      );
      this.loading = true;
      this.message = "";
    },
  },
};
</script>

<style scoped>
.chat-window {
  height: 100%;
  width: 100%;
  background-color: #6a50e9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat-messages {
  height: 85%;
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  background-color: #6a50e9;
}
.message {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0.5rem 10px;
  padding: 5px;
  width: 95%;
}

.ai > .name {
  color: #e5a4f4;
  font-weight: bold;
  margin-right: 0.5rem;
}

.user > .name {
  color: #f5f5f5;
  font-weight: bold;
  margin-right: 0.5rem;
}

.input-body {
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #6a50e9;
  width: 100%;
}

.input-body > input {
  width: 100%;
  height: 100%;
  padding: 10px;
  margin: 10px 20px;
  border: none;
  background-color: #6a50e9;
  border: 3px solid #e5a4f4;
  color: white;
  font-weight: bold;
  /* Fix border that appears when clicking on input */
  outline: transparent;
}

.input-body > button {
  background-color: #6a50e9;
  color: white;
  border: 3px solid #e5a4f4;
  font-size: 1.5rem;
  margin: 0 0.5rem;
}

.input-body > button:hover {
  background-color: #e5a4f4;
  color: #6a50e9;
  cursor: pointer;
}

.input-body > button:active {
  background-color: #6a50e9;
  color: white;
  border: 3px solid #e5a4f4;
  cursor: pointer;
}

.noName {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #6a50e9;
}
</style>
