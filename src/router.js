import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:{
        name:'article-list',
        params:{
          userId: '2', //好吧，主页强行跳到这个用户
        },
        query:{
          page:1,
        }
      },
    },
    {
      path: '/article/user/:userId',
      name: 'article-list',
      query:{
        page:1,
      },
      component: ()=> import('./views/ArticleList.vue'),
       
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }, {
      path: '/mylogin',
      name: 'login',
      component: () => import('./views/Login.vue')
    }, {
      path: '/logout',
      name: 'logout',
      component: () => import('./views/Logout.vue'),
      meta:{
        needLogin:true,
      }
    },{
      path: '/user/editArticle',
      name: 'article-eidt',
      component: ()=> import('./views/article/EditArticle.vue'),
      meta:{
        needLogin:true,
      }
    },
    {
      path: '/article/:id',
      name: 'article-view',
      component: ()=> import('./views/article/ViewArticle.vue'),
      props:true,
    },
    {
      path:'*',
      name:'page404',
      component: ()=> import('./views/Page404.vue')
    }
  ]
})
