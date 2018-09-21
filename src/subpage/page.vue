<template lang="html">
  <div class="page" ref="page">
    <Swiper/>
    <div class="page_con">
      <router-link to="/invoice" tag="p" class="page_release">
        <img src="../../static/img/page_button_top.png" alt="">
      </router-link>
      <div class="page_title_f">          <!--票据行情标题 -->
        <img src="../../static/img/page_title1.png" alt="">
      </div>
<!-- 计算器 -->
      <div class="page_options">
        <ul class="list" style="position:relative;">         
          <li @mouseenter="Be()" @mouseleave="Af()"  v-on:click="toggle()">
            <img src="../../static/img/calculatorBe.png" ref="CaBe" class="Be" alt="" style="width:50%;height:50%;margin-right:25%;"  >
            <img src="../../static/img/calculator.png" ref="CaAf" title="" class="Af" alt="" style="width:50%;height:50%;display:none;" />
          </li>

           <div class="show_w" v-show="isShow">
             <div class="cal">
               <a class="cal_1">贴现计算器</a>
               <a class="cal_2" @click="hiddenShow()">X</a>
             </div>
             <div class="content_c">
               <p>票面金额（万元）：<input type="text" v-model:value="money" name="" placeholder="请输入金额"></p>
               <p>年利率（%）：<input type="text" v-model:value="rate" name="" placeholder="%"></p>
               <!-- <p>贴现日期：<input type="" name="" placeholder="2018-09-05"></p> -->
               <p>贴现日期：
                    <el-date-picker
                      v-model="time1"
                      type="date"
                      placeholder="选择日期"
                      value-format="timestamp"
                    >
                    </el-date-picker>
               </p>
              <!--  <p>到期日期：<input type="" name="" placeholder="请选择日期"></p> -->
               <p>到期日期：
                    <el-date-picker
                      v-model="time2"
                      type="date"
                      placeholder="选择日期"
                      value-format="timestamp"
                    >
                    </el-date-picker>
               </p>
               <p class="day_1">调整天数：<input type="text" v-model:value="adjustDays" name="" placeholder="异地通常为3天">
                <!-- style="width:143px; height:28px;" -->
                <!-- <a style="line-height">电银</a>
                <a style="background:#40C0F5;">纸银</a> -->
               </p>
               <p>每十万手续费：<input type="text" v-model:value="poundage" name="" placeholder="0"></p>
               <p class="enpty">
                 <a @click="" @click="empty()">清空</a>
                 <a style="background:#F15749;" @click="calculate()">计算</a>
               </p>
               <p>计息天数(天)：<input type="text" v-model:value="days" name="" placeholder="0" disabled></p>
               <p>每十万贴息(元)：<input type="text" v-model:value="interests1" name="" placeholder="0.00元" disabled></p>
               <p>贴息利息(元)：<input type="text" v-model:value="interests2" name="" placeholder="0.00元" disabled></p>
               <p>贴息金额(元)：<input type="text" v-model:value="sumMoney" name="" placeholder="0.00元" disabled></p>
             </div>
           </div>

          <li><a href="tencent://message/?uin=1157785194&Site=pengpengpiao.cn&Menu=yes" style="text-decoration:none"><p>法&nbsp;务</p><p>咨&nbsp;询</p></a></li>
          <li @click="backTop()"><p>回&nbsp;到</p><p>顶&nbsp;部</p></li>
        </ul>
        <div class="intention_mes_mask" v-show="intentionMaskShow" @click="closePics(indx)">

    </div>
      </div>

   <div class="page_w_table">
      <div class="page_table">
        <el-row>
          <el-col :span="4"><div class="table time">发布时间</div></el-col>
          <el-col :span="3"><div class="table type">票据类型</div></el-col>
          <el-col :span="8"><div class="table acce">承兑人</div></el-col>
          <el-col :span="4"><div class="table amount">票据金额</div></el-col>
          <el-col :span="3"><div class="table data">到期日</div></el-col>
          <el-col :span="2"><div class="table status">状态</div></el-col>
        </el-row>
      </div>
      <div class="page_table_mes">
        <el-row v-for="(item,index) in roteList" :key="index" class="page_mark_title">
          <el-col :span="4"><div class="tableMes time">{{item.releaseDate}}</div></el-col>
          <el-col :span="3"><div class="tableMes type">
            <span v-show="item.billType=='电银'">电银</span>
            <span v-show="item.billType=='纸银'">纸银</span>
            <span v-show="item.billType=='电商'">电商</span>
            <span v-show="item.billType=='纸商'">纸商</span>
          </div></el-col>
          <el-col :span="8"><div class="tableMes acce">{{item.acceptor}}</div></el-col>
          <el-col :span="4"><div class="tableMes amount">{{item.amount/10000}}w</div></el-col>
          <el-col :span="3"><div class="tableMes data">{{item.releaseDate}}</div></el-col>
          <el-col :span="2"><div class="tableMes status">{{item.quoteStatus}}</div></el-col>
        </el-row>
      </div>
  </div>
      <p class="page_opera_one">
        <router-link to="/marketpa" tag="button">查看更多>></router-link>
        </p>

      <div class="page_title_l">      <!--实时利率标题 -->
        <img src="../../static/img/page_title2.png" alt="">
      </div>
