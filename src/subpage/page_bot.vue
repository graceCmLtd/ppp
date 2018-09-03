<!-- 首页下 -->
<template lang="html">
  <div class="page_bot">
    <div class="page_title_In"> <!--流程介绍标题 -->
     <img src="../../static/img/page_title3.png" alt="">
   </div>
   <div class="page_alt_In"> <!--流程介绍详情 -->
    <img src="../../static/img/page_alt1.png" alt="">
   </div>
  <div class="page_alt_Ad"> <!--平台优势 -->
   <img src="../../static/img/page_alt2.png" alt="">
     </div>
   <div class="page_alt_De"> <!--优势详情 -->
    <img src="../../static/img/page_alt3.png" alt="">
  </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.page_bot{
  width: 100%;
  height:auto;
  background: red;
  .page_title_In{
    width: 100%;
    height:300px;
    min-height: 300px;
    img{
      width: 100%;
      height:100%;
    }
  }
  .page_alt_In{
    width: 100%;
    height:688px;
    img{
      width: 100%;
      height:100%;
    }
  }
  .page_alt_Ad{
    width: 100%;
    height:740px;
    img{
      width: 100%;
      height:100%;
    }
  }
  .page_alt_De{
    width: 100%;
    height:540px;
    img{
      width: 100%;
      height:100%;
    }
  }
}
</style>
