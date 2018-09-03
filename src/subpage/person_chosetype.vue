<!-- 选择交易 -->
<template lang="html">
  <div class="person_choseType">
    <p class="choseType_company">恒大地产集团广东房地产开发有限公司</p>
    <p>票据类型：&nbsp;&nbsp;&nbsp;<span>{{billType}}</span></p>
    <p>汇票到期日：&nbsp;&nbsp;&nbsp;<span>{{releaseDate}}</span></p>
    <p>票据金额：&nbsp;&nbsp;&nbsp;<span>{{billAmount/10000}}w</span>w</p>
    <p>出票日期：&nbsp;&nbsp;&nbsp;<span>{{maturityDay}}</span></p>
    <p>剩余天数：&nbsp;&nbsp;&nbsp;<span>113</span>天</p>
    <p>期望利率：&nbsp;&nbsp;&nbsp;<span>10</span>%</p>
    <p class="pic_title">
      <span>汇票图片</span>
    </p>
    <div class="paper_pic">
      <img src="../../static/img/banner2.jpg" alt="" ref="choseTypePic">
    </div>
    <div class="choseType_payMes">
      <div class="mes_left">
        <ul>
          <li>支付方式：<span>买卖双方协商，银行转账</span></li>
          <li>买家联系人：<span>范冰冰</span></li>
          <li>贴现利率：<span>9</span>%</li>
          <li>每十万加：<span>2000</span></li>
        </ul>
      </div>
      <div class="mes_right">
        <ul>
          <li>交易方式：<span>买卖双方协商</span></li>
          <li>联系方式：<span>13240891337</span></li>
          <li>实收金额：<span>94.32</span>w</li>
          <li>总额：<span>95</span>w</li>
        </ul>
      </div>
    </div>
    <p class="choseType_alt">
      担保费万分之5，比如每10万收费50元，每100万收费500元，5000封顶
    </p>
    <p class="choseType_agreement">
      <input type="radio" name="" value="" checked="checked" @click="radioA()" v-show="TypeAgShowT">
      <input type="radio" name="" value="" :checked="checkedB" @click="radioB()" v-show="TypeAgShowB">
      接受担保交易条款
    </p>
    <p class="choseType_turn">
      <button type="button" name="button" @click="palceThink()">提交意向</button>
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      TypeAgShowT:false,
      TypeAgShowB:true,
      checkedB:false,
      billType:null,
      releaseDate:null,
      billAmount:null,
      maturityDay:null,
      billN:null
    }
  },
  methods:{
    radioA(){
      this.TypeAgShowT=false;
      this.checkedB=false;
      this.TypeAgShowB=true;
    },
    radioB(){
      this.TypeAgShowT=true;
      this.checkedB=false;
      this.TypeAgShowB=false;
    },
    palceThink(){
      let _this=this;
      if(!this.TypeAgShowT){
        alert('请先接收担保交易条款')
      }else{
        _this.axios.post(this.oUrl+'/quote/submitIntention',{
          "billNumber":_this.billN,
          "quoteStatus":'卖家确认'
        },
        {headers:{
          'Content-Type':'application/json'
        }}
      ).then((res)=>{
        console.log(res)
        window.history.back()
      })
      }
    },
    receiveBills(){
      let _this=this;
      let bill=this.$route.query.bills
      _this.billN=this.$route.query.bills;
      _this.axios.get(_this.oUrl+'/bills/getbill?billNumber='+bill).then((res)=>{
        console.log(res)
        _this.billType=res.data[0].billType;
        _this.releaseDate=res.data[0].releaseDate;
        _this.billAmount=res.data[0].amount;
        _this.maturityDay=res.data[0].maturity;
        _this.axios.get(this.oUrl+'/bills/getBillPics?billNumber='+bill).then((res)=>{
          console.log(res)
          _this.$refs.choseTypePic.src=res.data[0].pic1;
        })
      })
    }
  },
  mounted(){
    this.receiveBills()
  }
}
</script>

<style lang="scss" scoped>
.person_choseType{
  width: 100%;
  height:auto;
  padding-left:10%;
  padding-top:6%;
  p{
    text-align: left;
    font-size: 14px;
    margin-bottom:2%;
  }
  .choseType_company{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 3%;
  }
  .pic_title{
    width: 80%;
    margin-top:5%;
    border-bottom:1px solid #ccc;
    span{
      padding-bottom:.5%;
      border-bottom:4px solid rgba(254,68,43,1);
      font-size: 16px;
      font-weight: bold;
      color:rgba(254,68,43,1);
    }
  }
  .paper_pic{
    width: 80%;
    min-height: 336px;
    img{
      width: 100%;
      height:100%;
    }
  }
  .choseType_payMes{
    width: 80%;
    height: 180px;
    min-height: 180px;
    display: flex;
    .mes_left{
      width: 50%;
      height:100%;
      ul{
        width: 100%;
        padding-top:10%;
        li{
          text-align: left;
          font-size: 14px;
          margin-bottom: 3%;
          padding-left:17%;
        }
      }
    }
    .mes_right{
      width: 50%;
      height:100%;
      ul{
        width: 100%;
        padding-top:10%;
        li{
          text-align: left;
          font-size: 14px;
          margin-bottom: 3%;
          padding-left:17%;
        }
      }
    }
  }
  .choseType_alt{
    width: 80%;
    text-align: center;
    color:red;
  }
  .choseType_agreement{
    width: 80%;
    text-align: 80%;
    text-align: center;
    position: relative;
    input{
      width: 15px;
      height:15px;
      position: absolute;
      left:38%;
    }
  }
  .choseType_turn{
    width: 80%;
    text-align:center;
    button{
      width: 40%;
      min-height: 30px;
      background: linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
      border-radius:5px;
      color:white;
    }
  }
}
</style>
