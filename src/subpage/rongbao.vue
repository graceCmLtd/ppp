<template lang="html">
  <div class="rongbao_cn">
   <div class="rongbao_cn1">
    <form id="rongpaysubmit" name="rongpaysubmit" action="">
      <input type="hidden" name="merchant_id" value="">
      <input type="hidden" name="data" value="">
      <input type="hidden" name="encryptkey" value="">
      <input type="submit" class="button_p2p" value="融宝支付确认付款" @click="btn">
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
        submit: function() {
          var formData = JSON.stringify(this.user);
          this.$http.post('http://localhost:8088/post', formData).then((response) => {
              console.log(response.data);
          }, (response) => {
          });
        },
        btn(){
          window.open("http://baidu.com","")
        },
    },

  created () {
    this.$api.get('/ppp/transaction/reaPay', null, r => {
      console.log(r.data)
    })
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
      border:1px soild black;
     }
    }
  }
</style>
