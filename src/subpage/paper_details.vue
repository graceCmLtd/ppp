<template lang="html">
  <div class="paper_details">
    <div class="paper_details_con">
      <p class="paper_details_title">{{acceptor}}</p>
      <div class="paper_mes">
        <div class="mes">
          <p><i style="font-weight:bold; font-style:normal;">票据号码</i>:<span>{{billType}}</span></p>
          <p><i style="font-weight:bold; font-style:normal;">汇票到期日</i>:<span>{{billDate}}</span></p>
          <p><i style="font-weight:bold; font-style:normal;">票面总额</i>:<span>{{amount}}元</span></p>
          <p><i style="font-weight:bold; font-style:normal;">出票日期</i>:<span>{{billTime}}</span></p>
          <p><i style="font-weight:bold; font-style:normal;">剩余天数</i>:<span>{{remainDays}}</span></p>
          <!-- <p>期望利率:<span></span></p> -->
        </div>
        <div class="place">
          <p class="num">请填写你的报价</p>
          <div class="table">
            <p style="font-weight:bold;">报价利率&nbsp;:<input type="text" v-model:value="quoteItems.rate" alt="" ref="interest"/>%</p>
            <p style="font-weight:bold;">每10万加&nbsp;:<input type="text" v-model:value="quoteItems.add_amount" ref="xPerLakh"/>元</p>
            <p style="font-weight:bold;">调整天数&nbsp;:<input type="text" v-model:value="quoteItems.adjustDays"/>天</p>
            <!--<p>计算金额:<input type="text" value="" alt="" ref="amount"/>&nbsp;&nbsp;&nbsp;&nbsp;</p>-->
            <p style="text-align:left; font-weight:bold; padding-left:5px;" ref="amount">
              交易金额:<i style=" font-style:normal; color:#f15749; font-size:16px;letter-spacing:1;">{{interest_rate}}元</i> &nbsp;&nbsp;&nbsp;
                <!-- <i style="background:#f15749;width:100px;height:30px;display:inline-block;font-style:normal;color:white;line-height:30px;text-align:center;border-radius:5px;"><button @click="calculate()" style="background:#f15749;width:100px;height:30px;">计算</button></i> -->
            </p>
            <p><button type="button" @click="detailSprompt()">确认报价</button></p>
          </div>
        </div>
      </div>
      <p class="paper_pic_title">
        <span>汇票图片</span>
      </p>
      <div class="paper_pic">
        <img :class="{'active':isChoose}"  src="../../static/img/banner2.jpg" alt="" ref="billPic" @click="imgScc">
      </div>
    </div>
    <div class="success_mes" ref="success_mes">
      <p class="success_mes_title">您已成功报价</p>
      <p class="success_mes_oper">
        <button type="button" name="button" @click="closeSprompt()">
          <router-link to="/marketpa"> 继续报价
         </router-link>
        </button>
        <router-link to="/release/offer" tag="button">查看我的报价</router-link>
      </p>
    </div>
    <div class="paper_details_mask" v-show="detailsMaskShow">

    </div>
    <Footer :height="minHeight"/>
  </div>
</template>

