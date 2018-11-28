<template lang="html">
  <div class="rongbao_cn">
   <div class="rongbao_cn1">

    <div  ref = 'mydiv'>
      <form id="rongpaysubmit" name="rongpaysubmit" target="winname1" v-model="theUrl" :action="getUrl" >
      <input type="hidden" name="merchant_id" v-model='merchant_id' value="">
      <input type="hidden" name="data" v-model='data' value="">
      <input type="hidden" name="encryptkey" v-model='encryptkey' value="">
      <input type="submit" class="button_p2p" value="融宝支付确认付款"  ref='mybutton'>

<!--     <form id="rongpaysubmit" name="rongpaysubmit" action="">
      <input type="hidden" name="merchant_id" value=""><br>
      <input type="hidden" name="data" value=""><br>
      <input type="hidden" name="encryptkey" value=""><br>
      <input style="background:rgb(241, 87, 73); color:#fff;" type="submit" class="button_p2p" value="融宝支付确认付款" @click="btn"><br> -->

    </form>

    </div>
    
   <!--  <button id="test1" @click="clicktest">ggg</button> -->

    <!-- <button @click="openWin">融宝支付确认付款</button> -->
<!-- <form id="rongpaysubmit" name="rongpaysubmit" action="http://testapi.reapal.com/web/portal" method="post"><input type="hidden" name="merchant_id" value="100000000000147"/><input type="hidden" name="data" value="mcPDMZVPvtWt+rsZPmTHouoAKkAyoG3dr+FX/AiWifWWTrcXHmHdwHaaR9IwQm67wsWbc48R8CV7fXPHOdfZ7lpf3UxHR7Z4IxpWMfbVBzHdSy+5A6mA3ZxKor1hMnbGR0U9HZ0Ax4uCrb4mVRQdTDzejrWEn0P/xO4FOjFWtc5RbfE97VWPKJNzti/W1cbzIOVcpm/FQMWdD15BmauFN7PmglkCIrBrd/6/s70cNedHjQRhd+zTI6EGxxPbA/BT/2z6m/CrxxyylqoywHdcwr60A3E2uon16/4oeZd+sLWKYUC/iFnxNfTlw1xFIC2GgTWOiQVvhJRpLIzwtlbo9Z4TTKDXIDR3iQQN7JB/VVKlMxvONn4pI+mZDgfpHl7XiUEX4BbJWHUeDQOExeHSrjqkjLqRgeH8K7bHbSgv9RbWW96bYJZEfWMAAbKWOasav6I27ckotNrY16tuy5rCu70CXQ8mvgeGjQr/KIpjsJ9gPlkKbQzN1HpMbBKIewGjlNfMSnvSO6q7szFz+5Oq7SaLcGZ9irLNSHvFUNB+8gQjJgwLJ3+6qZCHmYkhrmIjd9CkVSrCX62XohKjxbgcYiItj/evMchxuJpkzoOEm/7oqa1WLO/yiy4LeivpJa2X"/><input type="hidden" name="encryptkey" value="FfbgoTGt1CDXF9XPzGKrcRywrHSRzWS2PVOOio7rb9ZSVgu2aE0iViBNrdhBRGIBFjxwhgFp/P30FglQBTR9enUiEbpp8yQ4+ls3fFrgdyHMQ1Fx050+SjzGu00dNsAfDKcSQWeP8PRD/LIENxHBjIPV0RzKOT7g0ILuArD9AN6XNQP+3jXOl9JxyeMGLN5rLxL4TMnDs7tJeVMrmKxxSK/n2jGO2MVm5pHPD3H08RiMpSdUDOBjllTNQ1sw3Okrwinw/gNFYR6V1ByK/wpYp1pUG/kTXZEbZrtwAE5Hl+1jmGM2S6AKlC/srL6YHYGZejVQD4IoM7xSJgqpxY5zDQ=="/><input type="submit" class="button_p2p" value="融宝支付确认付款"></form> -->


  </div> <el-dialog 
  title="提示"
  :visible.sync="dialogVisible"
  width="30%">
   <span>您即将离开本站网页跳转到银行支付页面，继续支付请点击确认</span>
   <span slot="footer" class="dialog-footer">
    <el-button @click="canclePay">取 消</el-button>
    <el-button type="primary" @click="goAndPay">确 定</el-button>
  </span>
 </el-dialog>
    
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
      htmlcontent:{},
      merchant_id:'',
      data:'',
      encryptkey:'',
      theUrl:'',
      dialogVisible:true,
      flag:false
    }
  },
  methods: {
        sss:function(){
          let _this = this

          console.log(_this.item.transacType)
          console.log(_this.item.billNumber)
          console.log(_this.item.sellerId)
          console.log(_this.item.buyerId)
          console.log(_this.item.amount)
          _this.fetch.myPost("/transaction/reaPay",{
              "transacId":_this.item.transacType,
              "billNumber":_this.item.billNumber,
              "sellerId":_this.item.sellerId,
              "buyerId":_this.item.buyerId,
              "amount":_this.item.amount//_this.item.amount
            },{headers:{
              Authentication:_this.util.getCookie("Too"),
              uuid:_this.util.getCookie('Iud')
            }}).then((res)=>{
              console.log("[[[[[[[[[[[[[[[[[[[[[[[[[")
              console.log(res.data)
              console.log(this)
              _this.merchant_id = res.data.merchant_id;
              _this.data = res.data.data;
              _this.encryptkey= res.data.encryptkey;
              _this.theUrl = res.data.url
              //_this.$emit('openWin')
              document.getElementById('rongpaysubmit').action=res.data.url
              console.log("the url :")
              console.log(_this.theUrl)
              console.log("mybutton////////")
             /* _this.flag = true*/
              //_this.$ref.gggg = res.data.data
             /* let temp = '<!DOCTYPE html> <html> <script>var t=setTimeout("autoclick",3000); function autoclick(){alert("dffccc"); document.getElementById("rongpaysubmit").submit();} window.onload = function(){alert("aaa")}<\/script><body onload="autoclick()">' + res.data.data + '<button>tttttt</button><\/body> <\/html>'
              console.log(temp)
              _this.htmlcontent['content'] = temp*/
              
              /*var timer = window.setInterval(function(){
                _this.openWin();
                window.clearInterval(timer)
              },4000)*/
              //document.getElementById('rongpaysubmit').submit()
              //document.getElementById('clicktest').click
            })

            
        },
        /*取消付款，返回上一页，应该还需要删除数据库表里响应的条，tx_payment*/
        canclePay(){
          this.dialogVisible = false
        },
        getUrl(){
          //alert("get url")
          return this.theUrl
        },
        goAndPay(){
          dialogVisible:false
          this.clicktest()
        },
        /* openwin() {
            window.open("about:blank","winname1","width=800,height=500");
            document.getElementById('rongpaysubmit').submit()
          },*/
         /*openWin(){
              var myWindow=window.open();
              console.log("[[[[[]]]]]]]]]]")
              console.log(myWindow)
              myWindow.document.write(this.htmlcontent['content']);
              myWindow.setTimeout(function(){
                alert('tttttt')
              },3000) 
              myWindow.focus();
        },*/
        clicktest(){
          //alert("fbbbbb")
          document.getElementById('rongpaysubmit').submit()
        }/*,

        clickIF(){
          if(this.flag){
            this.clicktest()
          }
        }*/

    },
    mounted(){
      //this.clicktest()
      //this.openwin()
    },
  created () {
    /*this.$api.get('/ppp/transaction/reaPay', null, r => {
      console.log(r.data)
    })*/
    console.log("sfasfallllllllllllllllllllllllll")
    
    this.item = this.$route.query
    console.log(this.item)
    this.sss();

    //console.log("clicktest666666666666666666666666666666")
    //var tt = setTimeout(this.clickIF(),3000)
    //window.open("http://localhost:8080")
   /* let _this = this*/
    /*var time = window.setInterval(function(){
      console.log("dddddddddddkkkkkkkkkkkkkkkk")
      _this.clickIF()
    },3000)*/
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
