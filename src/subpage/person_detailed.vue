<template lang="html">
  <div class="person_detailed">
    <div class="person_detailed_pic">
      <img src="../../static/img/ping.png" alt="">
    </div>
    <div class="person_detailed_mes">
      <div class="content_w">
     <!--    <p>银行监管账号 <i>{{item.bankAccount}}</i></p>
        <p>担保交易专席客服联系方式 <i>4001-521-889</i></p>
        <p>票据总额 <i>{{item.amount}}</i></p>
        <p>承兑方 <i>{{item.acceptor}}</i></p>
        <p>卖方 <i>{{item.companyName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.contactsPhone}}</i></p>
        <p>贴现利率 <i>{{item.interest}}%+{{item.xPerLakh}}</i></p>
        <p>实付金额 <i>{{item.real_money}}</i></p> -->
        <p style="font-size:17px;">确认背书户信息</p>
        <p>银行账号:<i>{{list.bankAccount}}</i></p>
        <p>户名:<i>{{list.bankAccountName}}</i></p>
        <p>开户行:<i>{{list.bankName}}</i></p>
        <!-- <p>担保交易专席客服联系方式:<i>4001-521-889 </i></p> -->
        <p>票号：<i>{{item.billNumber}}</i></p>
        <p>票面总额:<i>{{item.amount}}</i></p>
        <p>承兑方:<i>{{item.acceptor}}</i></p>
        <p>卖方:<i>{{item.companyName}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.contactsPhone}}</i></p>
        <p>贴现利率:<i>{{item.interest}}%</i></p>
        <p>每十万加：<i>{{item.xPerLakh}}</i></p>
        <p>实付金额 : <i>{{item.real_money}}</i></p>
        <p>票据图片</p>  
          <span class="Is"><img v-bind:src="pic1" :class="{'active':isChoose}" width="230px" height="160px" @click="imgScc"></span>
          <span class="The"><img v-bind:src="pic2" :class="{'active':isChooses}" width="230px" height="160px" @click="imgSccs"></span>
 <!--        <p class="agreement"> 
          <input type="radio" style="width:15px;height:15px;" value="" :checked="checked" v-show="radioT" @click="radioTC($event)" ref="b"> 
          <input type="radio" style="width:15px;height:15px;"value="" checked="checked" v-show="radioB" @click="radioBC()" />同意平台担保支付协议
        </p> --> 
      </div>
      <div style="position: absolute;top: 9%; left: 67%; cursor:pointer;" ><img src="../../static/img/phone.png" >
      </div>
    </div>
    <p id="theId" class="havelook" v-on:click="toggle()" ref='theDiv'>
      接单去付款
    </p>
    <div class="person_detailed_prompt" ref="detailedPrompt">
      <img src="../../static/img/warning.png" alt="">
      <p class="warning_title">温馨提示</p>
      <p class="warning_alt top">平台不参与担保，风险巨大！</p>
      <p class="warning_alt">强烈建议选择平台担保交易</p>
      <i class="el-icon-close" @click="closeWarning()"></i>
    </div>
    <!-- 支付弹框 -->
    <div class="show_w" v-show="isShow">
      <div style="position:absolute;right:7px;top:8px;color:#ccc;"  @click="hiddenShow()">X</div>

 
      <span class="yibao" @click="acceptOrder()" v-bind:class="{ active: isActive }" v-on:@click="chooseByts">
        <!--   <router-link to="/third" style="color:#CCC;">   -->
            <div class="content_y" @click="btn()">
          
              <p><img src="../../static/img/yibao.png"></p>
              <p>易保支付</p>
              <p> T+1（第二个工作日9:00）到账</p>
            </div>    
        <!-- </router-link> -->
      </span>
 

      <span class="sl"></span>
      <span class="rongbao" v-bind:class="{ active: !isActive }"  v-on:@click="chooseByts">
        <div class="content_yi">
          <router-link :to="{path:'/rongbao',query:{transacType:item.transacType,billNumber:item.billNumber,sellerid:item.sellerId,buyerId:item.buyerId,amout:item.amount}}">
                <span>推荐</span>
            <p><img src="../../static/img/rongbao.png"></p>
            <p>融宝支付</p>
            <p>T+0（当天实时）到账</p>
            <p>需自行网银打款</p>
          </router-link>
        </div>
      </span>
      <!-- <div class="btn">确认选择</div> -->
    </div>

     <el-dialog title="付款" :visible.sync="showDialog">
      <el-button @click="paySuccess">确定</el-button>
      <el-button @click="payCancle" style="background-color:#ccc;margin-left:40px;">取消</el-button>
    </el-dialog>
    <div class="person_detailed_mask" v-show="detailedMaskShow" @click="closeWarning()">
    </div>
  </div>
