<template lang="html">
  <div class="rongbao_cn">
   <div class="rongbao_cn1">
    <form id="rongpaysubmit" name="rongpaysubmit" action="">
      <input type="hidden" name="merchant_id" value=""><br>
      <input type="hidden" name="data" value=""><br>
      <input type="hidden" name="encryptkey" value=""><br>
      <input style="background:rgb(241, 87, 73); color:#fff;" type="submit" class="button_p2p" value="融宝支付确认付款" @click="btn"><br>
    </form>
  </div>
  </div> 
</template>
<script>
 export default {
  data(){
    return{
    }
  },
  methods: {
    btn:function(palce,post,level){
      var self=this;
      this.$http.get({
        url:"/ppp/transaction/reaPay",
        data:{
          place:place,
          post:post,
          level:level
        }
      }).then(function(res){
        self.recruitment=[];
        for(var i=0, len=res.data.result.length;i<len;i++){
          var slefDate=res.data.result[i];
          self.recruitment.push(slefDate);
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .rongbao_cn{
    width: 100%;
    height:100%;
    margin:0 auto;
    .rongbao_cn1{
     width: 1000px;
     height:800px;
     margin:46px auto;
     input{
      height:30px;
      width:300px;
      border:1px soild #ccc;
      background:#fff;
      cursor: pointer;
     }
    }
  }
</style>
