import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import reviews from '@/components/reviews'
import richReview from '@/components/richReview'
import listReviews from '@/components/listReviews'
import welcome from '@/components/welcome'
import NavBar from '@/components/navBar'
import list from '@/components/list'
import live from '@/components/live'
import topuri from '@/components/topuri'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [{
      path: '/',
      name: 'reviews',
      component: welcome
    },
    {
      path: '/review/:id',
      name: 'richReview',
      component: richReview
    },
    {
      path: '/reveuri',
      name: 'list',
      component: list
    },
    {
      path: '/admin',
      name: 'admin',
      component: reviews
    },
    {
      path: '/adminList',
      name: 'listReviews',
      component: listReviews
    },
    {
      path: '/live',
      name: 'livePage',
      component: live
    },
    {
      path:'/topuri',
      name:'topuri',
      component:topuri
    }
    //do live path
  ]
})
//PLLRB82045YiiUNRlRSVssb8qqNn4QLOPG
