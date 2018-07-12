<template>
  <div class="container">
    <div class="container">
    <h1>List</h1>
    <form class="form " @submit.prevent="confirmEdit">
      <div class="form-group">
		<h2>{{editTitle}}</h2>
        <input class="col-md-6 form-control-md" type="text" v-model="editId">
        <input class="form-control-md" type="text" v-model="editRating">
        <button type="submit" class="btn btn-default">Edit</button>
      </div>

    </form>
    <!--<table class="table table-striped">
      <tr v-for="review in reviews" :key="review.review_id">
        <td>
          <a :href="review.youtube_url" target="_blank">
            <img :src="review.thumbnail_url" alt="">
          </a>
        </td>
        <br>

        <td>
          <b>{{review.title }}
            <br>
            <i class="fas fa-shield-alt"></i>
          </b>
          {{review.rating}}

        </td>

        <td>
          <i class="fas fa-edit" @click="configureEdit(review.review_id)"></i>
        </td>
        <td>
          <i class="fas fa-times" @click="deleteReview(review.review_id)"></i>
        </td>
      </tr>
    </table> -->
	 <div class="listItem" v-for="review in reviews" :key="review.review_id">
		<a :href="review.youtube_url" target="_blank" @click="configureEdit(review.review_id,review.title)">
      <div class="title">
        {{review.title }}
      </div>

      <div>
        <div class="rating">
        <span class="reviewBadge">{{getFull(review.rating)}}</span>
        </div>
        <!-- <div class="buttons">
          &nbsp;
          <i class="fas fa-edit" @click="configureEdit(review.review_id,review.title)"></i>
          <i class="fas fa-times" @click="deleteReview(review.review_id)"></i>
        </div> -->
      </div>
    </a>
	</div>
   <!-- <paginate name="reviews" :list="reviews" class="" :per="25">
     <li v-for="review in paginated('reviews')">
      {{ review.title }}
      </li>
  </paginate>
  <paginate-links for="reviews" :show-step-links="true"></paginate-links>
  <paginate-links for="reviews" :limit="25" :show-step-links="true"></paginate-links>
  <paginate-links for="reviews" :simple="{
        next: 'Next »',
        prev: '« Back'
      }"></paginate-links> -->


  <br>
  </div></div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "listReviews",
  data() {
    return {
      reviews: [],
      editId: "",
      editRating: "",
      editTitle: ""
      // paginate: ["reviews"]
    };
  },
  created() {
    this.getData(0, 50);
  },
  methods: {
    getData(start, end) {
      this.reviews = [];
      this.editId = this.editRating = "";
      db
        .collection("reviews")
        .where("rating", "==", "")
        .orderBy("postedAt", "desc")
        // .limit(end + 25)
        // .get()
        // .then(query => {
        //   query.forEach(doc => {
        //     this.reviews.push(doc.data());
        //   });
        .onSnapshot(query => {
          // let cities = [];
          query.forEach(doc => {
            this.reviews.push(doc.data());
          });
          // this.reviews = cities;
        });
      // });
    },
    // deleteReview(id){
    // 	db.collection('reviews').where("review_id",'==',id).limit(1).get()
    // 	.then(query=>{
    // 		query.forEach(doc=>{doc.ref.delete()});
    // 	}).catch(e=>{console.log(e)})
    // 	this.getData(0,25);
    // }
    configureEdit(id, title) {
      this.editTitle = title;
      this.editId = id;
    },
    confirmEdit() {
      db
        .collection("reviews")
        .where("review_id", "==", this.editId)
        .limit(1)
        .get()
        .then(query => {
          query.forEach(doc => {
            doc.ref
              .set(
                {
                  rating: this.editRating
                },
                {
                  merge: true
                }
              )
              .then(e => {
                this.getData(0, 25);
              });
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
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
  }
};
</script>
<style lang="scss" scoped>
a {
  font-family: "Montserrat";
  font-weight: 550;
  font-size: 1em;
  display: flex;
  justify-content: space-between;
}
.fa-shield-alt {
  margin: 0.2em;
  font-size: 6em;
}
.listItem {
  /* display: flex; */
  width: 100%;
  box-sizing: border-box;
  background-color: darkslateblue;
  color: #fff;
  border: 1px solid black;
  /* justify-content: space-between; */
  padding: 0.6em;
  border-left: solid 3px transparent;
}
.listItem:hover {
  border-left: rgb(255, 255, 255) 3px solid;
}
.listItem:hover .reviewBadge {
  background-color: #fff;
  color: black;
}
.title {
  margin-left: 0px;
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
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
.paginate-list {
  width: 159px;
  margin: 0 auto;
  text-align: left;
  li {
    display: block;
    &:before {
      content: "⚬ ";
      font-weight: bold;
      color: slategray;
    }
  }
}

.paginate-links.items {
  user-select: none;
  a {
    cursor: pointer;
  }
  li.active a {
    font-weight: bold;
  }
  li.next:before {
    content: " | ";
    margin-right: 13px;
    color: #ddd;
  }
  li.disabled a {
    color: #ccc;
    cursor: no-drop;
  }
}
</style>
