<template>
    <div class='login-form'>
        <el-form ref='form' v-model='form' label-width='60px'>
            <el-form-item label='用户名'>
                <el-input v-model="form.username" place-holder="please input your name">
                </el-input>
            </el-form-item>
            <el-form-item label='密码'>
                <el-input type='password' v-model='form.password'>
                </el-input>
            </el-form-item>
            <el-form-item >
                <el-button type='primary' @click="toSubmit">Login</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import api from '@/request/api.js';
import axios from 'axios';

export default {
    data(){
        return ({
            form:{
                username: '',
                password: ''
            }
        })
    },
    methods:{
        toSubmit:function(){
            const username = this.form.username;
            const password = this.form.password;
            if(username===''||password===''){
                return
            }
            
            axios.post(api.login.path,{
                name: username,
                password: password,
            }).then(res=>{
                if(res.data && res.data.success){
                    this.$router.push("/");
                    this.$store.commit("setUser", res.data.data);
                    this.$message.success("登录成功！")
                }else{
                    this.$message.error("登录失败！")
                }
            }).catch(err=>{

            })
        }
    }
}
</script>

<style lang="less" scoped>
.login-form {
    width: 300px;
    margin: 50px auto 0 auto;
    border: 1px;
    border-color: gray;
}
</style>