<!-- 已失效的报价 -->
<template lang="html">
  <div class="person_offer_prices">
   <!--  <h2>已失效的报价</h2> -->
  <div class="offer_mes">
      <el-row>
        <el-col :span="3"><div class="mes_title">票据类型</div></el-col>
        <el-col :span="6"><div class="mes_title">承兑银行</div></el-col>
        <el-col :span="3"><div class="mes_title">票面金额</div></el-col>
        <el-col :span="3"><div class="mes_title">到期日</div></el-col>
        <!-- <el-col :span="3"><div class="mes_title">剩余天数</div></el-col> -->
        <el-col :span="3"><div class="mes_title">交易金额</div></el-col>
        <el-col :span="3"><div class="mes_title">状态</div></el-col>
        <el-col :span="3"><div class="mes_title">操作</div></el-col>
      </el-row>
      <div class="" v-for="(item,index) in noteList" :key="index">
        <el-row >
          <el-col :span="3"><div class="mes">{{item.billType}}&nbsp;/&nbsp;{{item.billReferer}}</div></el-col>
          <!-- <el-col :span="3"><div class="mes bank" ref="person_offer_all_bank"
            :class="item.acceptor.length&&item.acceptor.length>8?'lineHeight':''"
            >{{item.acceptor}}</div></el-col> -->
          <el-col :span="6"><div class="mes">{{item.acceptor}}</div></el-col>
          <el-col :span="3"><div class="mes">{{item.amount/10000}}W</div></el-col>
          <el-col :span="3"><div class="mes date">{{item.maturity}}(剩{{item.remain_days}}天)</div></el-col>
          <!-- <el-col :span="3"><div class="mes">{{item.remain_days}}</div></el-col> -->
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
          <el-col :span="3"><div class="mes operaMes" style="border:none;">
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
          
          <span @click="linkToA(index)"><a v-bind:href="linka" style="text-decoration:none"><img  style="width:95px; height:25px;" src="../../static/img/qq_img.png" title="QQ咨询"></a></span>
            <span>{{item.companyId}}</span>
            <button type="button" name="button" @click="paperMes(index)">查看详情</button>
            <!--
            <span>赵经理</span>
            <span>12756937850</span>
            <button type="button" name="button" @click="paperMes(index)">查看详情</button>-->

          </p>
        </div>
      <!-- 票据详情的弹窗的修改后-->
      <div class="intention_mes_details" ref="intention_mes_details">
         <div class="top_w">
            <p>票据详情</p>
          </div>
        <div class="intention_mes_pic" ref="intention_mes_pic">
          <img v-bind:src="pic" alt="" ref="">
        </div>

        <div class="intention_mes_message">
          <div class="message_left">
            <ul>
              <li><p class="money_w">{{billType}}</p><i>{{amount/10000}}w</i></br><span>报价金额</span></li>
              <li><i>{{interest}}%</br></i>每10W加:{{xPerLakh}}元</br><span>利率</span></li>
              <li><i>{{maturity}}<br></i>(剩{{remain_days}}天)</br><span>汇票到期日/剩余天数</span></li>
              <li style="border-right:none;"><i>{{bank}}</i></br><span>承兑方</span></li>
            </ul>
          </div>
         
             
           
        </div>
   
      </div>
      </div>
      <!--分页-->
      <div class="block" v-if="showPaginate">
        <el-pagination
          background
          layout="prev,pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="current_change">

        </el-pagination>
      </div>
          <div class="intention_mes_mask" v-show="intentionMaskShow" @click="closePics(current_index)"> </div>
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
        linka:"tencent://message/?uin=11577851&Site=pengpengpiao.cn&Menu=yes",
        intentionMaskShow:false,
        xPerLakh:null,
        transacDate:null,
        bank:null,
        day:null,
        current_index:'',
        amount:null,
        releaseDate:null,
        maturity:null,
        remain_days:null,
        real_money:null ,
        interest:null,
        billType:null,
        pic:'',
        currentPage : 1,
        pageSize : 5,
        total : 0,
        showPaginate : true
      }
    },
    methods:{
      getOfferAll(){
        let Id=getCookie('Iud');
        this.axios.post(this.oUrl+'/quote/getMyQuote',{
            "uuid":Id,
            "filter":"4",
            "currentPage":this.currentPage,
            "pageSize":this.pageSize
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
        });
        this.axios.post(this.oUrl+'/quote/getQuoteCount',{
            "uuid":Id,
            "filter":"4"
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          if(res.data != '')
              this.total = res.data; 
          else
              this.showPaginate = false;
        });
      },
      current_change(currentPage){
        this.currentPage = currentPage;
        this.getOfferAll();
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
      paperMes(index){
        let _this=this;
        _this.current_index = index;
        let billNumber=_this.noteList[index].billNumber;
        _this.axios.get(_this.oUrl+'/quote/getDetail?billNumber=' + billNumber).then((res)=>{
          console.log(res)
          _this.amount=_this.noteList[index].amount;
          _this.xPerLakh=_this.noteList[index].xPerLakh;
          _this.transacDate=_this.noteList[index].transacDate;
          _this.interest=_this.noteList[index].interest;
          _this.billType=_this.noteList[index].billType;
          _this.bank=_this.noteList[index].acceptor;
          _this.releaseDate=_this.noteList[index].releaseDate;
          _this.maturity = _this.noteList[index].maturity;
          _this.remain_days = _this.noteList[index].remain_days;
          _this.real_money = _this.noteList[index].real_money;
          _this.axios.get(_this.oUrl+'/bills/getBillPics?billNumber=' + billNumber).then((res)=>{
            _this.pic=res.data[0].pic1;
            _this.intentionMaskShow=true;
            console.log(_this)
            _this.$refs.intention_mes_details[index].style.display='block';
            setTimeout(()=>{
              _this.$refs.intention_mes_details[index].style.top='20%';
              _this.$refs.intention_mes_details[index].style.opacity='1';
            })
          })
        })
      },
      closePics(index){
        console.log(this);
        this.$refs.intention_mes_details[index].style.top='15%';
        this.$refs.intention_mes_details[index].style.opacity='0';
        setTimeout(()=>{
          this.intentionMaskShow=false;
          this.$refs.intention_mes_details[index].style.display='none';
        },200)
      },
    },
    mounted(){
      this.getOfferAll();
    }
  }
