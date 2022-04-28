<template>
  <div class="About">
    <h2>About me</h2>
    <div class="AboutSection">
      <p>
        Hi! My name is Stian, I'm a student & web developer from South-Eastern
        Norway.
        <br />
        <br />
        I have been actively coding for a few years now, I code as a hobby but
        I'm working to become a full time developer in the near future.
        <br />
        <br />
        I am a very introverted person as all developers are, I'm told that I am
        a very giving person because i love to help others.
        <br />
        <br />
        My favourite number is 3 and my favourite color is
        <span style="color: #a454ff">#a454ff</span>.
      </p>
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
.About {
  padding: 0px 0 100px 0;

  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  z-index: 1;

  position: relative;
}

.AboutSection {
  padding: 20px;
  margin: 20px;
  background-color: #fff;

  max-width: 600px;
  border-radius: 10px;

  font-size: 20px;
}
</style>
