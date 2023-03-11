<template>
  <div id="bar">
    <div>
      <p id="title">{{ this.title }}</p>
    </div>
    <div>
      <button>
        <img src="../assets/minimize.svg" />
      </button>
      <button @click="this.toggleMaximize(this.windowId)">
        <img
          src="../assets/maximize.svg"
          v-if="!$store.getters.isMaximized(this.windowId)"
        />
        <img src="../assets/restore.svg" v-else />
      </button>
      <button @click="$store.dispatch('close', this.windowId)">
        <img src="../assets/close.svg" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopbarComponent",
  methods: {
    toggleMaximize(id) {
      // Find window by id then give maximized class
      const window = document.getElementById(id);
      if (window === null || window == undefined) return;
      // If this.getters.isMaximized(id) is true then remove maximized class
      if (this.$store.getters.isMaximized(id)) {
        window.classList.remove("maximized");
      } else {
        window.classList.add("maximized");
      }
      this.$store.dispatch("toggleMaximize", id);
    },
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    windowId: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
#title {
  margin-left: 10px;
  color: #6a50e9;

  font-size: 15px;
}

#bar {
  background-color: #e5a4f4;
  height: 35px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#bar button {
  background-color: #e5a4f4;
  border: 2px solid #a06bcc;

  height: 25px;
  width: 25px;
  padding: 0;

  color: white;
  text-align: center;
  margin: 4px 2px;
  cursor: pointer;
}

#bar button > img {
  height: 100%;
  width: 100%;
}
</style>
