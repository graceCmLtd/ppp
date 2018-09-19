<!-- 批量修改 -->
<template lang="html">
  <div class="server_w">
    <div class="server_w1">
      <div class="server_w2">
            <p><img src="../../static/img/light.png"></p>
            <p>温馨提示</p>
            <p>海量收票请联系客服</p>
            <p>客服电话：15101699799</p>
            <p>  
              <router-link to="resources">
                返回
              </router-link>
          </p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .server_w{
    width:100%;
    heigh:100%;
    max-width:1200px;
    min-height:700px;
    background:url(../../static/img/bg-server.png);
    margin:0 auto;
    margin-top:15px;
    box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
    position: relative;
    .server_w1{
      width:700px;
      height:500px;
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 32px 0px rgba(241,87,73,0.5);
      border-radius:4px;
      margin: 0 auto;
      position: absolute;
      left: 21%;
      top: 14%;
    .server_w2{
      margin-top:45px;
      line-height:50px;
      p:nth-of-type(2){
        font-size:24px;
        font-weight:bold;
        color:rgba(241,87,73,1);
     }
      p:nth-of-type(3){
        font-size:18px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
     }
      p:nth-of-type(4){
        font-size:18px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
     }
     p:nth-of-type(5){
        width:300px;
        height:50px;
        background:rgba(241,87,73,1);
        box-shadow:0px 2px 4px 0px rgba(249,108,108,0.5);
        border-radius:4px;
        text-align:center;
        line-height:50px;
        color:#fff;
        font-size:20px;
        margin-left: 205px;
        margin-top: 33px;
        cursor: pointer;
     }
     a{
        text-decoration: none;
        color:#fff;
      }
    }
  }
}

</style>
