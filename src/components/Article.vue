<script src="https://cdn.bootcss.com/highlight.js/9.15.10/languages/java.min.js"></script>
<template>
    <div class='ac'>
        <link href="https://cdn.bootcss.com/highlight.js/9.15.10/styles/atom-one-light.min.css" rel="stylesheet">
        <div class='ac-title'>{{title}} </div>
        <p class='ac-date'>{{date}} </p>
        <div class='ac-content' v-html="content"></div>
    </div>
</template>

<script>
export default {
    props:['title','date','content'],
    mounted(){
        document.querySelectorAll('pre code').forEach((block) => {
            window.hljs.highlightBlock(block);
        });
    }
}
</script>

<style lang="less">
.ac{
    .ac-title {
        line-height: 50px;
        margin-bottom: 16px;
        text-align: center;
        font-size: 38px;
        font-weight: 600;
    }
    .ac-date {
        font-size: 14px;
        text-align: center;
        margin-bottom: 10px;
        color: #2F5F72;
    }
    
}
.ac-content {
    code{
        background-color: #F6F6F6;
        font-family: "Source Code Pro",Consolas,Menlo,Monaco,"Courier New",monospace;
    }
    pre {
        font-size: 16px;
        line-height: 20px;
    }
}
</style>