<template lang="html">
  <div class="platform_trading">
    <p class="platform_trading_title">平台担保交易流程</p>
    <div class="pic_trad">
      <img src="../../static/img/trading_top.png" alt="">
    </div>
    <div class="platform_trading_mes">
      <div class="mes_left">
        <ul>
          <li>支付方式：</li>
          <li>交易方式：</li>
          <li>买卖联系人：</li>
          <li>联系方式：</li>
          <li>年化利率：</li>
          <li>每10w加：</li>
          <li>总额：</li>
        </ul>
      </div>
      <div class="mes_right">
        <ul>
          <li>买卖双方协商，银行转账</li>
          <li>平台担保交易</li>
          <li><input type="text" value="" placeholder="派大星" /></li>
          <li><input type="text" value="" placeholder="13240891337" style="margin-top:-50%!important;" /></li>
          <li style="margin-top:-1.5%;">9%</li>
          <li style="margin-top:7%!important;">2000</li>
          <li style="margin-top:7.3%;">94.34w</li>
        </ul>
      </div>
    </div>
    <p class="pay">担保交易专席客服联系方式 010-43435454/13400994433</p>
    <p style="width:70%;margin-left:10%;font-size:14px;color:red;margin-top:2%;">平台担保手续费：担保费万分之5，比如每10万收费50元，每100万收费500元，5000封顶</p>
    <div class="pic_trad_bot">
      <img src="../../static/img/trading_bot.png" alt="">
    </div>
    <p class="have_look"><button type="button">查看订单进度</button></p>
    <p class="have_look"><button type="button">查看交易进度</button></p>
    <p class="have_look"><button type="button">去提醒买家确认</button></p>
    <p class="have_look"><button type="button">重新挑选买家</button></p>
    <p class="have_look"><button type="button">刷新进度</button></p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.platform_trading{
  width: 100%;
  height:100%;
  padding-top:3%;
  min-width: 934px;
  .platform_trading_title{
    width: 100%;
    text-align: left;
    font-size:18px;
    font-weight: bold;
    padding-left:6%;
  }
  .pic_trad{
    width: 100%;
    height:10%;
    text-align: left;
    padding-left:8%;
    margin-top:3%;
    img{
      width: 75%;
      height:80%;
    }
  }
  .platform_trading_mes{
    width: 70%;
    height:300px;
    margin-left:8%;
    display: flex;
    margin-top:4%;
    min-height:274px;
    .mes_left{
      width: 50%;
      height:100%;
      ul{
        width: 100%;
        padding-top:7%;
        li{
          text-align: right;
          font-size: 14px;
          margin-bottom: 6%;
        }
      }
    }
    .mes_right{
      width: 50%;
      height:100%;
      ul{
        width: 100%;
        padding-top:7%;
        li{
          text-align: left;
          font-size: 14px;
          margin-bottom: 6%;
          input{
            height:22px;
            border:1px solid #ccc;
          }
          input:nth-child(1){
            margin-top:-1%;
          }
        }
      }
    }
  }
  .pay{
    width: 70%;
    margin-left: 8%;
  }
  .pic_trad_bot{
    width: 100%;
    height:10%;
    text-align: left;
    padding-left:8%;
    margin-top:3%;
    img{
      width: 80%;
      height:80%;
    }
  }
  .have_look{
    width: 70%;
    height:4%;
    text-align: center;
    margin-left: 8%;
    margin-top:2%;
    button{
      width: 40%;
      height:100%;
      background:linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
      border-radius: 8px;
      color:white;
      margin-top: 4%;
    }
  }
}
</style>
