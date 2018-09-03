<!-- 用户所有报价 -->
<template lang="html">
  <div class="person_offer_all">
    <div class="offer_mes">
      <el-row>
        <el-col :span="3"><div class="mes_title">票据类型</div></el-col>
        <el-col :span="3"><div class="mes_title">承兑银行</div></el-col>
        <el-col :span="3"><div class="mes_title">金额</div></el-col>
        <el-col :span="3"><div class="mes_title">到期日</div></el-col>
        <el-col :span="3"><div class="mes_title">剩余天数</div></el-col>
        <el-col :span="3"><div class="mes_title">报价</div></el-col>
        <el-col :span="3"><div class="mes_title">状态</div></el-col>
        <el-col :span="3"><div class="mes_title">操作</div></el-col>
      </el-row>
      <div class="" v-for="(item,index) in noteList" :key="index">
        <el-row >
          <el-col :span="3"><div class="mes">{{item.billType}}</div></el-col>
          <el-col :span="3"><div class="mes bank" ref="person_offer_all_bank"
            :class="item.acceptor.length&&item.acceptor.length>8?'lineHeight':''"
            >{{item.acceptor}}</div></el-col>
          <el-col :span="3"><div class="mes">{{item.amount}}</div></el-col>
          <el-col :span="3"><div class="mes date">{{item.maturity}}</div></el-col>
          <el-col :span="3"><div class="mes">{{day}}</div></el-col>
          <el-col :span="3"><div class="mes amount mes_chose">
            <div class="rate">
              <p>利率：{{item.interest}}%</p>
            </div>
            <div class="premium">
              <p>每10w加：{{item.xPerLakh}}</p>
            </div>
          </div></el-col>
          <el-col :span="3"><div class="mes pula">
            <span>已被卖家接受</span>
          </div></el-col>
          <el-col :span="3"><div class="mes operaMes">
            <p><button type="button" name="button" @click="turnPlace(index)">交易</button></p>
            <p><button type="button" name="button">放弃</button></p>
          </div></el-col>
        </el-row>
        <div class="mes_bot">
          <p>
            <span>张家湾****贸易有限公司</span>
            <span>赵总</span>
            <span>13240891337</span>
            <button type="button" name="button">查看详情</button>
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
      marDay:[]
    }
  },
  methods:{
    getOfferAll(){
      let Id=getCookie('Iud');
      this.axios.post(this.oUrl+'/quote/getMyQuote',{
        "uuid":Id,
        "filter":"1"
      },
      {headers:{
          'Content-Type':'application/json'
      }}
    ).then((res)=>{
      let _this=this;
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
  }
  },
  mounted(){
    this.getOfferAll();
  }
}
</script>

<style lang="scss" scoped>
.person_offer_all{
  width: 100%;
  height:100%;
  .offer_mes{
    width: 100%;
    margin-left: 4%;
    margin-top: 4%;
    .mes_title{
      background: #eff8ff;
      min-width: 36px;
      line-height: 36px;
      font-weight: bold;
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
          line-height: 35px;
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
          background: linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
          color:white;
        }
      }
      p:nth-child(2){
        button{
          background: white;
          border:1px solid #FE452C;
          color:#FE452C;
        }
      }
    }
    .mes_bot{
      min-height: 36px;
      line-height: 36px;
      font-size: 14px;
      position: relative;
      p{
        width: 60%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        button{
          width:105px;
          height:30px;
          border-radius:3px;
          background:linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
          color:white;
          position: absolute;
          right:2%;
          top:12%;
        }
      }
    }

  }
}
</style>
