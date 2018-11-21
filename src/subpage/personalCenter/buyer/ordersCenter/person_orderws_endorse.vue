<!-- 代买家背书 -->
<template lang="html">
  <div class="person_intention_all">
    <div class="person_intention_mes">
      <el-row>
        <el-col :span="3"><div class="intention_mes_title">票据类型</div></el-col>
        <el-col :span="6"><div class="intention_mes_title">承兑银行</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">票面金额</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">到期日</div></el-col>
        <!-- <el-col :span="3"><div class="intention_mes_title">剩余天数</div></el-col> -->
        <el-col :span="3"><div class="intention_mes_title">交易金额</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">状态</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">操作</div></el-col>
      </el-row>
      <div class="" style="min-width:216px;" v-for="(item,index) in noteList" :key="index">
        <el-row>
          <el-col :span="3"><div class="intention_mes">{{item.billType}}&nbsp;/&nbsp;{{item.billReferer}}</div></el-col>
          <el-col :span="6">
            <!-- :class="item.acceptor.length&&item.acceptor.length>8?'lineHeight':''" -->
            <div class="intention_mes bankMes"
                 
            >{{item.acceptor}}</div></el-col>
          <el-col :span="3"><div class="intention_mes">{{item.amount/10000 |numFilter}}w</div></el-col>
          <el-col :span="3"><div class="intention_mes date">{{item.maturity}}(剩{{item.remain_days}}天)</div></el-col>
          <!-- <el-col :span="3"><div class="intention_mes">{{item.remain_days}}</div></el-col> -->
          <el-col :span="3"><div class="intention_mes">{{item.real_money/1000 |numFilter}}w</span>
          </div></el-col>
          <el-col :span="3"><div class="intention_mes">{{item.intentionStatus}}</div></el-col>
          <el-col :span="3"><div class="intention_mes" id="payment" @click="fun($event,item)">提醒卖家背书</div></el-col>
          <!-- <el-col :span="3"><div class="intention_mes operaMes">
            <button type="button" name="button">查看进度</button>
          </div></el-col> -->
        </el-row>
        <p class="person_intention_contact">
          <span>订单号：{{item.transacType}}</span>
          <span>公司名称：{{item.companyName}}</span>
          <span>卖家联系人：{{item.contactsName}}</span>
          <span>电话:{{item.contactsPhone}}</span>
          <span @click="linkToA(index)"><a v-bind:href="linka" style="text-decoration:none"><img  style="width:95px; height:25px; position:relative; top: 7px;" src="../../../../../static/img/qq_img.png" title="QQ咨询"></a></span>

          <!-- <button type="button" name="button" @click="paperMes(index)">查看详情</button> -->
        </p>
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
      <div class="intention_mes_details" ref="intention_mes_details">
        <div class="intention_mes_pic" ref="intention_mes_pic">
          <img src="../../../../../static/img/banner1.jpg" alt="" ref="PaperIs">
        </div>
        <div class="intention_mes_message">
          <div class="message_left">
            <ul>
              <li>票面金额：<span>{{amount/10000 |numFilter}}w</span></li>
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
      </div>

    </div>
    <div class="intention_mes_mask" v-show="intentionMaskShow" @click="closePics()">

    </div>

  <!-- 提醒买家的标志 -->
        <div class="show_w" v-show="isShow"  @click="hiddenShow()">已提醒卖家背书 
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
        amount:null,
        xPerLakh:null,
        transacDate:null,
        bank:null,
        releaseDate:null,
        maturity:null,
        remain_days:null,
        linka:"tencent://message/?uin=11577851&Site=pengpengpiao.cn&Menu=yes",
        currentPage : 1,
        pageSize : 5,
        total : 0,
        isShow:false,
        showPaginate : true
      }
    },
    methods:{
      getIntenTionList(){
        let _this=this;
        let Id=getCookie('Iud');
        _this.fetch.myPost('/bills/getBillsIntentions',{
            "uuid":Id,
            "IntentionType":'4',
            "transaction_filter":["已支付,待背书"],
            "currentPage" : _this.currentPage,
            "pageSize" : _this.pageSize
          },
          {headers:{
              'Content-Type':'application/json',
          'Authorization':getCookie('Too')
            }}
        ).then((res)=>{
          console.log(res)
          _this.noteList=res.data;
        });
        _this.fetch.myPost('/bills/getIntentionsCount',{
            "uuid":Id,
            "IntentionType":'4',
            "transaction_filter":["已支付,待背书"]
          },
          {headers:{
              'Content-Type':'application/json',
          'Authorization':getCookie('Too')
            }}
        ).then((res)=>{
          if(res.data != '')
             _this.total=res.data;
          else
            _this.showPaginate = false;
        })
      },
      current_change(currentPage){
          this.currentPage = currentPage;
          this.getIntenTionList();
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
        let billNumberLoca=_this.noteList[index].billNumber;
        _this.fetch.httpGet({
          url:'/bills/getbill',
          params:{
            billNumber:billNumberLoca
          }
        }).then((res)=>{
          console.log(res)
          _this.amount=_this.noteList[index].amount;
          _this.xPerLakh=_this.noteList[index].xPerLakh;
          _this.transacDate=_this.noteList[index].transacDate;
          _this.bank=_this.noteList[index].acceptor;
          _this.releaseDate=_this.noteList[index].releaseDate;
          _this.maturity = _this.noteList[index].maturity;
          _this.remain_days = _this.noteList[index].remain_days;
          _this.fetch.httpGet({
            url:'/bills/getBillPics',
            params:{
              billNumber:billNumberLoca
            }
          }).then((res)=>{
            console.log(res)
            if(res.data != '')
                _this.$refs.PaperIs.src=res.data[0].pic1;
            _this.intentionMaskShow=true;
            _this.$refs.intention_mes_details.style.display='block';
            setTimeout(()=>{
              _this.$refs.intention_mes_details.style.top='20%';
              _this.$refs.intention_mes_details.style.opacity='1';
            })
          })
        })
      },
      closePics(){
        this.$refs.intention_mes_details.style.top='15%';
        this.$refs.intention_mes_details.style.opacity='0';
        setTimeout(()=>{
          this.intentionMaskShow=false;
          this.$refs.intention_mes_details.style.display='none';
        },200)
      },
      toggle:function(){
            this.isShow = !this.isShow;
      },
      hiddenShow:function () {
                var that = this;
                that.isShow = false;
      },
       fun(e,item){
               e.target.style.backgroundColor =  "#"+Math.floor(Math.random()*0xffffff).toString(16);
               console.log("提醒")
               console.log(item)
               this.fetch.myPost("/publish/send",{
                "message":{
                  "msgType":"交易",
                  "senderId":getCookie("Iud"),
                  "receiverId":item.sellerId,
                  "msgContent":"有买家提醒您尽快背书(票号后四位："+item.billNumber.substring(item.billNumber.length-4)+",承兑银行："+item.acceptor+"),订单号："+item.transacType,
                  "flag":"0",
                  "path":"/release/center/refused"
                }
               },{headers:{
                'Content-Type':'application/json',
          'Authorization':getCookie('Too')
              }}).then(()=>{
                alert("已提醒")
              })
            },
       },
    created(){
      this.getIntenTionList()
    },
    filters: {
        numFilter(value) {
          let realVal = Number(value).toFixed(2)
          return Number(realVal)
      }
    },
  }
