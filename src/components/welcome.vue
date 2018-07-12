<template>
  <div class="video">
    <br>
    <div class="container">
    <h1>Ultimul video postat :</h1>
    <iframe :src="'https://www.youtube.com/embed/'+this.lastVideo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <!-- <h5>{{this.lastVideo.title}}</h5> -->
    <!-- <iframe src="https://player.twitch.tv/?volume=0.07&!muted&channel=rupemaneta" frameborder="0"></iframe> -->
    
    </div>
    <br><br>
    <footer>
      <div class="footer">
        <a href="https://www.instagram.com/superomul/" target="_blank"><i class="fab fa-instagram"></i>instagram.com/superomul</a>
        <a href="https://www.twitch.tv/lumealuisucre" target="_blank">twitch.tv/lumealuisucre<i class="fab fa-twitch"></i></a>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "welcome",
  data() {
    return {
      lastVideo: []
    };
  },
  created() {
    this.getLatestVideo(
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=1&playlistId=UUSvb-7-0sCB8GQb2dd0s_WQ&key=AIzaSyBnRWfZMxEjJVzcrYUadxPEyb23qezP2aw"
    );
  },
  methods: {
    getLatestVideo(api) {
      fetch(api)
        .then(res => res.json())
        .then(res => {
          this.lastVideo = res.items[0].contentDetails.videoId;
        });
    }
  }
};
</script>
<style scoped>
/* .video {
  background-color: ;
} */
h1 {
  text-decoration: underline;
  color: #fc5600;
}
iframe {
  width: 100%;
  height: 42rem;
}
h5 {
  text-align: center;
}
.footer {
  width: inherit;
  background-color: rgba(1, 4, 24, 0.404);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  display: flex;
  justify-content: space-between;
}
.footer > a {
  display: flex;
  align-items: center;
  font-family: "Montserrat";
}
.footer a i {
  font-size: 1.8rem;
  margin-left: 10px;
  margin-right: 10px;
}
.footer > a:nth-child(1):hover {
  color: #bc2a8d;
}
.footer > a:nth-child(2):hover {
  color: rgb(100, 65, 164);
}
</style>
