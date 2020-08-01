
<style lang="less" scoped>
.edit-input {
    width: 720px;
}


</style>


<template>
    <div>   
        <p>Current id is {{currentId}}</p>
        <el-form ref='form' :rules="rules" :model='form' label-width='80px'>
            <el-form-item class='edit-input' label='标题' prop='title'>
                <el-input v-model='form.title'></el-input>
            </el-form-item>
            <el-form-item class='edit-subtract' label='摘要' prop='subtract'>
                <el-input v-model='form.subtract'></el-input>
            </el-form-item>
            <el-form-item label='是否发布'>
                <el-switch
                v-model="form.show"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <el-form-item>
                <div id='w-editor'></div>
            </el-form-item>
            <el-form-item >
                <el-button type='primary' @click="toSubmit">OK</el-button>
            </el-form-item>
            
        </el-form>
    </div>
</template>

<script>

import axios from 'axios'
import api from '@/request/api.js'
import E from 'wangeditor'

export default {
    methods:{
        toSubmit:function(){ 
            if(this.currentId===-1){
                const url = api.newArticle.path;
                this.saveOrUpdateArticle(url, {});
            }else{
                const url = api.editArticle.path.replace("{id}",this.currentId);
                this.saveOrUpdateArticle(url, {id:this.currentId});
            }
        },
        saveOrUpdateArticle:function(url,param){
            

            axios.post(url,{
                subtract: this.form.subtract,
                title: this.form.title,
                content:this.editorContent,
                show:this.form.show,
                ...param,
            }).then(res=>{
                if(res.data.success){
                    this.$message.success("操作成功");
                    this.$router.push({name:'article-list', params:{userId:this.$store.state.loginUser.id}});
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch(err=>{
                this.$message.error("出错了！");
            })
        },
        refresh:function(){
            const nowId = this.currentId;

            if(nowId!==-1){
                 this.loadExistArticle(nowId);
            }else{
                this.form.title = '';
                this.form.subtract = '';
                this.editorContent = '';
                this.form.show=true;
                this.editor.txt.html('');
            }
        },

        loadExistArticle:function(id){
            const url = api.getWhenEditArticle.path.replace("{id}",id);
            axios.get(url).then(res=>{
                const article = res.data.data;
                this.form.title = article.title;
                this.form.subtract = article.subtract;
                this.editorContent = article.content;
                this.form.show = article.show;
                this.editor.txt.html(article.content);
            }).catch(err=>{
                this.$message.error("请求失败");
                this.$router.push("/")
            })
        },
        
        
    },
    data(){
        return ({
            form:{
                title:"",
                subtract: '',
                show:true,
            },
            rules:{
                 subtract: [
                    { required: true, message: '请输入摘要', trigger: 'blur' },
                    { min: 3, max: 128, message: '长度在 3 到 128 个字符', trigger: 'blur' }
                ],
                 title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                    { min: 1, max: 128, message: '长度在 1 到 128 个字符', trigger: 'blur' }
                ],
            },
            editor:null,
            editorContent:'',
        })
    },
    computed:{
        currentId:function(){
            const id = this.$route.query.id;
            return id ? id : -1;
        }
    },
    beforeRouteUpdate:function(){
        this.refresh();
    },
    
    mounted(){
        this.editor = new E("#w-editor");
        this.editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        const acImg = [];
        for(let i=1;i<55;i++){
            acImg.push({
                alt:'[ACFUN'+i+"]",
                src:`//cdnfile.aixifan.com/static/umeditor/emotion/images/ac/${i}.gif`,
                class:"acfun"
            })
        }
        this.editor.customConfig.emotions = [
            {
                title: '图片',
                type: 'image',
                content: acImg,
            },
            {
            title: 'emoji',
            type: 'emoji',
            content: ['😀', '😃', '😄', '😁', '😆']
            }
        ]
        this.editor.create();
        this.refresh();

        const theEditor = document.getElementsByClassName("w-e-text-container");
        if(theEditor && theEditor[0]){
            theEditor[0].style.height = '800px'
        }
        const pics = document.getElementsByClassName("w-e-icon-happy");
        if(pics && pics[0]){
            pics[0].addEventListener("click",function(){
                setTimeout(function(){
                    const imgs = document.querySelectorAll(".w-e-emoticon-container img");
                    if(imgs){
                        imgs.forEach(it=>{
                            it.style.height="65px";
                            it.style.width="75px";
                        })
                    }
                },2000)
            })
        }

    
    }
}
</script>
