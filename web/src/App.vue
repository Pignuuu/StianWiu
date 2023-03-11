<template>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap");

html,
body,
#app {
  margin: 0;
  padding: 0;

  height: 100%;

  background-color: #6a50e9;
  color: white;

  font-family: "Source Code Pro", monospace;

  /* Add more space between characters */
  letter-spacing: 0.1em;

  font-size: 13px;
  font-weight: 200;
}

* {
  text-shadow: 0 0px 20px #9900ffea;
}

#app {
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* * {
  border: 1px solid red;
} */
</style>
