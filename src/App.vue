<template>
  <div class="area">
    <!-- Main page code -->
    <MainPage />
    <AboutMe />
    <GithubRepos />
    <ul class="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import GithubRepos from "./components/GithubRepos.vue";
import MainPage from "./components/MainPage.vue";
import AboutMe from "./components/AboutMe.vue";

export default {
  name: "App",
  components: {
    GithubRepos,
    MainPage,
    AboutMe,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Exo:400,700");

* {
  margin: 0px;
  padding: 0px;
}

body {
  font-family: "Exo", sans-serif;
}

.context {
  width: 100%;
  position: absolute;
  top: 50vh;
}

.context h1 {
  text-align: center;
  color: #fff;
  font-size: 50px;
}

.area {
  background: #4e54c8;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  width: 100%;
  height: 120em;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120em;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 22s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 28s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 55s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 45s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 21s;
}
.circles li:nth-child(11) {
  left: 55%;
  width: 10px;
  height: 10px;
  animation-delay: 7s;
  animation-duration: 21s;
}
.circles li:nth-child(12) {
  left: 34%;
  width: 60px;
  height: 60px;
  animation-delay: 3s;
  animation-duration: 21s;
}
.circles li:nth-child(13) {
  left: 17%;
  width: 110px;
  height: 110px;
  animation-delay: 10s;
  animation-duration: 21s;
}
.circles li:nth-child(14) {
  left: 72%;
  width: 150px;
  height: 150px;
  animation-delay: 6s;
  animation-duration: 21s;
}
.circles li:nth-child(15) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 13s;
  animation-duration: 31s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-2000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}

@media only screen and (max-width: 1670px) {
  .area {
    height: 140em;
  }
  .circles {
    height: 140em;
  }
  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }

    100% {
      transform: translateY(-3000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }
}
@media only screen and (max-width: 1100px) {
  .area {
    height: 230em;
  }
  .circles {
    height: 230em;
  }
  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }

    100% {
      transform: translateY(-4000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }
}

h1 {
  color: white;
  font-size: 3em;
}

h2 {
  color: white;
  font-size: 2em;
}

h3 {
  color: #ffffffa2;
  font-size: 1.5em;
}
</style>
