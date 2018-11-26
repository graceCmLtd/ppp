<!-- 首页下 -->
<template lang="html">
  <div class="page_bot">
    <div class="page_title_In"> <!--流程介绍标题 -->
     <img src="../../static/img/page_title3.png" alt="">
   </div>
    <div class="page_hott">
      <div class="page_hot">
        <div class="bg_alt1"><img src="../../static/img/bg_alt1.png"></div>
        <div class="bg_alt4"><img src="../../static/img/bg_alt4.png"></div>
        <div class="bg_alt5" style="margin-top:109px;"><img src="../../static/img/bg_alt5.png"></div>
        <div class="bg_alt3" style="margin-top:90px;"><img src="../../static/img/bg_alt3.png"></div>
        <!-- <div class="bg_ys"><img src="../../static/img/ys.png"></div> -->
      </div>
    </div>
    <!--<div class="Authenticat_w">
      <div class="Authenticat_w_1"><img src="../../static/img/4@.png"></div>
    </div> -->
    <div class="vue-accordion" :class="accordionClass" :style="divStyles">
      <!--<ul>
        <li style="border-color: rgb(255, 255, 255); background-image:url(../../static/img/wu.jpg); border-style: solid; border-width: 0px; padding: 10px;">
        <a href="#">
          <h2 style="font-size: 15px; color: white;">1</h2>
          <p style="font-size: 10px; margin-top: 0px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore </p>
        </a>
        </li>
        <li style ="border-color: rgb(255, 255, 255); background-image:url(../../static/img/wu.jpg); border-style: solid; border-width: 0px; padding: 10px;">
        <a href="#">
          <h2 style="font-size: 15px; color: white;">1</h2>
          <p style="font-size: 10px; margin-top: 0px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore </p>
        </a>
        </li>
        <li style =" border-color: rgb(255, 255, 255); background-image:url(../../static/img/wu.jpg); border-style: solid; border-width: 0px; padding: 10px;">
        <a href="#">
          <h2 style="font-size: 15px; color: white;">1</h2>
          <p style="font-size: 10px; margin-top: 0px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore </p>
        </a>
        </li>
        <li style ="border-color: rgb(255, 255, 255); background-image:url(../../static/img/wu.jpg); border-style: solid; border-width: 0px; padding: 10px;">
        <a href="#">
          <h2 style="font-size: 15px; color: white;">1</h2>
          <p style="font-size: 10px; margin-top: 0px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore </p>
        </a>
        </li>
      </ul> -->

     
        <partial-accordion 
        v-for="(item,index) in items" 
        :item="item" 
        :key="index"
        :styles="styles"
      ></partial-accordion>
    </div>
  </div>

</template>

<script>
import {getCookie} from '@/assets/util'
  export default {
    name: 'vue-accordion',
    props: {
      items: {
        type: Array
      },
      styles: {
        type: Object,
        default: function() {
          return {
            accordion:null,
          }
        }
      },
      accordionClass: {
        type: String,
        default: 'vue-accordion-partial'
      }
    },
    computed: {
      divStyles() {
        return this.styles && this.styles.div ? this.styles.div : {};
      }
    },
    components: {
        accordion:resolve=>{
        require(['@/components/vue-accordion-partial'],resolve)
      },
    }
  }
</script>

<style lang="scss" scoped>
/* 手风琴*/
/*.vue-accordion {
   width: 100%;
   overflow: hidden;
   height: 200px;
   max-width: 900px;
}

.vue-accordion ul {
    width: 100%;
    height: 100%;
    display: table;
    table-layout: fixed;
    margin: 0;
    padding: 0;
}

.vue-accordion ul li{
    vertical-align: bottom;
    position: relative;
    height: 100%;
    display: table-cell;
    width: 50%;
    background-repeat: no-repeat;
    background-position: 50%;
    transition: all .5s ease;

    border:1px solid black;
}

.vue-accordion ul li a{
    display: block;
    width: 100%;
    z-index: 3;
    padding: 15px 20px;
    box-sizing: border-box;
    color: #fff;
    text-decoration: none;
    transition: all .2s ease;
    vertical-align: bottom;
    position: relative;
}
.vue-accordion ul li a * {
    opacity: 0;
    margin: 0;
    width: 100%;
    text-overflow: ellipsis;
    position: relative;
    z-index: 5;
    white-space: nowrap;
    overflow: hidden;
    -webkit-transform: translateX(-20px);
    transform: translateX(-20px);
    -webkit-transition: all .4s ease;
    transition: all .4s ease;
}

.vue-accordion ul li a h2 {
    text-overflow: clip;
    font-size: 24px;
    text-transform: uppercase;
    margin-bottom: 2px;
}
.vue-accordion ul li a p{
  width:200px;
  height:300px;
  border:1px soild black;
}
*/
  .vue-accordion {
    width: 100%;
    overflow: hidden;
    height: 200px;
    max-width: 900px;
    border:1px solid black;
    margin:0 auto;
    }

    .vue-accordion ul {
    width: 100%;
    height: 100%;
    display: table;
    table-layout: fixed;
    margin: 0;
    padding: 0;
    }



.page_bot{
   width: 100%;
   height: auto;
    margin-top: 30px;
    background: #fff;
  .page_hott{
    width:100%;
    height:1250px;
    background:url("../../static/img/bg_alt.png");
    background:no-repeact;
    background-size:100% 100%;
    .page_hot{
      padding-top:20px;
      .bg_alt1{
         padding-top:30px;
      }
      .bg_alt4 img  {
        width:100%;
        margin:0 auto;

      }
      .bg_alt5{
          padding-top:20px;
       }
       .bg_ys{
          position: relative;
          bottom: -160px;
       }
    }
  }
}
.Authenticat_w{
  width:100%;
  height:350px;
  margin:0  auto;
  background:url("../../static/img/4@bg.png");
  background:no-repeact;
  background-size:100% 100%;
  .Authenticat_w_1 img{
    width:75%;
    height:300px;
    margin:0 auto;
    margin-top:70px;
  }
}

</style>
