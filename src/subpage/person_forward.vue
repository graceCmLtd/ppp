<template lang="html">
  <div class="person_detailed">
    <div class="person_detailed_pic">
      <img src="../../static/img/ping.png" alt="">
    </div>
    <div class="person_detailed_mes">
      <div class="content_w" style="position:relative;">
       <p style="color:#F15749; font-size:20px;">请确认收款信息</p>
       <p>收款账号<i>{{item.bankAccount}}</i></p>
       <p>开户行<i>{{item.bankName}}</i></p>
       <p>户名<i>{{item.companyName}}</i></p>
       <p>担保交易专席客服联系方式<i>4001-521-889</i></p>
       <p>承兑方<i>{{item.acceptor}}</i></p>
       <p>贴现利率<i>{{item.interest}}%</i></p>
       <p>每十万扣<i>{{item.xPerLakh}}</i></p>
       <p>实收金额<i>{{item.real_money/10000}}w <i style="font-style:normal; color:#F15749;">(已扣除万分之五手续费)</i></i></p>
       <p>票据图片</p>
       <span class="Is"><img v-bind:src="pic1" width="230px" height="160px"></span>
       <span class="The"><img v-bind:src="pic2" width="230px" height="160px"></span>
       <p class="agreement"> 
        <input type="radio" style="width:15px;height:15px;" name="" value="">同意碰碰票平台服务协议
       </p>
       <p class="btn_1">
         <span v-on:click="toggle()">确认提现</span>
         <span style="background:#A6A6A6; margin-left:29px;">
          <router-link to="/release/center/completes">取消并返回</router-link>
        </span>
      </p>
       <div style="position: absolute; bottom:50%; right: -17%; cursor: pointer;"><img src="../../static/img/9.18.png" alt="">
       </div>
      </div>
    </div>
    <div class="show_w" v-show="isShow"  @click="hiddenShow()">
      <div class="sure_w">
        请等待查收哦！
      </div>
    </div>
 

  </div>
</template>

<script>
export default {
  data(){
    return{
      item:[],
      pic1 : '',
      pic2 : '',
      isShow:false,
    }
  },
  created(){
    this.getBillInfo();
  },
  methods:{
    getBillInfo(){
      var object = this.$route.query.item;
      if(object instanceof Object){
        localStorage.setItem('item',JSON.stringify(object));
      }
      this.item = JSON.parse(localStorage.getItem('item'));
      console.log(this.item);
      var billNumber = this.item.billNumber;
      this.axios.get(this.oUrl+'/bills/getBillPics?billNumber='+billNumber).then((res)=>{
        console.log(res.data);
        if(res.data != ''){
          this.pic1 = res.data[0].pic1;
          this.pic2 = res.data[0].pic2;
        }
      });
    },
    toggle:function(){
          this.isShow = !this.isShow;
        },
    hiddenShow:function () {
           var that = this;
           that.isShow = false;
     }, 
  }
}
</script>

<style lang="scss" scoped>
.show_w{
  width: 400px;
  height: 150px;
  border-radius:3px;
  background:red;
  background: linear-gradient(180deg, #ff7d55 0%, #ff6f4d 100%);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  position:absolute;
  top:34%;
  left:43%;

  .sure_w{
    width:330px;
    height:100px;
    background:#fff;
    margin:20px auto;
    border-radius:3px;
    line-height:100px;
    font-family:"微软雅黑";
  }
}

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
    .content_w{
      margin:0 auto;
      text-align:left;
      margin-top:40px;
      font-size:14px;
      font-weight:bold;
      letter-spacing:1px;
      line-height:45px;
      i{
       font-style:normal;
       font-weight:normal;
       margin-left:40px;

      }
      .Is{
        width:230px;
        height:160px;
        background:#F7F7F7;
      }
      .The{
        width:230px;
        height:160px;
        background:#F7F7F7;
        margin-left:25px;
      }
      .agreement{
        position:relative;
        left:31%;
        top:3%;
      }
      .btn_1 span{
        width:137px;
        height:40px;
        background:#F15749;
        border-radius:4px;
        display:inline-block;
        margin-top:50px;
        line-height:40px;
        font-weight:normal;
        text-align:center;
        position:relative;
        left:20%;
        color:#fff;
        cursor:pointer;
      }
    }
 }


</style>
