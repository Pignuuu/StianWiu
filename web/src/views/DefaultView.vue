<template>
  <div id="desktop">
    <vue-resizable
      @mousedown="this.focusWindow('Description')"
      class="window"
      id="Description"
      v-if="!$store.getters.getWindow('Description').closed"
      :width="this.windowObjects.Description.width"
      :height="this.windowObjects.Description.height"
      :min-width="$store.getters.getWindow('Description').minWidth"
      :min-height="$store.getters.getWindow('Description').minHeight"
      dragSelector=".topbar"
      :top="`${this.windowObjects.Description.top}px`"
      :left="`${this.windowObjects.Description.left}px`"
      :fit-parent="true"
      @resize:end="windowHandler('Description', $event)"
      @drag:end="windowHandler('Description', $event)"
    >
      <TopbarComponent
        windowId="Description"
        :title="$store.getters.getTitle('Description')"
        class="topbar"
      />
      <div contenteditable="true" class="content retro">
        Hi! I'm <span style="color: #e5a4f4">Stian</span>, I'm a student & web
        developer from South-Eastern Norway. I have been actively coding for
        <span v-html="this.codingAge"></span>.
        <br />
        <br />
        I currently only code as a hobby but I'm working towards becoming a full
        time developer in the future.
        <br />
        I have a affinity for helping others as I get enjoyment out of making
        people happy.
      </div>
    </vue-resizable>
    <vue-resizable
      @mousedown="this.focusWindow('SpotifyStatus')"
      class="window"
      id="SpotifyStatus"
      dragSelector=".topbar"
      v-if="!$store.getters.getWindow('SpotifyStatus').closed"
      :width="this.windowObjects.SpotifyStatus.width"
      :height="this.windowObjects.SpotifyStatus.height"
      :min-width="$store.getters.getWindow('SpotifyStatus').minWidth"
      :min-height="$store.getters.getWindow('SpotifyStatus').minHeight"
      :top="`${this.windowObjects.SpotifyStatus.top}px`"
      :left="`${this.windowObjects.SpotifyStatus.left}px`"
      :fit-parent="true"
      @resize:end="windowHandler('SpotifyStatus', $event)"
      @drag:end="windowHandler('SpotifyStatus', $event)"
    >
      <TopbarComponent
        windowId="SpotifyStatus"
        :title="$store.getters.getTitle('SpotifyStatus')"
        class="topbar"
      />
      <div class="content">
        <div class="spotify retro" v-if="this.spotify !== undefined">
          <div class="spotify-info">
            <!-- Make link open in new tab and make sure there are no vulnerabilities -->
            <a
              target="_blank"
              rel="noopener noreferrer"
              :href="`${spotify.external_url}`"
            >
              <img
                class="spotify-img disable-selection"
                :src="spotify.album_art"
              />
            </a>
            <div class="stats">
              <span class="spotify-title">{{ spotify.title }}</span>
              <span class="spotify-artist">{{ spotify.artist }}</span>
              <div id="spotify-progress" class="disable-selection">
                <img
                  @click="this.togglePreview()"
                  title="Listen to preview"
                  v-if="spotify.is_playing"
                  class="disc spinning"
                  src="../assets/icons/Disc.svg"
                />
                <img
                  @click="this.togglePreview()"
                  title="Listen to preview"
                  v-else
                  class="disc"
                  src="../assets/icons/Disc.svg"
                />
                <div class="progress">
                  <ProgressbarComponent
                    id="spotify-progressbar"
                    :value="(spotify.progress / spotify.duration) * 100"
                  />
                </div>
              </div>
              {{ this.spotify.release_date }}
            </div>
          </div>
        </div>
      </div>
    </vue-resizable>
    <vue-resizable
      @mousedown="this.focusWindow('ChatWindow')"
      class="window"
      id="ChatWindow"
      dragSelector=".topbar"
      v-if="!$store.getters.getWindow('ChatWindow').closed"
      :width="this.windowObjects.ChatWindow.width"
      :height="this.windowObjects.ChatWindow.height"
      :min-width="$store.getters.getWindow('ChatWindow').minWidth"
      :min-height="$store.getters.getWindow('ChatWindow').minHeight"
      :top="`${this.windowObjects.ChatWindow.top}px`"
      :left="`${this.windowObjects.ChatWindow.left}px`"
      :fit-parent="true"
      @resize:end="windowHandler('ChatWindow', $event)"
      @drag:end="windowHandler('ChatWindow', $event)"
    >
      <TopbarComponent
        windowId="ChatWindow"
        :title="$store.getters.getTitle('ChatWindow')"
        class="topbar"
      />
      <ChatWindow id="ChatWindow" />
    </vue-resizable>
    <!-- v-for all cursors in this.cursors -->
    <div
      style="top: 0; left: 0"
      v-for="(cursor, index) in this.cursors"
      :key="index"
    >
      <!-- Change positions using cursor.x cursor.y -->
      <img
        src="../assets/icons/cursor.svg"
        id="cursor"
        :style="`top: ${cursor.y}px; left: ${cursor.x}px;`"
        class="disable-selection"
      />
    </div>
    <vue-resizable
      width="100"
      :height="55"
      id="taskbar"
      top="100"
      min-height="55"
    >
      <div id="apps">
        <div
          class="taskbar-item disable-selection"
          title="Reset windows to default"
          @click="this.resetWindows"
          id="resetWindows"
        >
          <img class="icon" src="../assets/icons/Reset.svg" />
        </div>
        <div
          v-for="window in $store.state.windows"
          :key="window.id"
          @click="this.focusWindow(window.id)"
        >
          <div
            @click="this.openWindow(window.id)"
            class="taskbar-item"
            v-if="window.closed"
          >
            <img
              class="icon disable-selection"
              :src="this.getImgUrl(window.id)"
            />
          </div>
          <div
            @click="$store.dispatch('close', window.id)"
            v-else
            class="active taskbar-item-open disable-selection"
          >
            <img class="icon" :src="this.getImgUrl(window.id)" />
          </div>
        </div>
      </div>
      <div id="extra" class="disable-selection">
        <img class="icon" src="../assets/icons/Wifi.svg" />
        <span v-html="this.time"></span>
      </div>
    </vue-resizable>
  </div>
