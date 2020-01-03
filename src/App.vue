<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  components:{
    Header,
    Footer,

  }
}
</script>

<style lang="less" scoped>
#app {
  color: #323232;
  font-size: 19px;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Microsoft YaHei","华文细黑",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-weight: 340;
  line-height: 32px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 800px;
  margin: 0 auto;
}

</style>