<script>
import {getCookie} from '@/assets/util'
export default {
  data(){
    return{
      minHeight:'5%',
      detailsMaskShow:false,
      bill:null,
      billType:'',
      billDate:'',
      amount:'',
      billTime:'',
      day:'',
      remainDays:null,
      companyName:"",
      releaserId:null,
      acceptor:null,
      quoteItems:{rate : 0,add_amount : 0,adjustDays : 0},
      interest_rate : 0,
      isChoose:false,
    }
  },
  components:{
    Footer:resolve=>{
      require(['@/components/footer-all'],resolve)
    }
  },
  methods:{
    calculate(){
      console.log("adsddadaddsa");
      let amount = this.amount;
      let remainDay = this.remainDays;
      let rate = this.quoteItems.rate;
      let add_amount = this.quoteItems.add_amount;
      let adjustDays = this.quoteItems.adjustDays;
      if(rate === '' && add_amount === '' && adjustDays === ''){
        this.interest_rate = 0
      }else{
        let interest = (amount*(rate/100)*(remainDay+adjustDays))/360+(amount/100000*add_amount);
        let realValue = Number(amount - interest).toFixed(2);
        this.interest_rate = realValue;
      }
    },
    detailSprompt(){
      let _this=this;
      let amount=this.$refs.amount.value;
      let interest=this.$refs.interest.value;
      let xPerLakh=this.add_amount;
      let Id=getCookie('Iud')
      if(_this.interest_rate === 0){
        alert('请先计算交易金额！')
      }else{
        console.log("报价用户id：")
        console.log(Id)
        _this.axios.get(_this.oUrl+'/quote/getByBillNumberAndQuoterId?billNumber='+this.billType+'&quoterId='+Id).then((res)=>{
            console.log(res.data);
            if(res.data.length === 0 ){
              _this.axios.post(_this.oUrl+'/quote/addQuote',{
                "quoteEntity":{
                  "billNumber":_this.bill,//票号
                  "quoterId":Id,//用户Id
                  "quoteAmount":amount,
                  "interest":interest,//利率
                  "xPerLakh":xPerLakh,//每10w加
                  "status":"报价中",
                  "quoteDate":"2018-08-09",//报价时间
                  "real_money" : _this.interest_rate
                },
                "message":{
                  "msgType":"系统",
                  "senderId":Id,
                  "receiverId":_this.releaserId,
                  "msgContent":"有新报价",
                  "flag":"0",
                  "path":"/release/offer/offerPrices"
                }
                  
                }).then((res)=>{
                  console.log(res)
                  this.detailsMaskShow=true;
                  this.$refs.success_mes.style.display="block";
                  setTimeout(()=>{
                    this.$refs.success_mes.style.top="30%";
                    this.$refs.success_mes.style.opacity="1";
                  })
                })
              }else{
                alert("您已对该票据报价！");
              }
        });
        
      }
    },
    closeSprompt(){
      this.$refs.success_mes.style.top="15%";
      this.$refs.success_mes.style.opacity="0";
      setTimeout(()=>{
        this.$refs.success_mes.style.display="none";
        this.detailsMaskShow=false;
      },200)
    },
    getBill(){//获取票号
      this.bill=this.$route.query.bills;
      this.axios.get(this.oUrl+'/bills/getbillr?billNumber='+this.bill).then((res)=>{
        console.log(res)
        this.billType=res.data[0].billNumber;
        this.billDate=res.data[0].maturity;
        this.amount=res.data[0].amount;
        this.billTime=res.data[0].releaseDate;
        this.remainDays=res.data[0].remain_days;
        this.releaserId = res.data[0].releaserId;
        this.acceptor = res.data[0].acceptor;
      })
    },
    getPics(){
      let _this=this;
      _this.axios.get(_this.oUrl+'/bills/getBillPics?billNumber='+_this.bill).then((res)=>{
        console.log()
        _this.$refs.billPic.src=res.data[0].pic1;
      })
    },
    getCompanyInfo(){
      let _this=this;
      _this.axios.get(_this.oUrl+'/bills/getCompany?contactsId='+_this.releaserId).then((res)=>{
        console.log(res)

      })
    },
    imgScc:function () {                     
        this.isChoose = !this.isChoose     
     },

  },

  created(){
    this.getBill()
  },
  mounted(){
     this.getPics()
  },
  watch:{
    quoteItems: {
      handler: function (val, oldVal) {
          //console.log("quoteItems.adjustDays:"+val.adjustDays,oldVal.adjustDays); 
          console.log("ccvvvxx"+this.quoteItems.add_amount+"-"+this.quoteItems.adjustDays);
          this.calculate();
       },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
  a{
     text-decoration: none; 
     color:#fff;
  }
.paper_details{
  width: 100%;
  height:100%;
  min-height: 900px;
  .paper_details_con{
    width: 70%;
    height:100%;
    margin-left: 15%;
    padding-top:4%;
    .paper_details_title{
      width: 100%;
      text-align: left;
      font-size: 20px;
      letter-spacing:1px;
    }
    .paper_mes{
      width: 100%;
      height:40%;
      margin-top: 2%;
      display: flex;
      .mes{
        width: 50%;
        height:100%;
        display: flex;
        flex-direction:column;
        justify-content: space-around;
        p{
          width: 100%;
          text-align: left;
          font-size: 14px;
          padding-left:2%;
          span{
            margin-left:4%;
          }
        }
      }
      .place{
        /*width: 50%;*/
        /*height:100%;*/
        width: 450px;
        height: 350px;
        min-height: 300px;
        position: relative;
        background: url("../../static/img/jigou.png");
        padding-left:10%;
        padding-top:3%;
        .num{
          font-size: 20px;
          width: 80%;
          color:white;
          font-weight: bold;
          margin-left: -9px;
        }
        .table{
          width: 400px;
          height: 260px;
          min-height: 170px;
          min-width: 388px;
          position: absolute;
          background: white;
          top: 23%;
          left: 8%;
          padding-left: 10%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          flex-direction: column;
          justify-content: space-around;
          box-shadow:0px 2px 10px 0px rgba(241,87,73,0.5);
          border-radius:4px;

          p{
            width: 80%;
            font-size: 14px;
            input{
              width: 60%;
              border:1px solid black;
              min-height:26px;
              margin-left:10%;
              font-size: 16px;
            }
            button{
              width:348px;
              height:50px;
              background:rgba(241,87,73,1);
              box-shadow:0px 2px 4px 0px rgba(241,87,73,0.5);
              border-radius:4px;
              font-weight:bold;
              color:rgba(255,255,255,1);
              line-height:26px;
              font-size: 18px;
              margin-left: -16px;
            }
          }
        }
      }
    }
    .paper_pic_title{
      width: 100%;
      text-align: left;
      border-bottom: 2px solid #F15749;
      margin-top:3%;

      span{
        width: 150px;
        height: 48px;
        background: #f15749;
        line-height: 48px;
        text-align: center;
        color: #fff;
        font-weight: bold;

      }
    }
    .paper_pic{
      width: 70%;
      height:45%;
      margin:0 auto;
      margin-top: 4%;
      margin-bottom:5%;
      position: relative; 
      text-align: center;
      cursor: pointer;

      img{
        width: 100%;
        height:100%;
        transform: scale(1);          
        transition: all ease 0.5s; 
      }
      img.active {     
       transform: scale(1.5);    
       position: absolute;          
       z-index: 100;
       left:-3%;
      }  
    }
  }
  .success_mes{
    width: 30%;
    height:30%;
    position: absolute;
    background: white;
    top:15%;
    left:50%;
    margin-left:-250px;
    z-index: 502;
    transition: all .5s;
    display: none;
    opacity:0;
    .success_mes_title{
      width: 100%;
      height: 60%;
      line-height: 230px;
      font-size: 16px;
      font-weight: bold;
      color:#FF0000;
    }
    .success_mes_oper{
      width: 100%;
      padding-top:5%;
      button{
        padding:1%;
        border-radius:5px;
        background: linear-gradient(180deg,rgba(254,126,89,1),rgba(252,72,45,1));
        color:white;
      }
      button:nth-child(1){
        margin-right:10px;
        width:102px;
      }
      button:nth-child(2){
        margin-left: 20px;
      }
    }
  }
  .paper_details_mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    top:0;
    left:0;
    z-index: 501;
  }
}
</style>