</template>

<script>
import VueResizable from "vue-resizable";
import TopbarComponent from "@/components/TopbarComponent.vue";
import ProgressbarComponent from "@/components/ProgressbarComponent.vue";
import ChatWindow from "@/components/ChatWindow.vue";
export default {
  name: "DefaultView",
  components: {
    TopbarComponent,
    VueResizable,
    ProgressbarComponent,
    ChatWindow,
  },
  data() {
    return {
      codingAge: 0,
      time: 0,
      spotify: undefined,
      windowObjects: localStorage.getItem("windows"),
      cursors: {},
    };
  },
  async created() {
    // Create window positions in local storage if they don't exist.
    if (localStorage.getItem("windows") === null) {
      for (let window in this.$store.state.windows) {
        let id = this.$store.state.windows[window].id;
        let windowDimensions = this.$store.getters.getWindow(id);
        let tempObject = {};

        // Stop the object being called "id" and use it's fucking name
        tempObject[id] = {
          top: windowDimensions.top,
          left: windowDimensions.left,
          width: windowDimensions.width,
          height: windowDimensions.height,
        };

        if (localStorage.getItem("windows") === null) {
          localStorage.setItem("windows", JSON.stringify(tempObject));
        } else {
          let temp = JSON.parse(localStorage.getItem("windows"));
          temp[id] = {
            top: windowDimensions.top,
            left: windowDimensions.left,
            width: windowDimensions.width,
            height: windowDimensions.height,
          };
          localStorage.setItem("windows", JSON.stringify(temp));
        }
      }
    }

    this.windowObjects = JSON.parse(localStorage.getItem("windows"));

    // Set the time
    setInterval(() => {
      const pastDate = new Date("2018-01-07T15:06:54");

      let elapsedTime = new Date() - pastDate;

      let second = Math.floor(elapsedTime / 1000);
      let minute = Math.floor(second / 60);
      let hour = Math.floor(minute / 60);
      let day = Math.floor(hour / 24);
      let month = Math.floor(day / 30);
      let year = Math.floor(month / 12);

      second %= 60;
      minute %= 60;
      hour %= 24;
      day %= 30;
      month %= 12;

      // Set the coding age
      this.codingAge = `<span style="color: #e5a4f4;">${year}</span> years,<span style="color: #e5a4f4;">${month}</span> months,<span style="color: #e5a4f4;">${day}</span> days,<span style="color: #e5a4f4;">${hour}</span> hours,<span style="color: #e5a4f4;">${minute}</span> minutes, <span style="color: #e5a4f4;">${second}</span> seconds`;

      // Set the time
      this.time = `<span style="color: #6a50e9;">${new Date().toLocaleTimeString()}</span>`;
    }, 100);

    // Connect to spotify websocket
    let spotify = new WebSocket(
      // "ws://192.168.10.139:8132/api/spotify/current-track"
      "wss://stianwiu.me/api/spotify/current-track"
    );
    spotify.onmessage = (e) => {
      this.spotify = JSON.parse(e.data);
    };
    spotify.onclose = () => {
      setTimeout(() => {
        spotify = new WebSocket(
          // "ws://192.168.10.139:8132/api/spotify/current-track"
          "wss://stianwiu.me/api/spotify/current-track"
        );
      }, 1000);
    };
    console.log("test");
    // Connect to cursor websocket
    let cursor = new WebSocket(
      // "ws://192.168.10.139:8132/api/general/cursor"
      "wss://stianwiu.me/api/general/cursor"
    );

    cursor.onmessage = async (e) => {
      // The data received will be json encoded, so decode it
      let data = JSON.parse(e.data);
      if (data.type === "disconnected") {
        delete this.cursors[data.id];
        return;
      }
      const clientLeft = data.x; // example value
      const clientTop = data.y; // example value

      // Define the dimensions of the client screen and current screen
      const clientScreenWidth = data.screenWidth; // example value
      const clientScreenHeight = data.screenHeight; // example value
      const currentScreenWidth = window.innerWidth; // example value
      const currentScreenHeight = window.innerHeight; // example value

      // Calculate the scale factor for the width and height
      const widthScaleFactor = currentScreenWidth / clientScreenWidth;
      const heightScaleFactor = currentScreenHeight / clientScreenHeight;

      // Calculate the new position for the object based on the scale factor
      const newLeft = Math.round(clientLeft * widthScaleFactor);
      const newTop = Math.round(clientTop * heightScaleFactor);

      this.cursors[data.id] = {
        x: newLeft - 8,
        y: newTop - 5,
        lastUpdated: new Date(),
      };
    };
    // Create a trigger for when mouse moves
    let reducePings = 0;
    document.addEventListener("mousemove", (e) => {
      if (reducePings !== 1) {
        reducePings++;
        return;
      } else {
        reducePings = 0;
      }
      cursor.send(
        // Send the mouse position to the server, but encode it to reduce the size
        JSON.stringify({
          x: e.clientX,
          y: e.clientY,
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
        })
      );

      // Loop through all cursors and remove the ones that haven't been updated in 7 minutes
      for (let cursor in this.cursors) {
        if (new Date() - this.cursors[cursor].lastUpdated > 1000 * 60 * 7) {
          delete this.cursors[cursor];
        }
      }
    });
  },
  methods: {
    focusWindow(windowId) {
      document
        .querySelectorAll(".window")
        .forEach((window) => window.classList.remove("focused"));
      const window = document.getElementById(windowId);
      if (window === null || window == undefined) return;
      window.classList.add("focused");
    },
    getImgUrl(icon) {
      return require(`@/assets/icons/${icon}.svg`);
    },
    openWindow(windowId) {
      this.$store.dispatch("openWindow", windowId);
    },
    togglePreview() {
      // Audio url is this.spotify.preview_url
      if (this.previewPlaying) {
        // Stop the audio
        const audio = document.getElementById("preview");
        audio.pause();
        audio.remove();
      } else {
        // There is no audio element, create one
        const audio = document.createElement("audio");
        audio.volume = 0.1;
        audio.src = this.spotify.preview_url;
        audio.controls = true;
        audio.autoplay = true;
        audio.id = "preview";
        audio.style.display = "none";
        document.body.appendChild(audio);
        // When the audio is done playing, remove the element
        audio.onended = () => {
          audio.remove();
          this.previewPlaying = false;
        };
      }

      this.previewPlaying = !this.previewPlaying;
    },
    windowHandler(id, event) {
      let windows = localStorage.getItem("windows");
      windows = JSON.parse(windows);

      let window = windows[id];

      window = {
        top: event.top,
        left: event.left,
        width: event.width,
        height: event.height,
      };

      windows[id] = window;

      localStorage.setItem("windows", JSON.stringify(windows));

      this.windowObjects = JSON.parse(localStorage.getItem("windows"));
    },
    async resetWindows() {
      localStorage.removeItem("windows");
      for (let window in this.$store.state.windows) {
        let id = this.$store.state.windows[window].id;
        let windowDimensions = this.$store.getters.getWindow(id);
        let tempObject = {};

        // Stop the object being called "id" and use it's fucking name
        tempObject[id] = {
          top: windowDimensions.top,
          left: windowDimensions.left,
          width: windowDimensions.width,
          height: windowDimensions.height,
        };

        if (localStorage.getItem("windows") === null) {
          localStorage.setItem("windows", JSON.stringify(tempObject));
        } else {
          let temp = JSON.parse(localStorage.getItem("windows"));
          temp[id] = {
            top: windowDimensions.top,
            left: windowDimensions.left,
            width: windowDimensions.width,
            height: windowDimensions.height,
          };
          localStorage.setItem("windows", JSON.stringify(temp));
        }
      }
      window.location.reload();
    },
  },
};
</script>