<div class="page_w_table">
      <div class="page_table">
        <el-row>
          <el-col :span="3"><div class="table type">承兑行类型</div></el-col>
          <el-col :span="3"><div class="table time">期限</div></el-col>
          <el-col :span="3"><div class="table acce">金额</div></el-col>
          <el-col :span="3"><div class="table amount">利率</div></el-col>
          <el-col :span="4"><div class="table data">联系人</div></el-col>
          <el-col :span="4"><div class="table status">操作</div></el-col>
          <el-col :span="4"><div class="table status">备注</div></el-col>
        </el-row>
      </div>

      <div class="page_table_mes">
        <el-row v-for="(item,index) in roteListLimit" :key="index" class="page_mark_title">
          <!-- <el-col :span="4"><div class="tableMes time">
            <span style="color:#ff823f;" v-show="item.billType=='电银'">电银</span>
            <span style="color:#3d83c8;" v-show="item.billType=='纸银'">纸银</span>
          </div></el-col> -->
          <el-col :span="3"><div class="tableMes type">{{item.acceptor}}</div></el-col>
          <el-col :span="3"><div class="tableMes time">{{item.timeLimit}}</div></el-col>
          <el-col :span="3"><div class="tableMes acce">{{item.amountRange}}</div></el-col>
          <el-col :span="3"><div class="tableMes amount">{{item.interest}}%</div></el-col>
          <el-col :span="4"><div class="tableMes data">{{item.contactsName}}</div></el-col>
          <el-col :span="4"><div class="tableMes status">
            <button type="button" name="button" @click="isReg">我要贴</button>
          </div></el-col>
          <el-col :span="4"><div class="table status">{{item.note}}</div></el-col>
        </el-row>
         
      </div>
</div>
      <p class="page_opera_one">
        <router-link to="/resources" tag="button">查看更多>></router-link>
        </p>
    </div>
    <PageBot/>

    <Footer :height="minHeight"/>
  </div>
</template>

<script>
  import {getCookie} from '@/assets/util'
export default {
  data(){

    return{
      minHeight:'10%',
      roteList:[],
      roteListLimit:[],
      noteList:[],
      intentionMaskShow:false,
      amount:null,
      xPerLakh:null,
      transacDate:null,
      bank:null,
      releaseDate:null,
      maturity:null,
      remain_days:null,
      isShow:false,
      //贴现计算器用到的参数
      money : 0,
      rate : null,
      time1:null,
      time2:null,
      adjustDays : 0,
      poundage : 0,
      days : null,
      interests1 : null,
      interests2 : null,
      sumMoney : null,
    }
  },
  components:{
    Header:resolve=>{
      require(['@/components/header-all'],resolve)
    },
    Swiper:resolve=>{
      require(['@/components/swiper_page'],resolve)
    },
    Footer:resolve=>{
      require(['@/components/footer-all'],resolve)
    },
    PageBot:resolve=>{
      require(['@/subpage/page_bot'],resolve)
    }
  },
  methods:{
    Be(){
      let _this=this;
      _this.$refs.CaBe.style.display='none';
      _this.$refs.CaAf.style.display='block';
    },
    Af(){
      let _this=this;
      _this.$refs.CaBe.style.display='block';
      _this.$refs.CaAf.style.display='none';
    },
    backTop(){//返回顶部
      document.documentElement.scrollTop-=150;
      if (document.documentElement.scrollTop>0) {
        var c=setTimeout(()=>this.backTop(150),16);
      }else {
        clearTimeout(c);
      }
    },
    calculate(){//计算
      let days = Math.floor((this.time2-this.time1)/86400000)+parseInt(this.adjustDays);
      let interests2 = (this.money*10000*(this.rate/100)*(days))/360+(this.money/10*this.poundage);
      let interests1 = interests2/this.money*10;
      this.days = days;
      this.interests1 = Number(interests1).toFixed(2);
      this.interests2 = Number(interests2).toFixed(2);
      this.sumMoney = Number(this.money*10000-interests2).toFixed(2);
    },
    empty(){//清空
      this.money = 0;
      this.rate = null;
      this.time1 = null;
      this.time2 = null;
      this.adjustDays = 0;
      this.poundage = 0;
      this.days = null;
      this.interests1 = null;
      this.interests2 = null;
      this.sumMoney = null
    },
    getListTop(){//票据列表
      let _this=this;
      _this.axios.post(_this.oUrl+'/bills/filterbill',{
        "billType":0,
        "amountType":0,
        "maturityType":0,
        "starter":0,
        "number":10
      },
      {
        headers:{
          'Content-Type':'application/json'
        }
      }
      ).then((res)=>{
        console.log("filterbill  .....")
        console.log(res)
        _this.roteList=res.data;
      })
    },
    getListBot(){//资源列表
      let _this=this;
      _this.axios.post(_this.oUrl+'/resourceMarket/getAllInfo?pageSize=8&currentPage=1').then((res)=>{
        console.log(res)
        _this.roteListLimit=res.data;
      })
    },
    isReg(){
      console.log("123");
      let isAu = getCookie('isAu');//从cookie中获取用户是否认证
      console.log(isAu);
      if(isAu=='true'){
        this.$router.push('/stick');
      }else{
        alert("您还未通过审核，已为您跳转......");
        this.$router.push('/release/data');
      }
    },
    toggle:function(){
            this.isShow = !this.isShow;
          },
    hiddenShow:function () {
                var that = this;
                that.isShow = false;
            }, 
  },
  created(){
    this.getListTop();
    this.getListBot()
  }
}

