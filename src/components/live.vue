<template>
  <div class="live">
    <div class="container">
      <h1>Live</h1>
      <br>
      <iframe src="https://player.twitch.tv/?volume=0.12&!muted&channel=lumealuisucre" frameborder="0" allow="autoplay; encrypted-media" class="player" allowfullscreen></iframe>
      <br><br>
    </div>
  </div>
</template>
<script>
export default {
  name: "livePage"
};
</script>
<style lang="scss" scoped>
h1 {
  text-decoration: underline;
  color: #fc5600;
  font-size: 48px;
}
.live {
  min-width: inherit;
  padding: 1em;
}
iframe {
  width: inherit;
  height: 42rem;
}
</style>
