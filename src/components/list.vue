<template>
  <div class="">
    <div class="container">
      <br>
      <h1>Reveuri</h1>
      <br>
      <h4>Search/Sort</h4>
      <form action="">
        <div class="form-row">
          <div class="form-inline col-md-12">
            <!-- v-on:keyup="search" v-on:keyup.delete="search" -->
            <input v-model="searchQuery" type="text" class="form-control" id="search"
              placeholder="Cauta un reveu.."  autocomplete="off">
            <select class="form-control" name="rating" id="rating" v-model="ratingOption">
              <option value="">Toate</option>
              <option value="SS">Scut si sabie</option>
              <option value="SC">Scut complet</option>
              <option value="JS">Juatate de scut</option>
              <option value="SG">Scut gol</option>
            </select>
          </div>
        </div>
      </form>
      <br>
      <paginate v-if="validReviews.length" name="validReviews" :list="validReviews" class="listItems" :per="25">
        <div class="listItem" v-for="review in paginated('validReviews')" :key="review.review_id">
          <div class="title">
            <a :href="review.youtube_url" target="_blank">{{review.title }}</a>
          </div>
          <div>
            <div class="rating">
              <span class="reviewBadge">{{getFull(review.rating)}}</span>
              &nbsp;
            </div>
          </div>
        </div>
      </paginate>
      <paginate-links class="pages" for="validReviews" :show-step-links="true" :async="true"></paginate-links>

      <br>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "list",
  data() {
    return {
      reviews: [],
      showReviews: [],
      searchQuery: "",
      ratingOption: "",
      paginate: ["validReviews"]
    };
  },
  created() {
    this.getData(0, 50);
    console.log();
  },
  computed: {
    validReviews() {
      return this.showReviews.filter(
        r =>
          r.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          r.rating.toLowerCase().includes(this.ratingOption.toLowerCase()) &&
          r.rating
      );
    }
  },
  methods: {
    getData(start, end) {
      this.reviews = [];
      db
        .collection("reviews")
        .orderBy("postedAt", "desc")
        // .where("rating", "==", "SS")
        // .limit(0 + 25)
        .onSnapshot(query => {
          query.forEach(doc => {
            this.reviews.push(doc.data());
          });
        });
      this.showReviews = this.reviews;
      // console.log(this.showReviews);
    },
    // showData() {
    //   this.showReviews.forEach(e => console.log(e));
    // },
    getFull(id) {
      switch (id) {
        case "SC":
          return "Scut Complet";
        case "JS":
          return "Jumatate de scut";
        case "SS":
          return "Scut si Sabie";
        case "SG":
          return "Scut Gol";
        default:
          return "No review";
      }
    }
    // search() {
    //   this.showReviews = this.reviews.filter(
    //     r =>
    //       r.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
    //       r.rating.toLowerCase().includes(this.ratingOption.toLowerCase()) &&
    //       r.rating
    //   );
    //}
  }
};
</script>
<style scoped>
a {
  font-family: "Montserrat";
  font-weight: 550;
  font-size: 1em;
}
h1 {
  text-decoration: underline;
  color: #fc5600;
}
.fa-shield-alt {
  margin: 0.2em;
  font-size: 6em;
}
.listItems {
  box-shadow: 0px 1px 10px 0px black;
}

.listItem {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  background-color: #12569f60;
  color: #fff;
  border: 1px solid black;
  justify-content: space-between;
  padding: 0.6em;
  border-left: solid 1px black;
  /* padding-left: 20px; */
}
.listItem:nth-child(odd) {
  background-color: #12569f80;
}

.listItem:hover {
  border-left: #fc5600 3px solid;
  padding-left: 0.5em;
}

.listItem:hover .reviewBadge {
  background-color: #fc5600;
  color: #fff;
}

.title {
  margin-left: 0px;
  font-weight: 500;
}
.title > a {
  font-weight: bold;
}

.reviewBadge {
  text-transform: uppercase;
  font-family: "Montserrat";
  font-weight: 600;
  font-size: 0.8em;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 10%;
}

input[type="text"] {
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  transition: border-color 0.05s ease-in-out, box-shadow 0.15s ease-in-out;
  border-radius: 0%;
  flex-grow: 1;
  margin-right: 1em;
}

.form-inline {
  display: flex;
  justify-content: space-between;
}
.form-inline > select {
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
}
select > option {
  background-color: rgb(0, 0, 0);
  border: none;
}

input:focus,
select:focus {
  /* border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none; */
  box-shadow: 0 0 0 0.2rem #fc5600;
  border-radius: 0%;
}
ul {
  padding: 0px;
}
.paginate-links.validReviews {
  display: flex;
  list-style: none;
  justify-content: flex-end;
  color: white;
}
.paginate-links.validReviews[data-v-2c28a8e4] > li {
  color: black;
}
li {
  color: green;
  padding: 10px;
  margin: 10px;
}
.test > li {
  color: rebeccapurple;
}
</style>
<style lang="scss">
.number {
  user-select: none;
  padding-left: 10px;
  padding-right: 10px;
  a {
    cursor: pointer;
  }
  &.active a {
    font-weight: bold;
  }
  &.disabled a {
    cursor: no-drop;
  }
}
</style>
