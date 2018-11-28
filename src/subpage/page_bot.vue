<!-- 首页下 -->
<template lang="html">
  <div class="page_bot">
    <div class="page_title_In"> <!--流程介绍标题 -->
     <img src="../../static/img/page_title3.png" alt="" style="    width: 100%;">
   </div>
    <div class="page_hott" style="position:reactive;">
      <div class="page_hot">
        <div class="bg_alt1"><img src="../../static/img/bg_alt1.png"></div>
        <div class="bg_alt4"><img src="../../static/img/bg_alt4.png"></div>
        <div class="bg_alt5" style="margin-top:109px;"><img src="../../static/img/bg_alt5.png"></div>
        <div class="bg_alt3" style="margin-top:90px;"><img src="../../static/img/bg_alt3.png"></div>
      </div>
    </div>
    <h1>————金融票据一站式服务————</h1>
    <vue-accordion :items="items" > 

    </vue-accordion>
    </div>
  </div>

</template>

<script>
import {getCookie} from '@/assets/util'
import {vueAccordion} from 'vue-accordion'

  export default {
    components: { vueAccordion },
    data(){
      return {
        items: [
                {
                    title: '——安全——',
                    text: '三方存管担保支付确保票款安全',
                    url: '#',
                    image: '../../static/img/Bitmap4.png',
                },
                {
                    title: '——透明——',
                    text: '资方实时报价收票    价格全透明',
                    url: '#',
                    image: '../../static/img/Bitmap3.png',
                },
                {
                    title: '——互通——',
                    text: '交易双方无间沟通   想砍价就砍价   高效互通',
                    url: '#',
                    image: '../../static/img/Bitmap2.png',
                },
                  {
                    title: '——快速——',
                    text: '票款秒到账   极度快速 贴现体验',
                    url: '#',
                    image: '../../static/img/Bitmap1.png',
                },
              ]
            }
          }

    }



</script>

<style lang="scss" scoped>
  .vue-accordion {
    width: 100%;
    overflow: hidden;
    height: 400px;
    max-width: 1100px;
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
    .vue-accordion ul li a {
      display: block;
      width: 100%;
      z-index: 3;
      padding: 25px 20px;
      box-sizing: border-box;
      color: #fff;
      text-decoration: none;
      transition: all .2s ease;
}

.vue-accordion ul li a h2 {
    text-overflow: clip;
    font-size: 35px;
    text-transform: uppercase;
    margin-bottom: 2px;
}

.page_bot{
   width: 100%;
   height: auto;
   margin-top: 30px;
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
