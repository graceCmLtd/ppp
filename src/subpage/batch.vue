<!-- 批量修改 -->
<template lang="html">
    <div class="batch_w">
      <div class="box_w">
        <ul>
          <li>
            <a href="#"><img src="../../static/img/1.png"></a>
            <p class="p_1">等待买家付款</p>
            <div class="p_2">
              <p>倒计时  <i style="color:#F15749;  font-style:normal;">00:10:00</i></p>
              <p>买家超时未打款将取消交易</p>
              <p>专属客服电话：<i style="color:#F15749;  font-style:normal; font-weight:normal;">010-4956324</i></p>
              <p>买家电话：<i style="color:#F15749;  font-style:normal;  font-weight:normal;">17600651266</i></p>
            </div>
          </li>
          <li>
            <a href="#"><img src="../../static/img/2.png"></a>
            <p class="p_1">等待买家付款</p>
            <div class="p_2" style="padding-left:2px;">
              <p>背书剩余时间 <i style="color:#F15749;  font-style:normal;">00:10:00</i></p>
              <p>过时将取消交易</p>
              <p style="width:100px;height:30px;background:#F15749;box-shadow:0px 2px 4px 0px #F15749;border-radius:4px; color:#fff; text-align:center;margin:0 auto;margin-top:20px;">我已背书</p>
            </div>
          </li>
          <li>
            <a href="#"><img src="../../static/img/3.png"></a>
            <p class="p_1">等待买家付款</p>
            <div  class="p_2" style="padding: 23px 43px;">
              <p>等待卖家确认</p>
              <p>倒计时<i style="color:#F15749;  font-style:normal;">00:10:00</i></p>
            </div>
          </li>
          <li style="margin-left:50px;">
            <a href="#"><img src="../../static/img/4.png"></a>
             <p class="p_1">等待买家付款</p>
            <div class="p_2" style="padding: 23px 43px;">
              <p>买家确认背书成功 </p>
              <p>请卖家确认收款</p>
            </div>
          </li>  
          <li style="margin-left:256px;">
            <a href="#"><img src="../../static/img/5.png"></a>
            <p class="p_1">等待买家付款</p>
            <div class="p_2">
              <p style="font-size:36px;font-family:MicrosoftYaHei-Bold;font-weight:bold;color:#F15749;line-height:95px;text-align:center;">交易完成</p>
            </div>
          </li>

        </ul>
      </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .batch_w{
    width: 100%;
    height:100%;
    margin-top:44px;
    .box_w{
      width:1000px;
      height:700px;
      margin:0 auto;
      box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
      background:url(../../static/img/bg_color.png);
      li{
        float:left;
        margin: 43px 35px;
        .p_2{
          margin-top:10px;
          width:260px;
          height:110px;
          background:rgba(255,255,255,1);
          box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
          border-radius:4px;
          text-align:left;
          p{
            font-size:16px;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:26px;
            padding:0 21px;

          }

        }
        .p_1{
          font-size:14px;
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:rgba(255,255,255,0.5);
          line-height:19px;
        }
      }
    }
  }
</style>
