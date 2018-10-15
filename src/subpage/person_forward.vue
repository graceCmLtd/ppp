<template lang="html">
  <div class="person_detailed">
    <div class="person_detailed_pic">
      <img src="../../static/img/ping.png" alt="">
    </div>
    <div class="person_detailed_mes">
      <div class="content_w" style="position:relative;">
       <p style="color:#F15749; font-size:20px;">请确认收款信息</p>
       <p>收款账号<i>62394893080495804985</i></p>
       <p>开户行<i>兴业银行北京中关村支行</i></p>
       <p>户名<i>****实业有限公司</i></p>
       <p>担保交易专席客服联系方式<i>010-05968596/13456950695</i></p>
       <p>承兑方<i>{{current_item.acceptor}}</i></p>
       <p>贴现利率<i>{{current_item.interest}}%</i></p>
       <p>每十万扣<i>{{current_item.xPerLakh}}</i></p>
       <p>实收金额<i>{{current_item.real_money}}元 <i style="font-style:normal; color:#F15749;">(已扣除万分之五手续费)</i></i></p>
       <p>票据图片</p>
       <span class="Is"></span>
       <span class="The"></span>
       <p class="agreement"> 
        <input type="radio" style="width:15px;height:15px;" name="" value="">同意碰碰票平台服务协议
       </p>
       <p class="btn_1">
         <a href="">确认提现</a>
         <a href="" style="background:#A6A6A6; margin-left:29px;">取消并返回</a>
      </p>
       <div style="position: absolute; bottom:50%; right: -17%; cursor: pointer;"><img src="../../static/img/9.18.png" alt=""></div>
      </div>
    </div>

 

  </div>
</template>

<script>
export default {
  data(){
    return{
      current_item:[]
    }
  },
  created(){
    console.log(this)
    console.log(this.$route.query.item)
  },
  mounted() {
    console.log(33)
    this.current_item = this.$route.query.item
  },
  watch: {
    '$route': function() {
      console.log(444)
      this.current_item = this.$route.query.item
    }
  }

}
</script>

<style lang="scss" scoped>
.person_detailed{
  width: 100%;
  height:100%;
  .person_detailed_pic{
    width: 100%;
    height:30%;
    img{
      width: 100%;
      height:100%;
    }
  }
}
  .person_detailed_mes{
    width: 92%;
    min-height: 851px;
    margin-left: 2%;
    margin-top: 1%;
    display: flex;
    font-size: 15px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
    position:relative; 
    .content_w{
      margin:0 auto;
      text-align:left;
      margin-top:40px;
      font-size:14px;
      font-weight:bold;
      letter-spacing:1px;
      line-height:45px;
      i{
       font-style:normal;
       font-weight:normal;
       margin-left:40px;

      }
      .Is{
        width:230px;
        height:160px;
        background:#F7F7F7;
      }
      .The{
        width:230px;
        height:160px;
        background:#F7F7F7;
        margin-left:25px;
      }
      .agreement{
        position:relative;
        left:31%;
        top:3%;
      }
      .btn_1 a{
        width:137px;
        height:40px;
        background:#F15749;
        border-radius:4px;
        display:inline-block;
        margin-top:50px;
        line-height:40px;
        font-weight:normal;
        text-align:center;
        position:relative;
        left:20%;
      }
    }
 }


</style>
