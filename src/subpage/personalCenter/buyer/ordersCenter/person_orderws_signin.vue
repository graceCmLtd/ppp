<!-- 我是买家订单中心  待签收页面 -->
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
          <el-col :span="3"><div class="intention_mes">{{formatNumToStr(item.amount)}}</div></el-col>
          <el-col :span="3"><div class="intention_mes date">{{item.maturity}}(剩{{item.remain_days}}天)</div></el-col>
          <!-- <el-col :span="3"><div class="intention_mes">{{item.remain_days}}</div></el-col> -->
          <el-col :span="3"><div class="intention_mes">{{formatNumToStr(item.real_money)}}</div></el-col>
          <el-col :span="3"><div class="intention_mes">{{item.intentionStatus}}</div></el-col>
            <el-col :span="3"><div style="border-radius:4px; width:8%; color:#fff; background:#48C1F3; margin-top: 29px;line-height: 30px; margin-left: 38px; width: 86px;height: 30px; font-size:14px; cursor:pointer;"@click="submitAccept(item)" >确认签收</div>
              <div style="border-radius:4px; width:8%; color:#fff; background:#48C1F3; margin-top: 29px;line-height: 30px; margin-left: 38px; width: 86px;height: 30px; font-size:14px; cursor:pointer;"@click="checkVoucher(item)" >查看凭证</div></el-col>
        </el-row>
        <p class="person_intention_contact">
          <span>订单号：{{item.transacType}}</span>
          <span>公司名称：{{item.companyName}}</span>
          <span>卖家联系人：{{item.contactsName}}</span>
          <span>电话:{{item.contactsPhone}}</span>
          <span @click="linkToA(index)"><a v-bind:href="linka" style="text-decoration:none"><img  style="width:95px; height:25px; position:relative; top: 7px;" src="../../../../../static/img/qq_img.png" title="QQ咨询"></a></span>
          <span class="time_w">倒计时：<i style="font-style: normal; color:#F15749;">{{num(timerArr[index].minutes)}}:{{num(timerArr[index].seconds)}}</i></span>
          <!-- <button type="button" name="button" @click="paperMes(index)">订单详情</button> -->
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

    </div>
    <div class="intention_mes_mask" v-show="intentionMaskShow" @click="closePics()">

    </div>

    <el-dialog title="凭证图片" width="650px" :visible.sync="dialogTableVisible">
      <img v-bind:src="pic1" width="580px" height="295px">
    </el-dialog>

 
    
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
        showPaginate : true,
        dialogTableVisible:false,
        pic1:'',
        timerArr:[],
        timeout_count:0
      }
    },
    methods:{
      getIntenTionList(){
        let _this=this;
        let Id=getCookie('Iud');
        _this.fetch.myPost('/bills/getBillsIntentions',{
            "uuid":Id,
            "IntentionType":'4',
            "transaction_filter":["已背书,待签收"],            
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
          _this.updateTimer();
        });
        _this.fetch.myPost('/bills/getIntentionsCount',{
            "uuid":Id,
            "IntentionType":'4',
            "transaction_filter":["已背书,待签收"],
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
      formatNumToStr(num){
        return this.util.formatNumberToStr(num)
      },
      linkToA(index){
        /*<a href="'tencent://message/?uin='+{{item.contactsQQ}}+'&Site=pengpengpiao.cn&Menu=yes'" style="text-decoration:none">{{item.contactsQQ}}qq咨询</a>*/
        let _this=this;
        let Id=getCookie('Iud');
        _this.linka = "tencent://message/?uin="+_this.noteList[index].contactsQQ+"&Site=pengpengpiao.cn&Menu=yes"
        //alert(index)
      },
      /*确认签收*/
      submitAccept(item){
        /*//console.log("卖家id")
        //console.log(item.sellerId)
        this.fetch.myPost("/transaction/updateTransacIntentionStatus",{
          "intentionObj":{
            billNumber:item.billNumber,
            orderId:item.transacType,
            intentionStatus:"已签收"
          },
          "message":{
                  "msgType":"交易",
                  "senderId":getCookie("Iud"),
                  "receiverId":item.sellerId,
                  "msgContent":"有买家已签收，交易完成。票号后四位："+item.billNumber.substring(item.billNumber.length-4)+",承兑银行："+item.acceptor+"请到我是卖家订单中心已完成查看",
                  "flag":"0",
                  "path":"/release/center/completes"
                }
          
        },{headers:{
          'Content-Type':'application/json',
          'Authorization':getCookie('Too')
        }}).then((res)=>{
          //console.log(res)*/
          //window.clearInterval(time)
          //this.getIntenTionList()
          //if(res.data.status === "success"){
              
              var data = {
                "billNumber":item.billNumber,
                "orderId":item.transacType,
                "sellerId":item.sellerId,
                "amount":item.amount
              }
              this.fetch.myPost('/transaction/reaConfirm',data,
                {headers:{
                        'Content-Type':'application/json',
                        'Authorization':getCookie('Too')
                }}).then(res=>{
                    if(res.data.status=="success"){
                        var json = JSON.parse(res.data.result);
                        alert(json.result_msg)
                        //console.log("wwww")
                        this.$router.push({name:'OrderwsCompletes'});
                    }
                });
          //}

        //})
      },
      /*更新倒计时数组*/
       updateTimer(){
          let _this = this;
          //var temp ={};
          var date = new Date().getTime()/1000;
          var timeout = 1200;
          //console.log("date ")
          //console.log(date)
          let reloadFlag = false;
          for (let i = 0; i < _this.noteList.length; i++) {
            let temp ={}
            let a = date - _this.noteList[i].updateTimeStamp
           
            if(a >1200.0 || _this.noteList[i].intentionStatus !="已背书,待签收"){
              //console.log(i+"  timeout ")
              temp["minutes"]= 0;
              temp["seconds"]= 0;
              temp["flag"] = false;
              _this.timeout_count ++;
              if (a>1200 && _this.noteList[i].intentionStatus =="已背书,待签收") {
                /*transacType 为 orderid 超时失效*/
                reloadFlag = true;
              _this.fetch.myPost("/transaction/updateTransacIntentionStatusByOrderId",{
                orderId:this.noteList[i].transacType,
                intentionStatus:"已超时"
              },{headers:{
                'Content-Type':'application/json',
          'Authorization':getCookie('Too')
              }}).then((res)=>{
                //console.log(res)
                
              })
              }
               
            }else{
              temp["minutes"]=Math.floor(20 - (date - _this.noteList[i].updateTimeStamp)/60);
              temp["seconds"]=Math.round(60 - (date - _this.noteList[i].updateTimeStamp)%60);
              temp["flag"] = true;
            }
            _this.timerArr[i] = temp;
            //console.log("shenemgui ")
            //console.log(_this.timerArr[i])
            
          }
          if (reloadFlag) {
            _this.getIntenTionList()
            reloadFlag = false;
          }
          //console.log("minuete ")
          //console.log(_this.timerArr)
       },
       /*倒计时*/
      num(n) {
        return n < 10 ? '0' + n : '' + n
      },
       timer () {
        var _this = this
        var time = window.setInterval(function () {
          if (_this.timerArr.length == 0) {
            //console.log("数组为空，倒计时结束")
            window.clearInterval(time)
          }
          /*//console.log("this ....... path ")
          //console.log(_this.$route.path)*/
          /*跳转页面时停止计时器*/
          /*if (_this.$route.path == "/release/orderws/audit") {
          }else{
            window.clearInterval(time)
          }*/
          /*跳转页面时停止计时器end*/
          for (var index = 0; index < _this.timerArr.length; index++) {
            if (_this.timerArr[index].seconds === 0 && _this.timerArr[index].minutes > 0) {
              /*剩余10分钟提醒*/
              if (_this.timerArr[index].minutes == 10 && _this.timerArr[index].seconds == 0) {
                  _this.$notify({
                    title: '新消息',
                    message: "您有一笔待签收订单即将超时，请及时到我是买家->我的订单 完成签收",
                    duration: 30000
                  });
              }
              /*剩余10分钟提醒 end*/
              let t1 = {}
              t1["seconds"] = 59;
              t1["minutes"] = _this.timerArr[index].minutes -1;
              t1['flag'] = true;
              _this.timerArr.splice(index,1,t1)
            } else if (_this.timerArr[index].minutes === 0 && _this.timerArr[index].seconds === 0 && _this.timerArr[index].flag) {
              _this.timerArr[index].flag = false;
              _this.timeout_count ++;
              _this.timerArr[index].seconds = 0
              
              /*transacType 为 orderid 超时失效*/
              _this.fetch.myPost("/transaction/updateTransacIntentionStatusByOrderId",{
                orderId:this.noteList[index].transacType,
                intentionStatus:"已超时"
              },{headers:{
                'Content-Type':'application/json',
          'Authorization':getCookie('Too')
              }}).then((res)=>{
                //console.log(res)
              })
              /*发送超时消息*/
              this.fetch.myPost("/publish/send",{
                "message":{
                  "msgType":"交易",
                  "senderId":getCookie("Iud"),
                  "receiverId":_this.noteList[index].sellerId,
                  "msgContent":"有买家未能及时签收，交易将被回滚并失效,订单号："+_this.noteList[index].transacType,
                  "flag":"0",
                  "path":"/release/center/audit"
                }
               },{headers:{
                'Content-Type':'application/json',
          'Authorization':getCookie('Too')
              }}).then(()=>{
                //alert("已提醒")
              })
              /*发送超时消息  end*/
              //window.clearInterval(time)
            } else if(_this.timerArr[index].minutes > 0 || _this.timerArr[index].seconds > 0) {
              
              let t1 = {}
              t1["seconds"] = _this.timerArr[index].seconds;
              t1["minutes"] = _this.timerArr[index].minutes ;
              _this.timerArr.splice(index,1,t1)
              _this.timerArr[index].seconds -= 1 
            }else{
                //console.log(index +"： index  倒计时结束")
              //console.log(_this.timeout_count)
              //console.log(_this.timerArr.length)
              if(_this.timeout_count >= _this.timerArr.length)
              {
                //console.log(_this.timeout_count)
                window.clearInterval(time)
                _this.timeout_count =0
              }
            }
          }
        }, 1000)
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
            //console.log(res.data.length)
            if(res.data.length === 1)
                 _this.$refs.PaperIs.src=res.data[0].pic1;
            else
                _this.$refs.PaperIs.src='';
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
      checkVoucher(item){
          //console.log(item.transacType);
          this.dialogTableVisible = true;
          var orderId = item.transacType;
          this.fetch.httpPost({
            url:'/transaction/getPicsByOrderId',
            data:{
              orderId:orderId
            }
          }).then((res)=>{
            //console.log("获取凭证图片")
              //console.log(res)
              //console.log(res.data);
              if(res.data.length > 0)
                this.pic1 = res.data[0].pic1;
          }).catch((error)=>{
            //console.log(error)
          });
      }
    },
    created(){
      this.getIntenTionList()
    },
    mounted(){
      this.timer()
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
.time_w{
  width:126px;
  height:19px;
  font-size:14px;
  font-weight:bold;
  color:rgba(3,3,3,1);
  line-height:19px;
  display:inline-block;
  background:#fff;
  box-shadow:0px 2px 4px 0px rgba(0,0,0,0.2);
  border-radius:4px;
  position: relative;
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
    .bankMes{
    }
    .lineHeight{
      line-height: 35px!important;
      font-size: 13px;
      min-width: 95px;
    }
    .amountMes{
      line-height: 0;
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
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
          min-height: 28px;
          width: 6%;
          color: white;
          border-radius: 3px;
          background: #F15749;
          line-height: 28px;
          cursor: pointer;
          float: right;
          margin: 12px 30px;
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
