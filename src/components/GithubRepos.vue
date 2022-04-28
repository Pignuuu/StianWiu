<template>
  <div class="Repo">
    <h2>Github Repositories</h2>
    <div class="cards">
      <div class="card" v-for="(repo, index) in this.repo" v-bind:key="index">
        <a v-bind:href="repo.html_url">
          {{ repo.full_name }}
        </a>
        <br />
        <br />
        <p>Created At:</p>
        <p class="date">{{ repo.created_at }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data: function () {
    return {
      repo: [],
    };
  },
  created: function () {
    // If data is cached in localStorage, use it
    if (sessionStorage.getItem("repo")) {
      this.repo = JSON.parse(sessionStorage.getItem("repo"));
    } else {
      // If not, fetch data from Github API
      axios
        .get("https://api.github.com/users/Stianwiu/repos")
        .then((response) => {
          this.repo = response.data;
          sessionStorage.setItem("repo", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Repo {
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  z-index: 1;

  position: relative;
}

.cards {
  width: 60%;

  display: flex;
  flex-wrap: wrap;

  justify-content: center;
}

.card {
  background-color: #8086ff;
  color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  /* height: 50px; */

  margin: 20px;
}

a {
  color: #fff;
}

.date {
  color: #ffffffa2;
}
</style>
