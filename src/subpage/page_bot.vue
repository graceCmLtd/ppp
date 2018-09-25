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
        <div class="bg_ys"><img src="../../static/img/ys.png"></div>
      </div>
    </div>
    <div class="Authenticat_w">
      <div class="Authenticat_w_1"><img src="../../static/img/4@.png"></div>
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
