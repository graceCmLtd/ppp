<template>
  <div id="app">
    <Header/>
    <router-view class="app_view"></router-view>
    <!-- <div class="footer">
      <Footer/>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      transitionName:'slide-left'
    }
  },
  components:{
    Header:resolve=>{
      require(['@/components/header-all'],resolve)
    },
    Footer:resolve=>{
      require(['@/components/footer-all'],resolve)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height:100%;
  overflow-x: hidden;
}
.footer{
  width: 100%;
  height:32%;
}
.app_view{
  position: absolute;
  left:0;
  top:75px;
}
</style>
