<template>
    <div class='a-list' v-if="data!=null &&data!=undefined">
            <div class ='article' 
                @click="jumpToArticleDetailPage(it.id)"
                v-for='it in data.content' :key="it.id">
                <p class='ac-title'>{{it.title}}</p>
                <p class='ac-subtract'>{{it.subtract}}</p>
                <p class='ac-date'>{{it.createTime}}</p>
            </div>
            <div style="margin-top:15px">
                <el-pagination  
                    :center="true"
                    background
                    layout="prev, pager, next"
                    @current-change="pageChange"
                    @pre-click="pageChange"
                    @nextclick="pageChange"
                    :current-page="getNowPage()"
                    :total="total"
                    :page-size="size">
                </el-pagination>
            </div>
            
    </div>
</template>

<script>
import api from '@/request/api.js';
import axios from 'axios';

export default {
    data(){
        return ({
            data:null,
            size:10,
        })
    },
    mounted(){
        this.pull(this.getNowPage(), this.size);
    },
    computed:{
        userId:function(){
            const u = this.$route.params.userId;
            return u ;
        }
    },
    beforeRouteUpdate:function(to, from,next){
        next()
        this.pull(this.getNowPage(), this.size);
    },
    methods:{
        getNowPage:function(){
            const qpage = this.$route.query.page;
            return qpage || 1;
        },
        jumpToArticleDetailPage:function(id){
            this.$router.push({name:'article-view', params:{id:id}});
        },
        pull:function(page,size){
            page--;
            const userId = this.userId;
            const url = api.articleList.path.replace('{userId}',userId);
            axios.get(url, {
                params:{
                    page:page,
                    size:size,
                }
            }).then(res=>{
                this.data = res.data.data;
                this.total = this.data.total;
            });
        },
        pageChange : function(data){
            const query = {page:data}
            this.$router.push({name:"article-list", params:{userId:this.userId}, query:query});
        }
    }
}
</script>
<style lang="less" scoped>
.article {
    font-size: 20px;
    margin-left: 10px;
    margin-top: 5px;
    border-bottom: 1px solid #E9EFF3;
    &:hover{
        cursor: pointer;
        .ac-title {
            color: #00A0FF;
            transition:.2s;
            font-weight: 600;
        }
    }
    .ac-subtract {
        font-size: 16px;
        line-height: 25px;
    }
    .ac-date{
        color: #2B5F72;
        font-size:12px;
        margin-top: 2px;
        margin-bottom: 6px;

    }
    
  
}


</style>