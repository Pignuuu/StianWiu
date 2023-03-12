<template>
  <div id="desktop">
    <vue-resizable
      @mousedown="this.focusWindow('Description')"
      class="window"
      id="Description"
      v-if="!$store.getters.getWindow('Description').closed"
      :width="$store.getters.getWindow('Description').width"
      :height="$store.getters.getWindow('Description').height"
      :min-width="$store.getters.getWindow('Description').minWidth"
      :min-height="$store.getters.getWindow('Description').minHeight"
      dragSelector=".topbar"
      :top="`${$store.getters.getWindow('Description').top}px`"
      :left="`${$store.getters.getWindow('Description').left}%`"
      :fit="true"
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
      :width="$store.getters.getWindow('SpotifyStatus').width"
      :height="$store.getters.getWindow('SpotifyStatus').height"
      :min-width="$store.getters.getWindow('SpotifyStatus').minWidth"
      :min-height="$store.getters.getWindow('SpotifyStatus').minHeight"
      :top="`${$store.getters.getWindow('SpotifyStatus').top}px`"
      :left="`${$store.getters.getWindow('SpotifyStatus').left}%`"
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
              :href="`${spotify.item.external_urls.spotify}`"
            >
              <img
                class="spotify-img"
                :src="spotify.item.album.images[0].url"
              />
            </a>
            <div class="stats">
              <span class="spotify-title">{{ spotify.item.name }}</span>
              <span class="spotify-artist">{{
                spotify.item.artists[0].name
              }}</span>
              <div id="spotify-progress">
                <img
                  title="Currently playing"
                  v-if="spotify.is_playing"
                  class="disc spinning"
                  src="../assets/icons/Disc.svg"
                />
                <img
                  title="Currently paused"
                  v-else
                  class="disc"
                  src="../assets/icons/Disc.svg"
                />
                <div class="progress">
                  <ProgressbarComponent
                    id="spotify-progressbar"
                    :value="
                      (spotify.progress_ms / spotify.item.duration_ms) * 100
                    "
                  />
                </div>
              </div>
              {{ this.spotify.item.album.release_date }}
            </div>
          </div>
        </div>
      </div>
    </vue-resizable>
    <div id="taskbar">
      <div id="apps">
        <div
          v-for="window in $store.state.windows"
          :key="window.id"
          @click="this.focusWindow(window.id)"
        >
          <div
            @click="this.openWindow(window.id)"
            id="taskbar-item"
            v-if="window.closed"
          >
            <img class="icon" :src="this.getImgUrl(window.id)" />
          </div>
          <div v-else id="taskbar-item-open" class="active">
            <img class="icon" :src="this.getImgUrl(window.id)" />
          </div>
        </div>
      </div>
      <div id="extra">
        <img class="icon" src="../assets/icons/Wifi.svg" />
        <span v-html="this.time"></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueResizable from "vue-resizable";
import TopbarComponent from "@/components/TopbarComponent.vue";
import ProgressbarComponent from "@/components/ProgressbarComponent.vue";
export default {
  name: "DefaultView",
  data() {
    return {
      codingAge: 0,
      time: 0,
      spotify: undefined,
      options: {
        text: {
          color: "#FFFFFF",
          shadowEnable: true,
          shadowColor: "#000000",
          fontSize: 14,
          fontFamily: "Helvetica",
          dynamicPosition: false,
          hideText: false,
        },
        progress: {
          color: "#2dbd2d",
          backgroundColor: "#333333",
          inverted: false,
        },
        layout: {
          height: 35,
          width: 140,
          verticalTextAlign: 61,
          horizontalTextAlign: 43,
          zeroOffset: 0,
          strokeWidth: 30,
          progressPadding: 0,
          type: "line",
        },
      },
    };
  },
  async created() {
    // Run mobile check
    await axios({
      method: "get",
      // url: "http://192.168.10.139:3000/api/current-track",
      url: "https://stianwiu.me/api/current-track",
    }).then((res) => {
      this.spotify = res.data;
      console.log(res.data);
    });
    console.log(this.$store.getters.getWindow("SpotifyStatus"));
    // 2018-01-07T15:06:54
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
      this.codingAge = `<span style="color: #e5a4f4;">${year}</span> years,<span style="color: #e5a4f4;">${month}</span> months,<span style="color: #e5a4f4;">${day}</span> days,<span style="color: #e5a4f4;">${hour}</span> hours,<span style="color: #e5a4f4;">${minute}</span> minutes, <span style="color: #e5a4f4;">${second}</span>seconds`;

      // Set the time
      this.time = `<span style="color: #6a50e9;">${new Date().toLocaleTimeString()}</span>`;
    }, 100);

    setInterval(async () => {
      await axios({
        method: "get",
        // url: "http://192.168.10.139:3000/api/current-track",
        url: "https://stianwiu.me/api/current-track",
      }).then((res) => {
        this.spotify = res.data;
        console.log(res.data);
      });
    }, 15000);
  },
  components: {
    TopbarComponent,
    VueResizable,
    ProgressbarComponent,
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
  },
};
</script>

<style scoped>
#Description {
  position: absolute;
}

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

#SpotifyStatus {
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
  align-items: center;
  justify-content: space-between;
}

#apps {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
}

#taskbar-item,
#taskbar-item-open {
  width: 45px;
  height: 45px;
  margin: 0 5px;
  background-color: #6a50e9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

#taskbar-item .icon,
#taskbar-item-open .icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

#taskbar-item:hover {
  background-color: #5d46cf;
}

#taskbar-item-open {
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
