<template>
  <div class="page">
    <h1 class="title">STIAN WIU</h1>
    <h3 class="title-child">WEB DEVELOPER</h3>
    <div class="socials">
      <a href="https://twitter.com/pignuuu">
        <fa :icon="['fab', 'twitter']" />
      </a>
      <a href="https://discord.com/users/283331663482585088">
        <fa :icon="['fab', 'discord']" />
      </a>
      <a href="https://github.com/StianWiu">
        <fa :icon="['fab', 'github']" />
      </a>
      <a href="mailto:pignuuu@gmail.com">
        <fa class="home-button" icon="at" />
      </a>
    </div>
    <img @click="this.scroll()" class="arrow" src="./assets/arrow-down.svg" />
  </div>
  <div class="page">
    <p class="description">
      Hi! My name is Stian, I'm a student & web developer from South-Eastern
      Norway. I have been actively coding for a few years now, I code as a hobby
      but I'm working to become a full time developer in the near future. I am a
      very introverted person as all developers are, I'm told that I am a very
      giving person because i love to help others. My favorite number is 3 and
      my favorite color is <span style="color: #a454ff">#a454ff</span>.
    </p>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      windowTop: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    onScroll() {
      // Get the window's scroll position.
      this.windowTop = window.scrollY;
      const height = document.body.scrollHeight / 4;
      if (this.windowTop > height) {
        // Rotate arrow using css
        document.querySelector(".arrow").style.transform = "rotate(180deg)";
      } else {
        // Rotate arrow using css
        document.querySelector(".arrow").style.transform = "rotate(0deg)";
      }
    },
    scroll() {
      const height = document.body.scrollHeight / 4;
      if (this.windowTop > height) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, this.windowTop + 1000);
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400&display=swap");

* {
  font-family: "Source Code Pro", monospace;
  scroll-behavior: smooth;
}
#app {
  text-align: center;
}

body {
  margin: 0;
}

.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  margin: 0;
  letter-spacing: 10px;

  font-weight: bold;
}

.title-child {
  margin: 0;
  letter-spacing: 0px;
  font-size: 15px;
  font-weight: 200;
}

.arrow {
  width: 50px;
  height: 50px;

  position: fixed;
  transition: 0.3s;
  top: 85vh;

  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.arrow:hover {
  cursor: pointer;

  transform: scale(1.2);
}

.description {
  font-size: 20px;
  font-weight: 200;

  max-width: 700px;
  margin: 0 20px;
  padding: 10px;
}

.socials {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 10px;
}

.socials > a > svg {
  color: black;
  height: 30px;
  margin: 0 10px;
}

.socials > a {
  transition: 0.2s;
}
.socials > a:hover {
  transform: scale(1.2);
}
</style>
