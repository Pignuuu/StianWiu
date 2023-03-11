import { createStore } from 'vuex'

export default createStore({
  state: {
    windows: [
      {
        id: "Description",
        title: 'About me',
        closed: false,
        maximized: false,
        top: 46,
        left: 10,
      },
      {
        id: "testwindow",
        title: 'Never gonna give you up',
        closed: false,
        maximized: false,
        top: 360,
        left: 53,
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
    getWindowPosition: (state) => (id) => {
      const window = state.windows.find(w => w.id === id);
      if (window === undefined || window === null) {
        return { top: 0, left: 0 };
      }
      return { top: window.top, left: window.left };
    }
  },
  mutations: {
  },
  actions: {
    // Create a action that will toggle closed state of a window
    close({ state }, id) {
      console.log(id);
      const window = state.windows.find(w => w.id === id);
      console.log(window);
      if (window === undefined || window === null) {
        return;
      }
      window.closed = !window.closed;
    },
    // Create a action that will toggle maximized state of a window
    toggleMaximize({ state }, id) {
      const window = state.windows.find(w => w.id === id);
      if (window === undefined || window === null) {
        return;
      }
      window.maximized = !window.maximized;
    }
  },
  modules: {
  }
})