</template>

<script>
  import {getCookie} from '@/assets/util'
  export default {
    //el:'#theId',
    data(){
      return{
        detailedMaskShow:false,
        bills:null,
        item:[],
        showDialog:false,
        pic1 : '',
        pic2 : '',
        list : [],
        radioT:true,
        radioB:false,
        checked:false,
        isChoose:false,
        isChooses:false,
        isShow:false,
        isActive:true,
      }
    },
    methods:{
      /*showWarning(){
        let _this=this;
        _this.fetch.myPost('/transaction/payViaPlatform',{
          "transacStatus":"成功",
           "billNumber":_this.bills
        },
        {headers:{
          'Content-Type':'application/json',
            'Authorization':getCookie('Too')
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
      },*/
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
          _this.showDialog = false;
          console.log("发布者")
          console.log(_this.item)
          _this.fetch.myPost("/transaction/updateTransacIntentionStatus",{
            "intentionObj":{
              billNumber:_this.item.billNumber,
              orderId:_this.item.transacType,
              intentionStatus:"已支付,待背书"
            },
            "message":{
                    "msgType":"交易",
                    "senderId":getCookie("Iud"),
                    "receiverId":_this.item.releaserId,
                    "msgContent":"买家已支付了您的订单(票号后四位"+_this.item.billNumber.substring(_this.item.billNumber.length-4)+",承兑方："+_this.item.acceptor+"),请到订单中心页面待背书查看",
                    "flag":"0",
                    "path":"/release/center/refused"
                  }
            
          },{headers:{
            'Content-Type':'application/json',
            'Authorization':getCookie('Too')
          }}).then((res)=>{
            console.log(res)
            if(res.data.status === "success"){
              alert("支付成功")
              _this.$router.push({name:'OrderwsRefused'})
            } 
          })
        },
      /*取消付款 ，待付款 */
      payCancle(){
        let _this = this;
        _this.showDialog = false;
        _this.fetch.myPost("/transaction/updateTransacIntentionStatus",{
          "intentionObj":{
            billNumber:_this.item.billNumber,
            orderId:_this.item.transacType,
            intentionStatus:"已接单,待支付"
          },
          "message":{
                    "msgType":"交易",
                    "senderId":getCookie("Iud"),
                    "receiverId":getCookie("Iud"),
                    "msgContent":"您有未支付订单,请及时完成付款",
                    "flag":"0",
                    "path":"/release/Receipt/offerCancel"
                  }
            
          },{headers:{
            'Content-Type':'application/json',
            'Authorization':getCookie('Too')
          }}).then((res)=>{
            if(res.data.status === "success"){
                console.log("交易取消")
                _this.$router.push({name:'OrderwsConfirmed'})
            }
          }) 
      },
      getBill(){
        //this.bills=this.$route.query.bills;
        var object = this.$route.query.item;
        if(object instanceof Object){
          localStorage.setItem('item',JSON.stringify(object));
        }
        this.item = JSON.parse(localStorage.getItem('item'));
        console.log("paogoqi")
        console.log(this.item);
        var billNumber = this.item.billNumber;
        this.fetch.httpGet({
          url:'/bills/getBillPics',
          params:{
            billNumber:billNumber
          }
        }).then((res)=>{
          console.log(res.data);
          if(res.data != ''){
            this.pic1 = res.data[0].pic1;
            this.pic2 = res.data[0].pic2;
          }
        });
        let Id=getCookie('Iud');
        console.log(Id);
        this.fetch.httpGet({
          url:'/getCompany',
          params:{
            contactsId:Id
          }
        }).then((res)=>{
            console.log("ss");
            console.log(res);
            this.list = res.data[0];
        });
      },
        radioTC($event){
          this.radioT=false;
          this.radioB=true;
          $event.target.checked=false
        },
        radioBC(){
          this.radioT=true;
          this.radioB=false;
        },
        imgScc:function () {                     
          this.isChoose = !this.isChoose     
         },
        imgSccs:function () {                     
          this.isChooses = !this.isChooses    
         },
        toggle:function(){
          console.log(this)
          console.log(this.$refs)

                this.isShow = !this.isShow;
          },
        hiddenShow:function () {
                    var that = this;
                    that.isShow = false;
         }, 
        chooseByts (ev) {
            console.log(123456)
            this.isActive = !this.isActive
          },

        /*btn(){
          alert("pay")
          this.fetch.httpGet({
            url:'/YOP/test'
          })
            //window.open("", "third")
          },*/

        // btn(){
        //     window.open("", "third")
        //   },

         },
        created(){
          this.getBill();
        }
  }
