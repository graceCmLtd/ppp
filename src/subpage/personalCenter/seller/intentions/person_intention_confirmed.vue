<!-- 待买家确认 -->
<template lang="html">
  <div class="person_intention_all">
    <div class="person_intention_mes">
      <el-row>
        <el-col :span="3"><div class="intention_mes_title">票据类型</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">承兑银行</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">票面金额</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">到期日</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">交易金额</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">报价</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">状态</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">操作</div></el-col>
      </el-row>
      <div class="" style="min-width:216px;" v-for="(item,index) in noteList" :key="index">
        <el-row>
          <el-col :span="3"><div class="intention_mes">{{item.billType}}&nbsp;/&nbsp;{{item.billReferer}}</div></el-col>
          <el-col :span="3">
            <!-- :class="item.acceptor.length&&item.acceptor.length>8?'lineHeight':''" -->
            <div class="intention_mes bankMes"
                 
            >{{item.acceptor}}</div></el-col>
          <el-col :span="3"><div class="intention_mes">{{formatNumToStr(item.amount)}}</div></el-col>
          <el-col :span="3"><div class="intention_mes date">{{item.maturity}}(剩{{item.remain_days}}天)</div></el-col>
          <el-col :span="3"><div class="intention_mes">{{formatNumToStr(item.real_money)}}</div></el-col>
          <el-col :span="3"><div class="intention_mes amountMes">
            <span class="interest">年化：<span>{{item.interest}}%</span></span>
            <span class="premium">每10w加：<span>{{item.xPerLakh}}</span></span>
          </div></el-col>
          <el-col :span="3"><div class="intention_mes" style="border-right:1px solid #ccc;">{{item.intentionStatus}}</div></el-col>
          <el-col :span="3"><div class="intention_mes operaMes">
            <button type="button" name="button" @click="modifyAmount(item)" style="background:#F15749">修改金额</button>
            <p class="cancel_w"  v-on:click="order_toggle(item)" style="background:#FFB100">取消订单</p>
          </div></el-col>
        </el-row>
        <p class="person_intention_contact">
          <span>{{item.companyName}}</span>
          <span class="pople">{{item.contactsName}}</span>
          <span>电话:{{item.contactsPhone}}</span>
          <span @click="linkToA(index)"><a v-bind:href="linka" style="text-decoration:none"><img  style="width:95px; height:25px; position:relative; top: 7px;" src="../../../../../static/img/qq_img.png" title="QQ咨询"></a></span>
          <button type="button" name="button" @click="paperMes(index)">查看详情</button>
        </p>
        
      </div>

      <!-- 修改价格的弹窗 -->

      <!-- <el-dialog title="修改金额" :visible.sync="isShow"> -->
        <div class="show_w" v-if="isShow" >
        <div class="center_w">
            <p>修改付款金额</p>
            <p>原实付金额：{{formatNumToStr(currentItem.real_money)}}</p>
            <p><i style="font-style: normal;font-size:12px;color:#A5A5A5;font-weight:bold;">修改为</i>实付金额： <input type="" name="" style="border:1px solid #ccc; height:32px; width:110px; color:#F15749; font-weight:bold;font-size:20px;" v-model="new_money" placeholder="0"> </p>
            <a @click="modifyMoneySubmit()">确认修改</a>
            <a @click="showCancel()" style="background:#E4E4E4;  box-shadow:0px 2px 4px 0px #E4E4E4;">取消</a>
        </div>
      </div>
      <!-- 取消页面 -->
      <div class="isShow_cancel" v-if="isShow_cancel"  >
        <div class="cancel_center" >
          <p>是否取消订单</p>
          <p><img src="../../../../../static/img/dog.png"></p>
          <!-- <p>取消订单，你重新发布此票据</p> -->
          <p>
            <span @click="removeSubmit()">确认取消不卖了</span>
             <span>
              <router-link to="/marketpa">
                 返回票据市场
              </router-link>
            </span>
            <span style="background:#ccc;"@click="hiddenShow()">不,在等等</span>
          </p>
        </div>
      </div>
      <!-- </el-dialog> -->
      
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
        <div class="top_w">
            <p>票据详情</p>
        </div>
       <!-- 修改后的票据详情弹窗 -->
        <div class="intention_mes_message">
      
          <div class="message_left">
            <ul>
              <li>票号：<span>6222299993778389939</span></li>
              <li>票面总额：<span>{{formatNumToStr(amount)}}</span></li>
              <li>承对方：<span>{{bank}}</span></li>
              <li>买方：<span>{{buyer}}</span></li>
              <li>贴现利率：<span>{{rate}}%</span></li>
              <li>实收金额：<span>{{formatNumToStr(realMoeny)}}(含平台担保费)</span></li>
            </ul>
          </div>
        </div>
       <div class="intention_mes_pic" ref="intention_mes_pic">
          <img src="../../../../../static/img/banner1.jpg" alt="" ref="PaperIs">
        </div>
      </div>

    </div>
    <div class="intention_mes_mask" v-show="intentionMaskShow" @click="closePics()">

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
        buyer:null,
        rate:null,
        realMoeny:null,
        releaseDate:null,
        maturity:null,
        remain_days:null,
        linka:"tencent://message/?uin=11577851&Site=pengpengpiao.cn&Menu=yes",
        currentPage : 1,
        pageSize : 5,
        total : 0,
        showPaginate : true,
        isShow:false,
        isShow_cancel:false,
        new_money:0,
        currentItem:null
      }
    },
    methods:{
      getIntenTionList(){
        let _this=this;
        let Id=getCookie('Iud');
        /*卖家IntentionType状态1或3*/
        _this.fetch.myPost('/bills/getBillsIntentions',{
            "uuid":Id,
            "IntentionType":'3',
            "transaction_filter":["待接单"],
            "currentPage" : _this.currentPage,
            "pageSize" : _this.pageSize
          },
          {headers:{
              'Content-Type':'application/json',
          'Authorization':getCookie('Too')
            }}
        ).then((res)=>{
          //console.log(res)
          _this.noteList=res.data;
        });
        _this.fetch.myPost('/bills/getIntentionsCount',{
            "uuid":Id,
            "IntentionType":'3',
            "transaction_filter":["待接单"],
          },
          {headers:{
              'Content-Type':'application/json',
          'Authorization':getCookie('Too')
            }}
        ).then((res)=>{
          if(res.data != '')
              _this.total = res.data;
          else
            _this.showPaginate = false;
        });
      },
      /*修改金额*/
      modifyAmount(item){
        this.new_money =item.real_money/10000;
        this.isShow = true;
        this.currentItem = item;
        //alert(this.currentItem.real_money)
      },
      /*修改金额提交操作*/

      modifyMoneySubmit(){
        if (!this.new_money) {
          alert("请填写金额，或点击取消")  

        }else{
          this.isShow = false;
          let _this = this;
          let quoterId = this.currentItem.quoterId;
          _this.fetch.httpPost({
            url:"/quote/updateRealMoney",
            data:{
              "quoteBody":{
                  "billNumber":_this.currentItem.billNumber,
                  "quoterId":_this.currentItem.quoterId,
                  "new_money":_this.new_money*10000
              },
              "transactionBody":{
                  "orderId":_this.currentItem.transacType,
                  "preRealMoney":_this.new_money*10000
            }
          }
          }).then((res)=>{
            //console.log("修改金额")
            //console.log(res)
            _this.getIntenTionList()
            _this.fetch.myPost("/publish/send",{
                "message":{
                  "msgType":"交易",
                  "senderId":getCookie("Iud"),
                  "receiverId":quoterId,
                  "msgContent":"有卖家修改了交易金额，请确认",
                  "flag":"0",
                  "path":"/release/orderws/audit"
                }
               },{headers:{
                'Content-Type':'application/json',
          'Authorization':getCookie('Too')
              }}).then((res)=>{
                //console.log("send msg for amount modify")
              })
          })
        }
        
      },
      /*确认删除票据订单交易 ISD:intention Seller Delete*/
      removeSubmit(){
        let _this = this
        //alert("确定删除")
        this.isShow_cancel = !this.isShow_cancel;
        _this.fetch.myPost("/transaction/cancleOrder",{
            "billInfo":{
              "billId":_this.currentItem.billId,
              "billNumber":_this.currentItem.billNumber
            },
            "quoteInfo":{
              "quoteId":_this.currentItem.quoteId,
              "status":"已失效"
            },
            "transactionInfo":{
              "orderId":_this.currentItem.transacType,
              "intentionStatus":"ISD"
            }
          },{headers:{
              'Content-Type':'application/json',
          'Authorization':getCookie('Too')
          }}).then((res)=>{
            //console.log("删除意向")
            //console.log(res)
            _this.getIntenTionList()
          })
      },
      current_change(currentPage){
        this.currentPage = currentPage;
        this.getIntenTionList();
      },
      showCancel () {
          var that = this;
          that.isShow = false;
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
        this.buyer = _this.noteList[index].companyName;
        this.rate = _this.noteList[index].interest;
        this.realMoeny = ((_this.noteList[index].real_money-_this.noteList[index].real_money*5/10000)).toFixed(2);
        _this.fetch.httpGet({
          url:'/bills/getbill',
          params:{
            billNumber:billNumberLoca
          }
        }).then((res)=>{
          //console.log(res)
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
            //console.log(res)
            _this.$refs.PaperIs.src=res.data[0].pic1;
            _this.intentionMaskShow=true;
            _this.$refs.intention_mes_details.style.display='block';
            setTimeout(()=>{
              _this.$refs.intention_mes_details.style.top='15%';
              _this.$refs.intention_mes_details.style.opacity='1';
            })
          })
        })
      },
      formatNumToStr(num){
        return this.util.formatNumberToStr(num)
      },
      closePics(){
        this.$refs.intention_mes_details.style.top='15%';
        this.$refs.intention_mes_details.style.opacity='0';
        setTimeout(()=>{
          this.intentionMaskShow=false;
          this.$refs.intention_mes_details.style.display='none';
        },200)
      },
      order_toggle:function(item){
          this.isShow_cancel = !this.isShow_cancel;
          this.currentItem = item;
          },
      hiddenShow:function () {
          var that = this;
          that.isShow_cancel = false;
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
   }
  }
