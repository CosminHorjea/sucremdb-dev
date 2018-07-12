<template>
    <div id="reviews">
        <h1>SucreMDB</h1>

        <div class="row">
            <form class="form-control" @submit.prevent="addReview">
                <input  type="text" name="" id="" class="form col-md-6" v-model="addVideo.title" placeholder="Titlu" >
                <input placeholder="youtube" type="text" name="" id="" class="form" v-model="addVideo.youtube_url">
                <input placeholder="rating" type="text" name="" id="" class="form col-md-6" v-model="addVideo.rating">
                <input placeholder="thumbnail" type="text" name="" id="" class="form" v-model="addVideo.thumbnail_url">
                <input placeholder="postedAt" type="text" name="" id="" class="form" v-model="addVideo.postedAt">
                <input placeholder="review_id" type="text" name="" id="" class="form" v-model="addVideo.review_id">


                <button type="submit" class="btn btn-default">Add</button>
            </form>
        </div>

        <div class="row">
            <div class=" card col-md-3" style="margin:1em" v-for="video in videos" v-bind:key="video.contentDetails.videoId">
                <p class="card-body" style="margin:0px">{{ video.snippet.title }}</p>
                
                <p>{{video.snippet.thumbnails.medium.url}}</p>
                <p>{{video.snippet.publishedAt}}</p>
                <p class="card-body">
                    <!-- <router-link to="/review" class="">
                        <p>Watch </p>
                    </router-link> -->
                    <a :href="'https://www.youtube.com/watch?v='+video.contentDetails.videoId" target="_blank"><img class="card-img-bottom" :src="video.snippet.thumbnails.medium.url" alt=""></a>
                    <b>https://www.youtube.com/watch?v={{video.contentDetails.videoId}}</b>
                </p>
                
               
            </div>
        </div>

    </div>
</template>

<script>
import db from './firebaseInit'
db.settings({timestampsInSnapshots: true});
export default {
    name:'reviews',
    data(){
        return{
            arr:[],
            videos:[],
            addVideo:{
                review_id:'',
                rating:'',
                title:'',
                youtube_url:'',
                thumbnail_url:'',
                watch_show:'',
                postedAt:''
            },
            nextPage:''
        }
    },
    created(){
        this.getVideos("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=PLLRB82045YiiUNRlRSVssb8qqNn4QLOPG&key=AIzaSyBnRWfZMxEjJVzcrYUadxPEyb23qezP2aw");

        //GET https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=CDIQAA&playlistId=PLLRB82045YiiUNRlRSVssb8qqNn4QLOPG&key=AIzaSyBnRWfZMxEjJVzcrYUadxPEyb23qezP2aw
        
        // https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=CGQQAA&playlistId=PLLRB82045YiiUNRlRSVssb8qqNn4QLOPG&key={YOUR_API_KEY}

        // https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=CJYBEAA&playlistId=PLLRB82045YiiUNRlRSVssb8qqNn4QLOPG&key={YOUR_API_KEY}

        //GET https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=CMgBEAA&playlistId=PLLRB82045YiiUNRlRSVssb8qqNn4QLOPG&key={YOUR_API_KEY}

        //GET https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=CPoBEAA&playlistId=PLLRB82045YiiUNRlRSVssb8qqNn4QLOPG&key={YOUR_API_KEY}

        //bamadusap@o3enzyme.com


        db.collection('reviews').orderBy('postedAt').get().then(query=>{
            //console.log(query.docs)
            query.forEach(doc=>{
               // console.log(doc.data())
            })
            //console.log(query);
        });

    },
    methods:{
        getVideos(url){
            fetch(url).then(res=>res.json()).then(res=>{
                this.videos=res.items;
                console.log(this.videos);
                //console.log(this.videos);
                //this.buildAddVideos();
            })
        },
        addReview(){
            //event.preventDefault();
            db.collection('reviews').add(this.addVideo)
            .then(console.log('Good'))
            .catch(error => {
                console.error('Error adding review: ', error)
             });

        },
        // buildAddVideos(){
        //     this.videos.forEach(video=>{
        //         this.addVideo.title=video.snippet.title;
        //         this.addVideo.review_id=video.contentDetails.videoId;
        //         this.addVideo.youtube_url="https://www.youtube.com/watch?v="+video.contentDetails.videoId;
        //         this.addVideo.thumbnail_url=video.snippet.thumbnails.medium.url;
        //         this.addVideo.postedAt=video.snippet.publishedAt;
        //         //this.addReview();
        //         this.arr.push(this.addVideo);
        //     });
            //console.log(this.arr);
        //}
    },
        

}
</script>
    
<style scoped>
    *{
        color:black;
    }
</style>
