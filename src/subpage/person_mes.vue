<!-- 用户消息 -->
<template lang="html">
  <div class="person_mes">
    <p class="mes_search">
      <input type="text" name="" value="">
    </p>
    <p class="mes_title">
      <span>消息列表</span>
    </p>
    <ul class="mes_list">
      <li>
        <span class="user_pic">
          <img src="../../static/img/title.png" alt="">
        </span>
        <span style="margin-left:10%;">您的报价（500W 10% **／10W）已被卖家接受，点击</span>
        <button type="button" name="button">查看详情</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.person_mes{
  width: 100%;
  height:100%;
  padding-top:8%;
  .mes_search{
    width: 100%;
    text-align: right;
    input{
      width: 30%;
      height:26px;
      border:1px solid #ccc;
      border-radius: 15px;
      padding-left:1%;
      box-sizing: border-box;
    }
  }
  .mes_title{
    width: 90%;
    border-bottom:1px solid #999;
    text-align: left;
    margin-left: 10%;
    span{
      padding-bottom:.5%;
      border-bottom:4px solid #FF4329;
      color:#FF4329;
      font-size: 16px;
    }
  }
  .mes_list{
    width: 90%;
    margin-left: 10%;
    li{
      width: 100%;
      height:50px;
      line-height: 50px;
      text-align: left;
      position: relative;
      margin-top:4%;
      font-size: 14px;
      .user_pic{
        width: 50px;
        height:50px;
        background: red;
        position: absolute;
        img{
          width: 100%;
          height:100%;
        }
      }
      button{
        margin-left:2%;
        width: 100px;
        height:30px;
        border-radius:3px;
        background:linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
        color:white;
      }
    }
  }
}
</style>