<style scoped>
#Description .content {
  text-align: start;
  font-size: 20px;
  padding: 10px;

  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  overflow: auto;
  /* Hide scroll bars but still work */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

#desktop > div {
  position: absolute;
}

#desktop {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}

.resizable {
  width: auto;
  height: auto;
}

.content {
  width: 100%;
  height: 100%;

  background-color: #6a50e9;

  /* Remove selection outline */
  outline: none;
}

.window {
  /* Border on left right and bottom */
  border-left: 3px solid #e5a4f4;
  border-right: 3px solid #e5a4f4;
  border-bottom: 3px solid #e5a4f4;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
}

.focused {
  z-index: 999;
}

#taskbar {
  width: 100%;
  height: 55px;
  position: absolute;
  bottom: 0;
  background-color: #e5a4f4;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

#apps {
  margin-top: 5px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  /* height: 100%; */
  width: 100%;
}

#apps > div {
  margin-bottom: 5px;
}

.taskbar-item,
.taskbar-item-open {
  width: 45px;
  height: 45px;
  margin: 0 5px;
  background-color: #6a50e9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.taskbar-item .icon,
.taskbar-item-open .icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.taskbar-item:hover {
  background-color: #5d46cf;
}

.taskbar-item-open {
  background-color: #6950e9af;
}

#extra {
  width: 200px;
  height: 55px;
  margin: 0 5px;
  color: #6a50e9;
  display: flex;
  align-items: center;
  justify-content: center;
}