</script>

<style lang="scss" scoped>
#payment{
    min-height: 28px;
    width: 7%;
    color: white;
    border-radius: 3px;
    background: #48C1F3;
    line-height: 30px;
    margin-top: 32px;
    margin-left: 44px;
    font-size:13px;
    cursor: pointer;
}
.show_w{
    width:190px;
    height:40px;
    background:#fff; 
    position:absolute; 
    left:83%;
    top:21%;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    line-height:40px;
    border-radius:5px;
    cursor:pointer;
    color:#333;
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
  .person_intention_mes{
    width: 100%;
    margin-top: 0.4%;
    .intention_mes_title{
      background: #F15749;
      min-height: 44px;
      line-height: 44px;
      font-weight: bold;
      color: #fff;
    }
    .intention_mes{
      margin-top:8px;
      margin-bottom:8px;
      min-height: 60px;
      max-height:70px;
      line-height:70px;
      font-size: 14px;
      min-width: 95px;
      border-right:1px solid #ccc;
    }
    .lineHeight{
      line-height: 35px!important;
      font-size: 13px;
      min-width: 95px;
    }
    .amountMes{
      line-height: 0;
      display: flex;
      flex-direction: column;
      font-size: 13px;
      min-width: 95px;
      .interest{
        height:35px;
        line-height: 35px;
        border-bottom:1px solid #ccc;
      }
      .premium{
        height:35px;
        line-height: 35px;
      }
    }
    .operaMes{
      min-width: 95px;
      border-left:1px solid #ccc;
      button{
        width: 70%;
        min-height: 20px;
        font-size: 12px;
        border:1px solid #FE442B;
        color:#FE442B;
        background:white;
        border-radius:3px;
      }
    }
    .person_intention_contact{
      width: 100%;
      min-height: 40px;
      line-height: 61px;
      font-size: 13px;
      position: relative;
      background: #f3fbff;
      span{
        padding-left:20px;
      }
      button{
        position: absolute;
        right:20%;
        min-height: 28px;
        width: 12%;
        top:14%;
        color:white;
        border-radius:3px;
        background: linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
      }
    }
  }
  .intention_mes_details{
    width: 670px;
    height:540px;
    background: white;
    position: absolute;
    left:50%;
    margin-left:-286px;
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
      height:300px;
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
  .content_w{
    height: 306px;
    width: 100%;
    margin: 0 auto;
    background: #fff;
    .content_w_first {
      width:100%;
      height:80px;

      a{
        text-decoration: none;
        font-size: 13px;
        color:rgba(51,51,51,1);
        font-family: "微软雅黑";
        font-weight:400;
      }
      ul{
        width: 100%;
        margin-top: 3px;
      }
      li{
         float: left;
          width: 12.5%;
          line-height: 71px;
          border-right: 1px solid #979797;
          margin-right: -3px;

      }
      .btn_w{
        width: 90px;
        height: 35px;
        background: #f15749;
        border-radius: 3px;
        color: #fff;
        position: relative;
        right: -19px;
      }

      .no-color{
        color:rgba(171,171,171,1);
        position: relative;
        right: -19px;
      }
    }



    .content_w_second{
      ul{
        height: 61px;
        background:rgba(243,251,255,1);
        line-height: 61px;
        li{
          float: left;
          width: 19%;
          margin-left: 48px;
          a{
            text-decoration: none;
            font-size: 13px;
            color:rgba(51,51,51,1);
            font-family: "微软雅黑";
            font-weight:400;
          }
          .btn_w{
            width: 90px;
            height: 35px;
            background: #f15749;
            border-radius: 3px;
            color: #fff;
          }
        }

      }


    }

  }


</style>
