<template lang="html">
  <div class="person_detailed">
    <div class="person_detailed_pic">
      <img src="../../static/img/ping.png" alt="">
    </div>
    <div class="person_detailed_mes">
      <ul class="alt">
        <li>银行监管账号</li>
        <li>担保交易专席客服联系方式</li>
        <li>票据总额</li>
        <li>承兑方</li>
        <li>卖方</li>
        <li>贴现利率</li>
        <li>实付金额</li>
        <li>票据图片</li>
      </ul>
      <ul class="me" >
        <!-- <ul class="alt" > -->
        <li>{{item.bankAccount}}</li>
        <li>4001-521-889</li>
       <!--  <li><input type="text" value=""></li>
        <li><input type="text" value=""></li> -->
        <li>{{item.amount}}</li>
        <li>{{item.acceptor}}</li>
        <li>{{item.companyName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.contactsPhone}}</li>
        <li>{{item.interest}}%+{{item.xPerLakh}}</li>
        <li>{{item.real_money}}</li>
        <li>
<<<<<<< HEAD
          <span class="Is"><img v-bind:src="pic1" width="230px" height="160px"></span>
          <span class="The"><img v-bind:src="pic2" width="230px" height="160px"></span>
=======
          <span class="Is"><img v-bind:src="pic1" width="200px" height="200px"></span>
          <span class="The"><img v-bind:src="pic2" width="200px" height="200px"></span>
>>>>>>> 3a276e17fa6454a25e39e97dfc00336a0205d414
        </li>
        <li>
          <input type="radio" style="width:15px;height:15px;" name="" value="">同意平台担保支付协议
        </li>
      </ul>
       <div style="position: absolute;top: 33%; left: 67%; cursor:pointer;"><img src="../../static/img/9.18.png"></div>
    </div>
    <p class="havelook">
      <button type="button" name="button" @click="acceptOrder()" style="background-color:#F15749; color:#fff; width:237px;height:50px; font-size:20px;">接单去付款</button>
      <!-- <button type="button" name="button">查看交易进度</button> -->
    </p>
    <div class="person_detailed_prompt" ref="detailedPrompt">
      <img src="../../static/img/warning.png" alt="">
      <p class="warning_title">温馨提示</p>
      <p class="warning_alt top">平台不参与担保，风险巨大！</p>
      <p class="warning_alt">强烈建议选择平台担保交易</p>
      <i class="el-icon-close" @click="closeWarning()"></i>
    </div>
    <div class="time_w">
      <div class="time_a">
        <p>倒计时<i> 00:10:00</i>,过时将 取消交易</p>
        <span style="text-align:left;color:#999999; font-size:14px;">请尽快选择平台担保交易，<br> 超时未选择将影响您的平台信用等级，<br> 之后交易将受到限制</span>
      </div>
    </div>
    <el-dialog title="付款" :visible.sync="showDialog">
      <el-button @click="paySuccess">确定</el-button>
      <el-button @click="payCancle">取消</el-button>
    </el-dialog>
    <div class="person_detailed_mask" v-show="detailedMaskShow" @click="closeWarning()">

    </div>

 

  </div>
</template>