</script>

<style lang="scss" scoped>
  .top_w{
    width:700px;
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
      button{
        width: 64px;
        min-height: 30px;
        border-radius: 3px;
        background: #F15749;
        color: #fff;
        font-size:13px;
      }
      .cancel_w{
        width:64px;
        height: 30px;
        line-height:30px;
        border-radius: 3px;
        background: #ccc;
        color: #fff;
        font-size:13px;
        float:right;
        margin-top:20px;
        margin-right: 2px;
        cursor:pointer;
      }
    }
    .person_intention_contact{
      width: 100%;
      min-height: 40px;
      line-height: 61px;
      font-size: 14px;
      position: relative;
      background: #f3fbff;
      button{
        position: absolute;
        right:2%;
        min-height: 28px;
        width: 7%;
        top:26%;
        color:white;
        border-radius:3px;
        background: #F15749;
        line-height:28px;
      }
        .pople{
          margin-left: 80px;
          margin-right: 40px;
        }
    }
  }
  .intention_mes_details{
    width: 700px;
    height: 800px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 30px 0px rgba(188,188,188,0.5);
    position: absolute;
    left:50%;
    top:15%;
    z-index: 501;
    opacity: 0;
    display: none;
    transition: all .5s;
    overflow: hidden;

    .intention_mes_pic{
      width: 695px;
      height:340px;
      background: white;
      margin-left: 2px;
      img{
        width: 100%;
        height:100%;
      }
    }
    .intention_mes_message{
      width: 100%;
      display: flex;
      .message_left{
        width: 100%;
        height:100%;
        border-right:1px solid #ccc;
        text-align: left;
        margin-left: 100px;
        font-weight:bold;
        color:rgba(170,170,170,1);
        line-height:26px;
        ul{
          padding-top:5%;
          li{
            margin-bottom: 5%;
            span{
              font-size:16px;
              font-weight:bold;
              color:rgba(102,102,102,1);
              line-height:26px;
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
            text-align:left;
          }
        }
      }
    }
  }
  .content_w{
    height: 306px;
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
        width: 13.5%;
        line-height: 71px;
        border-right: 1px solid #979797;
        margin-right: -16px;
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
.show_w{
  width:500px;
  height:450px;
  background:linear-gradient(180deg,rgba(255,125,85,1) 0%,rgba(255,111,77,1) 100%);
  box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
  border-radius:4px;
  position:fixed;
  bottom: 3%;
  left: 31%;
  z-index: 999;
  .center_w{
    width:400px;
    height:350px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 32px 0px rgba(241,87,73,0.5);
    border-radius:4px;
    margin:0 auto;
    margin-top:52px;

     p:nth-child(1){
        font-size:22px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(246,85,60,1);
        line-height: 93px;
   } 

      p:nth-child(2){
        font-size:16px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(102,102,102,1);
        line-height: 60px;
   } 
     p:nth-child(3){
      font-size:16px;
      font-family:MicrosoftYaHei-Bold;
      font-weight:bold;
      color:rgba(51,51,51,1);
      line-height: 89px;
   } 
      a{
        width:100px;
        height:35px;
        background:rgba(241,87,73,1);
        box-shadow:0px 2px 4px 0px rgba(249,108,108,0.5);
        border-radius:4px;
        color:#fff;
        line-height:35px;
        font-weight:bold;
        cursor: pointer;
        display:inline-block;
        margin:20px 20px;

    }
  }
}
/*取消*/
.isShow_cancel{
  width:500px;
  height:450px;
  background:linear-gradient(180deg,rgba(255,125,85,1) 0%,rgba(255,111,77,1) 100%);
  box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
  border-radius:4px;
  position:fixed;
  bottom: 3%;
  left: 31%;
  z-index: 999;
  .cancel_center{
    width:400px;
    height:350px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 32px 0px rgba(241,87,73,0.5);
    border-radius:4px;
    margin:0 auto;
    margin-top:52px;
    line-height:56px;
    p:nth-child(1){
      color: #F15749;
      font-weight: bold;
      font-size:20px;
    }
     p:nth-child(2) img{  
      height:180px;
    }

    p:nth-child(3) span{
      color:#fff;
      background:#F15749;
      width:100px;
      height:32px;
      border-radius:3px;
      line-height:32px;
      font-size:13px;
      display:inline-block;
      cursor:pointer;
      margin-left:10px;
    }
  }
}
</style>