</script>

<style lang="scss" scoped>
.show_w{
    width: 480px;
    height: 600px;
    background: white;
    -webkit-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    position: absolute;
    right: 89px;
    bottom: -96%;
    .cal{
      height:50px;
      width:480px;
      border-bottom:2px solid #F15749;
      line-height:50px;
      text-align:left;
      .cal_1{
        width:90px;
        height:50px;
        font-size:15px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:51px;
        background:#F15749;
        text-align:center;
        display: inline-block;
      }
      .cal_2{
        width:22px;
        height:22px;
        background:rgba(249,108,108,1);
        color:rgba(255,255,255,1);
        line-height:22px;
        background:#F15749;
        text-align:center;
        border-radius:50px;
        font-size:14px;
        float:right;
        margin-top:10px;
        margin-right:5px;
        cursor:pointer;
      }
    }
    .content_c{
      p{
        font-size:18px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(102,102,102,1);
        line-height:45px;
      }
      .day_1{
        a{
          width:40px;
          height:24px;
          background:rgba(241,87,73,1);
          border-radius:4px;
          font-size:10px;
          color:#fff;
          display:inline-block;
          line-height:24px;
        }
      }
      .enpty{
        a{
          width:170px;
          height:40px;
          background:rgba(64,192,245,1);
          border-radius:4px;
          display:inline-block;
          line-height:40px;
          color:#fff;
          letter-spacing:1.3px;
        }
      }
      input{
        width:240px;
        height:28px;
        border-radius:4px;
        border:1px solid rgba(151,151,151,1);
      }
    }
}

.page{
  width: 100%;
  height:100%;
  z-index:999;
  margin: 0 auto;
  margin-top:30px;
  .page_con{
    width: 80%;
    height:auto;
    margin:0 auto;
    position:relative;
    z-index: 999;
    .page_release{
      width: 300px;
      height:142px;
      min-height: 98px;
      background: #f45643;
      text-align: center;
      position: absolute;
      top:-40px;
      color:white;
      font-size: 18px;
      cursor:pointer;
      background: url('../../static/img/page_button_bot.png');
      background-size: 100% 100%;
    }
    .page_release:hover{
      img{
        transition:all .1s;
        transform: translate(-4px,4.2px);
      }
    }
    .page_title_f{
      font-size: 30px;
      width: 100%;
      height:276px;
      min-height: 276px;
      img{
        width: 100%;
        height:100%;
      }
    }
.page_w_table{
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
    .page_table{
    width: 100%;
    margin: 0 auto;
      .table{
        min-height: 40px;
        background: #f45643;
        text-align: center;
        line-height: 40px;
        color:white;
      }
    }
    .page_table_mes{
      width: 100%;
      font-size: 14px;
      margin:0 auto;
      .page_mark_title:nth-of-type(even){
        background:#f7f7f7;

      }
      .tableMes{
        min-height: 40px;
        line-height: 40px;
        margin-bottom:2px;
      }
      .status{
        button{
          width: 40%;
          min-height: 28px;
          border-radius:8px;
          background: #ff6600;
          color:white;
        }
      }
    }
  }
    .page_opera_one{
      width: 100%;
      height:34px;
      margin-top:28px;
      min-height: 34px;
      button{
        width: 11%;
        height:100%;
        background: #ff6600;
        border-radius: 18px;
        color:white;
      }
    }
    .page_title_l{
      width: 100%;
      height:276px;
      min-height: 220px;
      margin-top:10px;
      img{
        width: 100%;
        height:100%;
      }
    }

    .page_options{
      width: 4%;
      height:25%;
      background: #f7f7f7;
      position: fixed;
      right:5vh;
      top:40vh;
      min-height: 208px;
      min-width: 70px;
      z-index:20;
      .list{
        width: 100%;
        height:100%;
        display: flex;
        flex-direction:column;
        li{
          width: 100%;
          height:33.33%;
          line-height: 62px;
          cursor:pointer;
          border-bottom:1px solid white;
          box-sizing: border-box;
          overflow: hidden;
          p{
            height:50%;
            color:#ff4200;
            font-weight: bold;
            font-size: 24px;
            margin-top: -11%;
          }
          img{
            margin-top: 24%;
            margin-left:25%;
          }
        }
        li:hover{
          background: #ff4200;
          p{
            color:white;
          }
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
