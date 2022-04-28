<template>
  <div class="Header">
    <h1>StianWiu</h1>
    <h3>Pignuuu</h3>
    <div class="links">
      <a href="https://github.com/StianWiu">
        <img
          class="svg"
          src="../assets/icons/github.svg"
          alt="Github"
          title="Github"
        />
      </a>
      <a href="https://discord.com/users/283331663482585088">
        <img
          class="svg"
          src="../assets/icons/discord.svg"
          alt="Discord"
          title="Discord"
        />
      </a>
      <a href="https://twitter.com/Pignuuu">
        <img
          class="svg"
          src="../assets/icons/twitter.svg"
          alt="Twitter"
          title="Twitter"
        />
      </a>
      <a href="mailto:Pignuuu@gmail.com">
        <img
          class="svg"
          src="../assets/icons/gmail.svg"
          alt="Gmail"
          title="Gmail"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Header {
  padding: 200px 0 100px 0;

  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  z-index: 1;

  position: relative;
}

.links {
  display: flex;
  justify-content: center;
  align-items: center;
}

.svg {
  width: 30px;
  height: 30px;
  margin: 0 5px;

  cursor: pointer;

  transition: 0.2s;
}

.svg:hover {
  transform: scale(1.2);
}
</style>
