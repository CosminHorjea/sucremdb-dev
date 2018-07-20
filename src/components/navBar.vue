<template>
    <nav>
      
        <ul>
          <span><a href="/"><img src="../assets/logoS.png" alt="" width="60px" height="45px"></a></span>
          <div>
            <router-link to="/reveuri"><li>Reveuri</li></router-link>
            <router-link to="/live"><li>live <i v-if="isLive" class="fas fa-circle">&nbsp;</i></li></router-link>
            <!-- <router-link to="/topuri"><li>topuri</li></router-link> -->
          </div>
        </ul>
    </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isLive: ""
    };
  },
  created() {
    this.checkLive();
  },
  methods: {
    checkLive() {
      let myHeaders = new Headers();

      myHeaders.append("Client-ID", "16uh6wpj4ofmo48y6swsa4a2m89zib");
      fetch("https://api.twitch.tv/helix/streams?user_id=166079883", {
        headers: myHeaders
      })
        .then(res => res.json())
        .then(res => {
          if (res) if (res.data[0].type == "live") this.isLive = true;
          console.log(res);
        });
    }
  }
};
</script>
<style scoped>
li > i {
  color: #ec1313;
  border-radius: 50%;
  animation: live 2s;
  animation-iteration-count: infinite;
  animation-direction: reverse;
  /* font-size: 5em; */
}
@keyframes live {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
nav {
  color: black;
  position: fixed;
  width: 100%;
  text-transform: uppercase;
  font-family: "Montserrat";
  font-weight: bolder;
  background-color: #12569f;
  height: 4rem;
  border-bottom: #fc5600 2px solid;
  z-index: 2;
}
ul {
  height: inherit;
  display: flex;
  text-decoration: none;
  list-style-type: none;
  /* justify-content: ; */
  align-items: center;
  padding-left: 1.2em;
}
ul div {
  display: flex;
  flex-direction: row;
  height: inherit;
  align-items: center;
}
ul > span > a {
  margin-right: 1rem;
  font-size: 2em;
  font-weight: 990;
  cursor: default;
}
ul > div > a {
  color: white;
  display: flex;
  padding: 10px;
  align-items: center;
  height: inherit;
  flex-direction: row;
  justify-content: flex-end;
  /* margin-right: 1rem; */
  transition: background-color 0.2s;
  transition: color 0.2s;
}
ul > div > a:hover {
  background-color: #fc5600;
  color: #12569f;
}
/* .router-link-active {
}
.router-link-exact-active,
.router-link-active {
} */
.router-link-exact-active {
  background-color: #fc5600;
  color: #12569f;
}
</style>