</script>

<style lang="scss" scoped>
.isActive{
  border:1px solid red;
}
.show_w{
  width: 700px;
  height: 300px;
  background-color:#FFFFFF;
  position:fixed;
  top: 35%;
  left: 31%;
  cursor:pointer;
  border:1px solid #F15749;
  box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
  z-index:999;
  line-height:10px;
  span{
    margin: 42px 44px;
  }
  .yibao{
    float:left;
    width:200px;
    height:150px;
    border-radius:8px;
    border:2px solid #ccc;
    .img-y{
      width: 222px;
      height: 171px;
    }
    .content_y{
      width: 172px;
      height: 139px;
      position: absolute;
      top: 58px;
      left: 66px;
      line-height:20px;
      p{
        font-weight: bold;
        line-height: 24px;
        font-size: 12px;
      }

    }
  }
  .content_y:hover span{
    display:block;
  }

  .sl{
    width: 2px;
    background-color: #F15749;
    height: 165px;
    opacity:0.7;
  }
  .rongbao{
    float:right;
    width:200px;
    height:150px;
    border-radius:8px;
    border:2px solid #ccc;

    .content_yi{
      margin-top:10px;
      width: 172px;
      height: 139px;
      margin:0 auto;
      line-height:20px;
      color:#ccc;
      margin-top: 15px;
         position:relative;
      a{
        color:#ccc;
      }
      span{
        width: 24px;
        height: 16px;
        font-size: 14px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: white;
        line-height: 16px;
        position: absolute;
        left: -58px;
        top: -58px;
        background: #0FC55B;
        font-size: 10px;
        display:none;
      }
    }
  }

  .content_yi:hover span{
    display:block;
  }
  .btn{
    width:200px;
    padding: 7px;
    line-height:30px;
    font-weight:bold;
    background:#F15749;
    box-shadow:0px 2px 4px 0px rgba(241,87,73,0.5);
    border-radius:5px;
    color:#fff;
    margin:0 auto;
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
      margin-top:3px;
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
        top:-2%;
        z-index:99;
      }
      img{
         transform: scale(1);          
         transition: all ease 0.5s; 
        }
      img.active {     
         transform: scale(2.5);    
         position: absolute;          
         z-index: 100;
         left: 33%;
         bottom: 10%;
      } 
    }
  }
  .havelook{
    margin-left: 8%;
    position: absolute;
    bottom: 30%;
    left: 39%;
    border-radius: 3px;
    background-color:#F15749;
    color:#fff; 
    width:237px;
    height:50px; 
    font-size:19px;
    line-height: 50px;
    cursor:pointer;
   
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
