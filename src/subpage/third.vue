<!-- 首页下 -->
<template lang="html">
  <div class="third">
      <div class="box">
        <p>交易id:<input type="text" v-model:value="transacId"/></p>
        <p>票据id:<input type="text" v-model:value="billNumber"/></p>
        <p>卖家id:<input type="text" v-model:value="sellerId"/></p>
        <p>买家id:<input type="text" v-model:value="buyerId"/></p>
        <p>票面金额:<input type="text" v-model:value="amount"/></p>
        <button @click="btn">anwo</button>
      </div>
  </div>

</template>

<script>
 import {getCookie} from '@/assets/util'
 export default {
  data(){
    return{
      transacId:null,
      billNumber:null,
      sellerId:null,
      buyerId:null,
      amount:null,
    }
  },
  methods:{
    btn(){
      window.open('http://baidu.com','b')
    }
  },
  mounted(){
    axios({
         method: 'post',
         url: '/ppp/transaction/yopPayPOST',
         data: {
             transacId: 'transacId',
             billNumber: 'billNumber',
             sellerId: 'sellerId',
             buyerId :'buyerId',
             amount : 'amount'
         }
     }).then(function(data){
         vm.list=data.data.exclude;
    });
  }
}
</script>

<style lang="scss" scoped>
  .third{
    width:100%;
    height:100%;

    .box{
      width:80%;
      height:100%;
      margin:0 auto;
      margin-top:80px;
      font-family: "微软雅黑";
      line-height:50px;
      input{
        border:1px solid #ccc;
        height:30px;
        width:300px;
      }
    }
  }
</style>