</script>

<style lang="scss" scoped>
.top_w{
  width: 749px;
  height:40px;
  border-bottom:1px solid #F15749;
  text-align:left;
  line-height:40px;
  p{
    font-size:15px;
    font-family:MicrosoftYaHei-Bold;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:40px;
    background:#F15749;
    display:inline-block;
    width:95px;
    text-align:center;
  }
}
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
     
      }
      .amount{
       
      }
      .mes{
        margin-top:8px;
        margin-bottom:8px;
        min-height: 70px;
        line-height: 70px;
        font-size: 14px;
        border-right:1px solid #ccc;
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
    .intention_mes_details{
    width: 750px;
    height: 620px;
    background: white;
    position: absolute;
    left:50%;
    top:15%;
    z-index: 501;
    opacity: 0;
    display: none;
    transition: all .5s;
    overflow: hidden;
    .intention_mes_pic{
      width: 687px;
      height: 350px;
      background: white;
      margin-left: 30px;
      margin-top: 31px;

      img{
        width: 100%;
        height:100%;
      }
    }
    .intention_mes_message{
      width: 100%;
      display: flex;
      height:200px;
      border-top: 1px solid #979797;
      margin-top: 10px;
      .message_left{
        width:100%;
        height:100%;
        ul{
          li{
              margin-bottom: 5%;
              float: left;
              padding: 0 46px;
              line-height: 50px;
              border-right: 1px solid #979797;
              margin-top: 31px;
            span{
               color:#C0C0C0;
               font-size:13px;
            }
            i{
              font-style:normal;
              font-weight:bold;
            }
            .money_w{
              width:40px;
              height:25px;
              line-height:25px;
              background:#F15749;
              border-radius:4px;
              color:#fff;
              font-size:13px;
              margin-left:-27px;
            }
          }
        }
      }
      .message_right{
        width: 50%;
        height:100%;
        ul{
          padding-top:12%;
          li{
            margin-bottom: 5%;
          }
        }
      }
    }
  }
  .intention_mes_mask{
    width: 100%;
    height:100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    top:0;
    left:0;
    z-index: 500;
  }
</style>
