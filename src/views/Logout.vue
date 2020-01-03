<template>
    <div>
        Now logout...
    </div>
</template>

<script>
import api from '@/request/api.js';
import axios from 'axios';
export default {
    mounted:function(){
        axios.post(api.logout.path).then(res=>{
            this.$router.push("/");
            this.$store.commit("clearUser");
            this.$message.success("退出成功");
              
        }).catch(err=>{
            this.$message.error("退出失败，请刷新页面");
        })
    }
}
</script>