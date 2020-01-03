<template>
    <header id='header'>

        <div class='logo'>

            <span @click="backToHome">www.deepmax.cn</span>
        </div>

      

        <div class='login-form'>
            <div v-if="isLogin">
                <span>{{user.name}}</span>
                 <router-link to="/logout">退出</router-link> 
            </div>
            
        </div>
        <div class="nav">     
            <router-link v-if='isLogin' :to="{name:'article-eidt', query:{id:-1}}"> New Article 🙋‍♂️</router-link>
                 
               
        </div>
       
    </header>
</template>

<script>
import util from '@/utils/loginUtils.js';

export default {
    computed:{
        isLogin: function(){

            const loginUser =  this.$store.state.loginUser;
            return util.isLogin(loginUser);
        },
        user:function(){
            const loginUser =  this.$store.state.loginUser;
            return loginUser;
        }
    },
    methods:{
        backToHome:function(){
            /**
             * 粗暴的跳首页，虽然可能前端报错，但是忽略了。
             */
            this.$router.push({name:'home'})
        }
    }
}
</script>

<style lang="less" scoped>
.nav {
    float: right;
    margin-right: 30px;
}
#header {
    text-align: center;
    height: 30px;
    padding: 15px 0;
    border-bottom: 2px solid #E9EFF3
}
.login-form {
    float: right;

}
.logo{
    font-size: 26px;
    margin-left: 24px;
    float: left;
    &:hover{
        cursor: pointer;
    }
    
}
</style>