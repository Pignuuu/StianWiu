import { createStore } from 'vuex'

export default createStore({
  state: {
    windows: [
      {
        id: "Description",
        title: 'About me - Notepad.exe',
        closed: false,
        maximized: false,
        top: Math.floor(Math.random() * 100) + 10,
        left: Math.floor(Math.random() * 60) + 10,
        width: "550px",
        height: "300px",
        minWidth: 300,
        minHeight: 100,
      },
      {
        id: "SpotifyStatus",
        title: 'StianWiu - Spotify.exe',
        closed: false,
        maximized: false,
        top: Math.floor(Math.random() * 100) + 360,
        left: Math.floor(Math.random() * 60) + 10,
        width: "400px",
        height: "250px",
        minWidth: 400,
        minHeight: 200,
      },
    ],
  },
  getters: {
    isClosed: (state) => (id) => {
      const window = state.windows.find(w => w.id === id);
      if (window === undefined || window === null) {
        return false;
      }
      return window.closed;
    },
    isMaximized: (state) => (id) => {
      const window = state.windows.find(w => w.id === id);
      if (window === undefined || window === null) {
        return false;
      }
      return window.maximized;
    },
    getTitle: (state) => (id) => {
      const window = state.windows.find(w => w.id === id);
      if (window === undefined || window === null) {
        return "";
      }
      return window.title;
    },
    getWindow: (state) => (id) => {
      const window = state.windows.find(w => w.id === id);
      if (window === undefined || window === null) {
        return { top: 0, left: 0, width: 0, height: 0, minWidth: 0, minHeight: 0, maximized: false, closed: true };
      }
      return {
        top: window.top,
        left: window.left,
        width: window.width,
        height: window.height,
        minWidth: window.minWidth,
        minHeight: window.minHeight,
        maximized: window.maximized,
        closed: window.closed
      };
    }
  },
  mutations: {
  },
  actions: {
    // Create a action that will toggle closed state of a window
    close({ state }, id) {
      const window = state.windows.find(w => w.id === id);
      if (window === undefined || window === null) {
        return;
      }
      window.closed = true;
    },
    openWindow({ state }, id) {
      const window = state.windows.find(w => w.id === id);
      if (window === undefined || window === null) {
        return;
      }
      window.closed = false;
    },
    // Create a action that will toggle maximized state of a window
    toggleMaximize({ state }, id) {
      const window = state.windows.find(w => w.id === id);
      if (window === undefined || window === null) {
        return;
      }

      // If the window is not maximized, set the width and height to 100%, and set the top and left to 0.
      // In order to restore the window to its original size, we need to store the original size in the state.
      if (!window.maximized) {
        window.oldWidth = window.width;
        window.oldHeight = window.height;
        window.oldTop = window.top;
        window.oldLeft = window.left;
        window.width = "100%";
        window.height = "100%";
        window.top = 0;
        window.left = 0;
      } else {
        // If the window is maximized, restore the original size
        window.width = window.oldWidth;
        window.height = window.oldHeight;
        window.top = window.oldTop;
        window.left = window.oldLeft;
      }
      window.maximized = !window.maximized;

      // Force vue to re-render the window
      window.closed = true;
      window.closed = false;
    }
  },
  modules: {
  }
})