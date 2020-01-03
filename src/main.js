import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import util from '@/utils/loginUtils.js';


Vue.config.productionTip = false

/**
 * set global before guards
 * see: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
 */
router.beforeEach((to,from,next)=>{
  
  const needLogin = to.meta.needLogin;
  const isLogin = util.isLogin(store.state.loginUser);
  if(isLogin){
    next();
  }else{
    store.commit("clearUser");
    if(needLogin){
      if(store.state.loginUser){
        alert("登录已过期，重定向到首页");  //有过期用户的，弹出对话框
      }
      next({name:'login'});
    }else{
      next();
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