#extra .icon {
  width: 45px;
  height: 45px;
  margin: 0 5px;
  object-fit: contain;
}

/* Spotify stuff */

#spotify {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  text-align: start;
}
#SpotifyStatus {
  overflow: hidden;
}
.spotify-img {
  width: 100px;

  margin: 10px;
  border: 3px solid #e5a4f4;
}

.spotify-info {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: row;
  text-align: start;
}

.spotify-info .stats {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  text-align: start;

  font-size: 25px;
}

#spotify-progress {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  text-align: start;
}

#spotify-progressbar {
  width: 200px;
  display: flex;
  align-items: center;
  flex-direction: row;
  text-align: start;
}

.disc {
  width: 40px;
  cursor: pointer;
}

.spinning {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

#ChatWindow {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#cursor {
  position: absolute;
  top: 0;
  left: 0;
  width: 27px;
  height: 27px;
  z-index: 9999;
  transition: all 10ms ease-out;

  /* Disable dragging */
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

/* If mobile */
@media screen and (max-width: 600px) {
  #Description .content {
    font-size: 15px;
  }

  .spotify-img {
    width: 70px;
  }

  .spotify-title {
    font-size: 20px;
  }

  #spotify-progressbar {
    width: 120px;
  }

  .disc {
    width: 25px;
  }
}
</style>
