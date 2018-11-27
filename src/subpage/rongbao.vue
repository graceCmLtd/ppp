<template lang="html">
<!--   <div class="rongbao_cn">
   <div class="rongbao_cn1">
    <form id="rongpaysubmit" name="rongpaysubmit" action="">
      <input type="hidden" name="merchant_id" value=""><br>
      <input type="hidden" name="data" value=""><br>
      <input type="hidden" name="encryptkey" value=""><br>
      <input style="background:rgb(241, 87, 73); color:#fff;" type="submit" class="button_p2p" value="融宝支付确认付款" @click="btn"><br>
    </form>
  </div>
  </div>  -->
  <div>
    <span v-html="htmlcontent">{{htmlcontent}}</span>
  </div>
</template>
<script>
 export default {
  data(){
    return{
// <<<<<<< HEAD
  //   }
  // },
  // methods: {
  //   btn:function(palce,post,level){
  //     var self=this;
  //     this.$http.get({
  //       url:"/ppp/transaction/reaPay",
  //       data:{
  //         place:place,
  //         post:post,
  //         level:level
  //       }
  //     }).then(function(res){
  //       self.recruitment=[];
  //       for(var i=0, len=res.data.result.length;i<len;i++){
  //         var slefDate=res.data.result[i];
  //         self.recruitment.push(slefDate);
  //       }
  //     })
  //   },
// =======
      item:'',
      htmlcontent:''
    }
  },
  methods: {
        /*submit: function() {
          var formData = JSON.stringify(this.user);
          this.$http.post('http://localhost:8088/post', formData).then((response) => {
              console.log(response.data);
          }, (response) => {
          });
        },
        btn(){
          window.open("http://baidu.com","")
        },*/
        /*submit: function() {
          //var formData = JSON.stringify(this.item);
          let _this = this
          _this.fetch.httpPost({
            url:'/transaction/reaPay',
            data:{
              transacId:_this.item.transacId,
              billNumber:_this.item.billNumber,
              sellerId:_this.item.sellerId,
              buyerId:_this.item.buyerId,
              amount:_this.item.amount
            }
          }).then((response) => {
              console.log(response.data);
              this.htmlcontent = response.data;
          })
        },*/
        sss:function(){
          let _this = this
          console.log(_this.item)
          _this.fetch.myPost("/transaction/reaPay",{
              "transacId":_this.item.transacId,
              "billNumber":_this.item.billNumber,
              "sellerId":_this.item.sellerId,
              "buyerId":_this.item.buyerId,
              "amount":_this.item.amount
            },{headers:{
              Authentication:_this.util.getCookie("Too"),
              uuid:_this.util.getCookie('Iud')
            }}).then((res)=>{
              console.log("[[[[[[[[[[[[[[[[[[[[[[[[[")
              console.log(res)
            })
        },
        btn(){
          window.open("http://baidu.com","")
        }
    },

  created () {
    /*this.$api.get('/ppp/transaction/reaPay', null, r => {
      console.log(r.data)
    })*/
    console.log("sfasfallllllllllllllllllllllllll")
    
    this.item = this.$route.query
    console.log(this.item)
    this.sss();

  }
}
  }}
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
