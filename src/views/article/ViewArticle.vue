
<template>
    <div>
        
        <div v-if='article!=null'>
            <div class='right'>
                <el-button v-if='article.currentUser'  @click="toEdit">编辑</el-button>
            </div>
          
            <Article :title="article.title"
            :date="article.date"
            :content="article.content" />

            
        </div>
    </div>
</template>

<script>

import api from '@/request/api.js';
import axios from 'axios';
import Article from '@/components/Article.vue';

export default {
    props:['id'],
    components:{
        Article,
    },
    mounted:function(){
        const id = this.id;
        const url = api.article.path.replace("{id}",id);
        axios.get(url).then(res=>{
            const data = res.data;
            this.article = data.data;
            
        })
    },
    data(){
        return ({
            article:null,
        })
    },
    methods:{
        toEdit:function(){
            this.$router.push({name:'article-eidt',query:{id:this.article.id}})
        }
    }
}
</script>

<style lang="less" scoped>
.right {
    margin-top: 5px;
    margin-left: 50px;
}
code{
    background: grey;
}

</style>