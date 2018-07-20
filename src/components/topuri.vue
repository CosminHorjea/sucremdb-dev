<template>
    <div class="div">
        <div class="header">
            <ul>
                <li>2015</li>
                <li>2015</li>
                <li>2015</li>
                <li>2015</li>
                <li>2015</li>
                <li>2015</li>
                
            </ul>
        </div>
    </div>
</template>

<script>
import db from "./firebaseInit";
// //titlu
// "Top 5 Filme cu Leonardo DiCaprio"
// youtube_id
// "o9ZgvYZRUws"
//
//items[{}]
//
//
export default {
  name: "topuri",
  data() {
    return {
      toatetopurile: [],
      topuri: [],
      anSelectat: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  ul {
    display: flex;
    flex-flow: row;
    justify-content: center;
    list-style: none;
    li {
      margin: 0 10px;
      font: outline;
    }
  }
  padding-top: 3em;
}
</style>