<script>
export default {
  data(){
    return{
      detailedMaskShow:false,
      bills:null,
      item:[],
      showDialog:false,
      pic1 : '',
      pic2 : ''
    }
  },
  methods:{
    showWarning(){
      let _this=this;
      _this.axios.post(this.oUrl+'/transaction/payViaPlatform',{
        "transacStatus":"成功",
	       "billNumber":_this.bills
      },
      {headers:{
        'Content-Type':'application/json'
      }}
    ).then((res)=>{
      console.log(res)
      _this.detailedMaskShow=true;
      _this.$refs.detailedPrompt.style.display='block';
      setTimeout(()=>{
        _this.$refs.detailedPrompt.style.opacity='1';
        _this.$refs.detailedPrompt.style.top='30%'
      })
    })
    },
    closeWarning(){
      let _this=this;
      _this.$refs.detailedPrompt.style.opacity='0';
      _this.$refs.detailedPrompt.style.top='15%'

      setTimeout(()=>{
        _this.detailedMaskShow=false;
        _this.$refs.detailedPrompt.style.display='none';
      },200)
      /*跳转到最终线下交易流程页面*/
      _this.$router.push({name:'Batch'})
    },
    /*去接单*/
    acceptOrder(){
      //alert("person_detailed 页面，接口待完善")
      let _this = this;
      this.showDialog = true;
    },
    /*付款成功  测试*/
    paySuccess(){
      let _this = this;
        this.showDialog = false;
        this.axios.post(this.oUrl+"/transaction/updateTransacIntentionStatus",{
          billNumber:this.item.billNumber,
          intentionStatus:"已支付,待背书"
        },{headers:{
          'Content-Type':'application/json'
        }}).then((res)=>{
          console.log(res)
        })
        _this.$router.push({
          name:'OrderwsRefused'
        })
    },
    /*取消付款 ，待付款 */
    payCancle(){
      let _this = this;
      this.showDialog = false;
      this.axios.post(this.oUrl+"/transaction/updateTransacIntentionStatus",{
          billNumber:this.item.billNumber,
          intentionStatus:"已接单,待支付"
        },{headers:{
          'Content-Type':'application/json'
        }}).then((res)=>{
          console.log(res)
        })
        _this.$router.push({
          name:'OrderwsRefused'
        })
    },
    getBill(){
      //this.bills=this.$route.query.bills;
      var object = this.$route.query.item;
      if(object instanceof Object){
        localStorage.setItem('item',JSON.stringify(object));
      }
      this.item = JSON.parse(localStorage.getItem('item'));
      console.log(this.item.billNumber);
      var billNumber = this.item.billNumber;
      this.axios.get(this.oUrl+'/bills/getBillPics?billNumber='+billNumber).then((res)=>{
        console.log(res.data);
        if(res.data != ''){
          this.pic1 = res.data[0].pic1;
          this.pic2 = res.data[0].pic2;
        }
      });

      
    }
  },
  created(){
    this.getBill();
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
    .alt{
        text-align: right;
        position: relative;
        left: 16%;
        top: 80px;
      li{
        margin-bottom: 10%;
        font-weight:bold;
      }
    }
    .me{
        text-align: left;
        margin-left: 5%;
        padding-top: .15%;
        font-size: 14px;
        position: relative;
        left: 16%;
        top: 80px;
      li{
        margin-bottom: 10.5%;
        input{
          width: 96%;
          border:1px solid #ccc;
          height:22px;
        }
      }
      li:nth-child(5){
        margin-top:-4%;
      }
      li:nth-child(6){
        margin-top:-5%;
      }
      li:nth-child(7){
        margin-top:-3.5%;
      }
      li:nth-child(8){
        margin-top: -1%;
        a{
          width: 230px;
          height: 160px;
          background-color: #ccc;
          margin-left:20px;
          display:inline-block;
        }
      }
      li:last-child{
        position:relative;
        top: 53px;
        padding-left:10%;
        input{
          position: absolute;
          left:0;
        }
      }
    }
  }
  .havelook{
    text-align: center;
    margin-left: 8%;
    position: relative;
    position: absolute;
    bottom: 31%;
    left: 39%;
    button{
      min-width: 25%;
      min-height: 40px;
      background:linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
      color:white;
      border-radius: 3px;
      font-size: 15px;
    }
    button:nth-child(1){
      background: white;
      border:1px solid #FE5035;
      color:#FE5035;
      margin-right:20px;
    }
  }
  .person_detailed_mask{
    width: 100%;
    height:100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    top:0;
    left:0;
    z-index: 500;
  }
  .person_detailed_prompt{
    width: 300px;
    height:200px;
    background: white;
    position: absolute;
    top:15%;
    left:50%;
    opacity: 0;
    display: none;
    margin-left:-150px;
    z-index: 501;
    padding-top:1%;
    transition: all .5s;
    img{
      width: 60px;
      height:60px;
    }
    p{
      color:#ff2200;
    }
    .warning_title{
      width: 100%;
      color:#FF2200;
      font-weight: bold;
      font-size: 16px;
      margin-top:2%;
    }
    .warning_alt{
      width: 100%;
      font-size: 14px;
      color:#FF2200;
    }
    .top{
      margin-top: 5%;
    }
    i{
      position: absolute;
      right:2%;
      top:2%;
      cursor:pointer;
    }
  }
}
.time_w{
  width:310px;
  height:193px;
  box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
  background:url(../../static/img/jigou.png);
  border-radius:4px;
  position:absolute;
  right: 236px;
  top: 157px;
  .time_a{
    width:290px;
    height:160px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
    border-radius:4px;
    margin:18px auto;
    p{
       font-weight:bold;
       padding: 26px 2px;
      i{
       font-style:normal;
       color:#F15749;
    }
    }
    

  }
}

</style>
