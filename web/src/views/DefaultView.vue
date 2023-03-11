<template>
  <div id="desktop">
    <vue-resizable
      @mousedown="this.focusWindow('Description')"
      class="window"
      id="Description"
      v-if="!$store.getters.isClosed('Description')"
      width="200"
      height="200"
      min-width="200"
      min-height="100"
      dragSelector=".topbar"
      :top="`${$store.getters.getWindowPosition('Description').top}px`"
      :left="`${$store.getters.getWindowPosition('Description').left}%`"
      :fit="true"
    >
      <TopbarComponent
        windowId="Description"
        :title="$store.getters.getTitle('Description')"
        class="topbar"
      />
      <div class="content"></div>
    </vue-resizable>
    <vue-resizable
      @mousedown="this.focusWindow('testwindow')"
      class="window"
      id="testwindow"
      v-if="!$store.getters.isClosed('testwindow')"
      width="200"
      height="200"
      min-width="200"
      min-height="100"
      dragSelector=".topbar"
      :top="`${$store.getters.getWindowPosition('testwindow').top}px`"
      :left="`${$store.getters.getWindowPosition('testwindow').left}%`"
      :fit="true"
    >
      <TopbarComponent
        windowId="testwindow"
        :title="$store.getters.getTitle('testwindow')"
        class="topbar"
      />
      <div class="content"></div>
    </vue-resizable>
  </div>
</template>

<script>
import VueResizable from "vue-resizable";
import TopbarComponent from "@/components/TopbarComponent.vue";
export default {
  name: "DefaultView",
  components: {
    TopbarComponent,
    VueResizable,
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
  },
};
</script>

<style scoped>
#Description {
  position: absolute;
  width: 500px;
  height: 250px;
  /* top: 10px;
  right: 45%; */
}

#testwindow {
  position: absolute;
  width: 500px;
  height: 250px;
  /* top: 300px;
  left: 40%; */
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

  cursor: default;

  background-color: #6a50e9;
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
</style>
