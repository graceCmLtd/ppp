<!-- 已失效的报价 -->
<template lang="html">
  <div class="person_offer_prices">
   <!--  <h2>已失效的报价</h2> -->
  <div class="offer_mes">
      <el-row>
        <el-col :span="3"><div class="mes_title">票据类型</div></el-col>
        <el-col :span="3"><div class="mes_title">承兑银行</div></el-col>
        <el-col :span="3"><div class="mes_title">金额</div></el-col>
        <el-col :span="3"><div class="mes_title">到期日</div></el-col>
        <el-col :span="3"><div class="mes_title">剩余天数</div></el-col>
        <el-col :span="3"><div class="mes_title">实付金额</div></el-col>
        <el-col :span="3"><div class="mes_title">状态</div></el-col>
        <el-col :span="3"><div class="mes_title">操作</div></el-col>
      </el-row>
      <div class="" v-for="(item,index) in noteList" :key="index">
        <el-row >
          <el-col :span="3"><div class="mes">{{item.billType}}</div></el-col>
          <!-- <el-col :span="3"><div class="mes bank" ref="person_offer_all_bank"
            :class="item.acceptor.length&&item.acceptor.length>8?'lineHeight':''"
            >{{item.acceptor}}</div></el-col> -->
          <el-col :span="3"><div class="mes">{{item.acceptor}}</div></el-col>
          <el-col :span="3"><div class="mes">{{item.amount}}</div></el-col>
          <el-col :span="3"><div class="mes date">{{item.maturity}}</div></el-col>
          <el-col :span="3"><div class="mes">{{item.remain_days}}</div></el-col>
          <el-col :span="3"><div class="mes amount mes_chose">
            <!--<div class="rate">-->
            <!--<p>利率：{{item.interest}}%</p>-->
            <!--</div>-->
            <div class="premium">
              <p>{{item.xPerLakh}}W</p>
            </div>
          </div></el-col>
          <el-col :span="3"><div class="mes pula">
            <span>{{item.quoteStatus}}</span>
          </div></el-col>
          <el-col :span="3"><div class="mes operaMes">
            <!--<p><button type="button" name="button" @click="turnPlace(index)">交易</button></p>-->
            <!--<p><button type="button" name="button" class="wow hinge"> 放弃</button></p>-->
            <span style="margin-top: 30px; color: #ccc;">...</span>
          </div></el-col>
        </el-row>
        <div class="mes_bot">
          <p>
            <span>{{item.companyName}}</span>
          <span class="pople">{{item.contactsName}}</span>
          <span>电话:{{item.contactsPhone}}</span>
          
          <span @click="linkToA(index)"><a v-bind:href="linka" style="text-decoration:none">&nbsp;&nbsp;&nbsp;QQ咨询</a></span>
            <span>{{item.companyId}}</span>
            <button type="button" name="button" @click="slit">查看详情</button>
            <!--
            <span>赵经理</span>
            <span>12756937850</span>
            <button type="button" name="button" @click="paperMes(index)">查看详情</button>-->

          </p>
        </div>
      </div>
    </div>





  </div>
</template>

<script>
import {getCookie} from '@/assets/util'
  export default {
    data(){
      return{
        noteList:[],
        day:null,
        marDay:[],
        linka:"tencent://message/?uin=11577851&Site=pengpengpiao.cn&Menu=yes"
      }
    },
    methods:{
      getOfferAll(){
        let Id=getCookie('Iud');
        this.axios.post(this.oUrl+'/quote/getMyQuote',{
            "uuid":Id,
            "filter":"4"
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          let _this=this;
          console.log("get all quotes")
          console.log(res)
          _this.noteList=res.data;
          for(let v in res.data){
            // console.log(res.data[v].maturity)
            // _this.marDay=res.data[v].maturity;
            let date=new Date();
            let year=date.getFullYear();
            let month=date.getMonth()+1;
            let day=date.getDate();
            if(month>=1&&month<9){
              month='0'+month
            }
            let secDay=year+'/'+month+'/'+day;
            let secDayStamp=new Date(secDay).getTime()
            let timeAll=new Date(res.data[v].maturity).getTime();
            let lastDay=timeAll-secDayStamp;
            _this.day=Math.floor(lastDay/86400000)
            console.log(_this.day)
            _this.marDay.push(_this.day)
          }
          console.log(_this.marDay)
        })
      },
      turnPlace(index){
        let _this=this;
        let billNum=_this.noteList[index].billNumber;
        _this.$router.push({
          name:'Detailed',
          query:{
            bills:billNum
          }
        })
      },
      linkToA(index){
        /*<a href="'tencent://message/?uin='+{{item.contactsQQ}}+'&Site=pengpengpiao.cn&Menu=yes'" style="text-decoration:none">{{item.contactsQQ}}qq咨询</a>*/
        let _this=this;
        let Id=getCookie('Iud');
        _this.linka = "tencent://message/?uin="+_this.noteList[index].contactsQQ+"&Site=pengpengpiao.cn&Menu=yes"
        //alert(index)
      },
      slit(){
        this.$alert(
          '<div class="intention_mes_details" ref="intention_mes_details"><div class="intention_mes_pic" ref="intention_mes_pic"><img src="../../static/img/banner1.jpg" alt="" ref="PaperIs"></div><div class="intention_mes_message"><div class="message_left"><ul><li>票据金额：<span>100w</span></li><li>每10w加：<span>2</span></li><li>出票日期：<span>2018-09-05</span></li></ul></div><div class="message_right"><ul><li>承对方：<span>天津商业银行</span></li><li>汇票到期日：<span>2018-11-30</span></li><li>剩余天数：<span>84天</span></li></ul></div></div></div>',
          '票据详情',
          { dangerouslyUseHTMLString: true });
      }
    },
    mounted(){
      this.getOfferAll();
    }
  }
