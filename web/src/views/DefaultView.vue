<template>
  <div
    @click="this.focusWindow('Description')"
    class="window"
    id="Description"
    v-drag="{ axis: 'all' }"
    v-if="!$store.getters.isClosed('Description')"
  >
    <TopbarComponent
      windowId="Description"
      :title="$store.getters.getTitle('Description')"
    />
    <div class="content"></div>
  </div>
  <div
    @click="this.focusWindow('testwindow')"
    class="window"
    id="testwindow"
    v-drag="{ axis: 'all' }"
    v-if="!$store.getters.isClosed('testwindow')"
  >
    <!-- Window id is description -->
    <TopbarComponent
      windowId="testwindow"
      :title="$store.getters.getTitle('testwindow')"
    />
    <div class="content"></div>
  </div>
</template>

<script>
import TopbarComponent from "@/components/TopbarComponent.vue";
export default {
  name: "DefaultView",
  components: {
    TopbarComponent,
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
  width: 500px;
  height: 250px;
}

#testwindow {
  width: 500px;
  height: 250px;
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
