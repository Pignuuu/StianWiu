<template>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap");
@import url("https://fonts.googleapis.com/css2?family=VT323&display=swap");

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

  overflow: hidden;
}

* {
  text-shadow: 0 0px 20px #9900ffea;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.retro {
  font-family: "VT323", monospace;
}
/* * {
  border: 1px solid red;
} */

/* Change colors of selected text */
::selection {
  background-color: #e5a4f4;
  color: white;
}

.disable-selection {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
