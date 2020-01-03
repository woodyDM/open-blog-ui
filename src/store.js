import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userJson :  window.localStorage.getItem("currentUser"),
    loginUser : window.localStorage.getItem("currentUser") ? JSON.parse(window.localStorage.getItem("currentUser")) : null,
  },
  mutations: {
    setUser:(state, user)=>{
      const loginTime = new Date().getTime();
      user.loginTime = loginTime;
      const json = JSON.stringify(user);
      state.userJson = json;
      state.loginUser = user;
      window.localStorage.setItem("currentUser", json);
    },
    clearUser:(state)=>{
      state.userJson = null;
      state.loginUser = null; 
      window.localStorage.removeItem("currentUser");
    }
  },
})