</script>

<style lang="scss" scoped>
  .person_offer_prices{
    width: 97%;
    height:100%;
    .offer_mes{
      width: 100%;
      margin-left: 1%;
      margin-top: 4%;
      .mes_title{
        background: #F15749;
        min-width: 36px;
        line-height: 36px;
        font-weight: bold;
        color: #fff;
      }
      .lineHeight{
        line-height: 35px!important;
        font-size: 13px!important;
      }
      .bank{
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
      }
      .date{
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
      }
      .amount{
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
      }
      .mes{
        margin-top:8px;
        margin-bottom:8px;
        min-height: 70px;
        line-height: 70px;
        font-size: 14px;
      }
      .opera{
        border-left:1px solid #ccc;
      }
      .mes_chose{
        display: flex;
        flex-direction: column;
        margin-top:8px;
        margin-bottom:8px;
        .rate{
          width: 100%;
          height:50%;
          margin-top: -3px;
          p{
            width: 100%;
            text-align: center;
            border-bottom:1px solid #ccc;
            height:100%;
            line-height: 35px;
            font-size: 14px;
          }
        }
        .premium{
          width: 100%;
          height:50%;
          p{
            width: 100%;
            line-height: 72px;
            font-size: 14px;
          }
        }
      }
      .operaMes{
        border-left:1px solid #ccc;
        line-height: 0;
        display: flex;
        flex-direction: column;
        p{
          width: 100%;
          height:35px;
          line-height: 35px;
          button{
            min-width: 60px;
            height:30px;
            border-radius: 3px;
            background: #F15749;
            color:white;
          }
        }
        p:nth-child(2){
          button{
            background: white;
            border:1px solid #F15749;
            color:#F15749;

          }
        }
      }
      .mes_bot{
        min-height: 36px;
        line-height: 36px;
        font-size: 14px;
        position: relative;
        background: #EFF8FF;
        p{
          width: 60%;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          button{
            width:105px;
            height:30px;
            border-radius:3px;
            background: #F15749;
            color:white;
            position: absolute;
            right:2%;
            top:12%;
          }
        }
      }

    }

  }
  .bill_w{
    width:1049px;
    height:774px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 30px 0px rgba(188,188,188,0.5);
    margin-top: 35px;
    .type_w{
      width:1049px;
      height:52px;
      border-bottom: 1px solid #F15749;
      .type_w_1{
        width:157px;
        height:52px;
        background:rgba(241,87,73,1);
        color: #fff;
        line-height: 52px;
        font-weight: bold;
        float: left;
      }
    }
    .bill_footer_w{
      width:1049px;
      height:138px;
      /*border:1px solid black;*/

      li{
        float: left;
        border-right: 1px solid #979797;
        padding: 0px 50px;
        line-height: 41px;
        margin-top: 16px;
      }
      .silver_w{
        width:58px;
        height:35px;
        background:rgba(241,87,73,1);
        border-radius:4px;
        color: #fff;
        font-size: 14px;
      }
      .silver_w_2{
        width:146px;
        height:26px;
        font-size:20px;
        font-family:"微软雅黑";
        font-weight:bold;
        color:rgba(241,87,73,1);
        line-height:26px;
      }
      .silver_w_3{
        width: 73px;
        height: 19px;
        font-size: 14px;
        font-family:"微软雅黑";
        color: silver;
        line-height: 72px;
        margin-left: 31px;
      }
      .silver_w_4{
        width:153px;
        height:26px;
        font-size:20px;
        font-family:"微软雅黑";
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:96px;
      }
      .silver_w_5{
        width: 73px;
        height: 19px;
        font-size: 14px;
        font-family:"微软雅黑";
        color: silver;
        line-height: 72px;
        margin-left: 31px;
        margin-top: 35px;
      }
      /*.honour_w{*/
      /*width:63px;*/
      /*height:16px;*/
      /*font-size:12px;*/
      /*font-family:MicrosoftYaHei;*/
      /*color:rgba(192,192,192,1);*/
      /*line-height:16px;*/
      /*float: left;*/
      /*}*/
      .last_w{
        /*width:63px;*/
        /*height:16px;*/
        font-size:12px;
        font-family:MicrosoftYaHei;
        color:rgba(192,192,192,1);
        line-height: 41px;
      }
      i{
        font-style:normal;
        color: #333333;
        font-weight: bold;
      }
    }
  }
</style>
