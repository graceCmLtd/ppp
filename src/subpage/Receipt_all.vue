<!-- 用户所有报价 -->
<!-- 全部接单 -->
<template lang="html">
  <div class="person_offer_all">
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
          <el-col :span="3"><div class="mes">{{item.billType}}&nbsp;/&nbsp;{{item.billReferer}}</div></el-col>
          <!-- :class="item.acceptor.length&&item.acceptor.length>8?'lineHeight':''" -->
          <el-col :span="3"><div class="mes bank" ref="person_offer_all_bank"
                                 
          >{{item.acceptor}}</div></el-col>
          <el-col :span="3"><div class="mes">{{item.amount}}</div></el-col>
          <el-col :span="3"><div class="mes date">{{item.maturity}}</div></el-col>
          <el-col :span="3"><div class="mes">{{item.remain_days}}</div></el-col>
          <el-col :span="3"><div class="mes amount mes_chose">
            <!--<div class="rate">-->
            <!--<p>利率：{{item.interest}}%</p>-->
            <!--</div>-->
            <div class="premium">
              <p>{{item.real_money/10000}}W</p>
            </div>
          </div></el-col>
          <el-col :span="3"><div class="mes pula">
            <span>{{item.intentionStatus}}</span>
          </div></el-col>
          <el-col :span="3"><div class="mes operaMes">
            <!--<p><button type="button" name="button" @click="turnPlace(index)">交易</button></p>-->
            <!--<p><button type="button" name="button">放弃</button></p>-->
            <p><button type="button" name="button" @click="turnPlace(index)" style="background: #F2F2F2; color: #666; margin-top: 20px; width: 79px;">下一步</button></p>
          </div></el-col>
        </el-row>
        <div class="mes_bot">
          <p>
            <span>{{item.companyName}}</span>
          <span class="pople">{{item.contactsName}}</span>
          <span>电话:{{item.contactsPhone}}</span>
          
          <span @click="linkToA(index)"><a v-bind:href="linka" style="text-decoration:none">&nbsp;&nbsp;&nbsp;QQ咨询</a></span>
            <button type="button" name="button">票据详情</button>
          </p>
        </div>

        <!-- 票据详情的弹窗 -->
       <div class="intention_mes_details" ref="intention_mes_details">
        <div class="intention_mes_message">
          <div class="message_left">
            <ul>
              <li>票据金额：<span>{{amount/10000}}w</span></li>
              <li>每10w加：<span>{{xPerLakh}}</span></li>
              <li>出票日期：<span>{{transacDate}}</span></li>
            </ul>
          </div>
          <div class="message_right">
            <ul>
              <li>承对方：<span>{{bank}}</span></li>
              <li>汇票到期日：<span>{{maturity}}</span></li>
              <li>剩余天数：<span>{{remain_days}}天</span></li>
            </ul>
          </div>
        </div>
        <div class="intention_mes_pic" ref="intention_mes_pic">
          <img v-bind:src="pic" alt="" ref="">
        </div>
      </div>


      </div>
    </div>
    <div class="intention_mes_mask" v-show="intentionMaskShow" @click="closePics(current_index)">

    </div>

  </div>

</template>

<script>
  import {getCookie} from '@/assets/util'
  export default {
    data(){
      return{
        noteList:[],
        intentionMaskShow:false,
        xPerLakh:null,
        transacDate:null,
        bank:null,
        day:null,
        linka:"tencent://message/?uin=11577851&Site=pengpengpiao.cn&Menu=yes",
        current_index:'',
        amount:null,
        releaseDate:null,
        maturity:null,
        remain_days:null,
        marDay:[],
        pic : ''
      }
    },
    methods:{
      getReceiptAll(){
        let Id=getCookie('Iud');
        console.log("我的接单，所有接单")
        console.log(Id)
        this.axios.post(this.oUrl+'/bills/getBillsIntentions',{
            "uuid":Id,
            "IntentionType":"2"
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          let _this=this;
          console.log(res);
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
      linkToA(index){
        /*<a href="'tencent://message/?uin='+{{item.contactsQQ}}+'&Site=pengpengpiao.cn&Menu=yes'" style="text-decoration:none">{{item.contactsQQ}}qq咨询</a>*/
        let _this=this;
        let Id=getCookie('Iud');
        _this.linka = "tencent://message/?uin="+_this.noteList[index].contactsQQ+"&Site=pengpengpiao.cn&Menu=yes"
        //alert(index)
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
      paperMes(index){
        let _this=this;
        _this.current_index = index;
        let billNumberLoca=_this.noteList[index].billNumber;
        _this.axios.get(_this.oUrl+'/bills/getbill?billNumber='+billNumberLoca).then((res)=>{
          console.log(res)
          _this.amount=_this.noteList[index].amount;
          _this.xPerLakh=_this.noteList[index].xPerLakh;
          _this.transacDate=_this.noteList[index].transacDate;
          _this.bank=_this.noteList[index].acceptor;
          _this.releaseDate=_this.noteList[index].releaseDate;
          _this.maturity = _this.noteList[index].maturity;
          _this.remain_days = _this.noteList[index].remain_days;
          _this.axios.get(_this.oUrl+'/bills/getBillPics?billNumber='+billNumberLoca).then((res)=>{
            console.log(res)
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
      }
    },
    mounted(){
      this.getReceiptAll();
    }
  }
</script>

<style lang="scss" scoped>
  .person_offer_all{
    width: 100%;
    height:100%;
    .offer_mes{
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


  .intention_mes_details{
    width: 670px;
    height:540px;
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
      width: 670px;
      height:340px;
      background: white;
      img{
        width: 100%;
        height:100%;
      }
    }
    .intention_mes_message{
      width: 100%;
      display: flex;
      height:200px;
      .message_left{
        width: 50%;
        height:100%;
        border-right:1px solid #ccc;
        ul{
          padding-top:12%;
          li{
            margin-bottom: 5%;
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
