<template>
  <div id="app">
     <!-- <img src="./assets/logo.png" alt="Vue.js PWA"> -->
    <link rel="stylesheet" href="./assets/style.css">
    <!-- <img src="./assets/photo.png" alt=""> -->
    <NavBar />
    <br><br>
    <div class="container">
        <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/navBar";
export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>
<style scoped>
#app {
  height: auto;
  min-height: 90vh;
}
.container {
  padding: 0px;
  height: inherit;
  background-color: #12569f20;
  box-shadow: 0px 10px 20px 0px black;
}
@media (min-width: 1200px) {
  .container {
    max-width: 1280px;
  }
}
li {
  padding: 10px;
}
</style>


