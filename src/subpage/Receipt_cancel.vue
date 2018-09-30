<!-- 用户全部报价 -->
<!-- 买家待接单 -->
<template lang="html">
  <div class="person_intention_all">
    <div class="person_intention_mes">
      <el-row>
        <el-col :span="3"><div class="intention_mes_title">票据类型</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">承兑银行</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">金额</div></el-col>
        <el-col :span="2"><div class="intention_mes_title">到期日</div></el-col>
        <el-col :span="2"><div class="intention_mes_title">剩余天数</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">实付金额</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">利率</div></el-col>
        <el-col :span="2"><div class="intention_mes_title">状态</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">操作</div></el-col>
      </el-row>
      <div class="" style="min-width:216px;" v-for="(item,index) in noteList" :key="index">
        <el-row>
          <el-col :span="3"><div class="intention_mes">{{item.billType}}&nbsp;/&nbsp;{{item.billReferer}}</div></el-col>
          <el-col :span="3">
            <!-- :class="item.acceptor.length&&item.acceptor.length>8?'lineHeight':''" -->
            <div class="intention_mes bankMes"
                 
            >{{item.acceptor}}</div></el-col>
          <el-col :span="3"><div class="intention_mes">{{item.amount/10000}}w</div></el-col>
          <el-col :span="2"><div class="intention_mes date">{{item.maturity}}</div></el-col>
          <el-col :span="2"><div class="intention_mes">{{item.remain_days}}</div></el-col>
          <el-col :span="3"><div class="intention_mes">{{item.real_money}}</div></el-col>

          <el-col :span="3"><div class="intention_mes amountMes">
            <span class="interest">年化：<span>{{item.interest}}%</span></span>
            <span class="premium">每10w加：<span>{{item.xPerLakh/1000}}k</span></span>
          </div></el-col>
          <el-col :span="2"><div class="intention_mes">{{item.intentionStatus}}</div></el-col>
          <el-col :span="3"><div class="intention_mes operaMes">
            <button type="button" name="button" v-on:click = "acceptOrder(index)">接单</button>
          </div>
          <div class="intention_mes operaMes">
            <button type="button" name="button"  v-on:click="toggle()">修改报价</button>
          </div></el-col>
        </el-row>

        <p class="person_intention_contact">
          <span>{{item.companyName}}</span>
          <span class="pople">{{item.contactsName}}</span>
          <span>电话:{{item.contactsPhone}}</span>
          
          <span @click="linkToA(index)"><a v-bind:href="linka" style="text-decoration:none"><img  style="width:95px; height:25px;" src="../../static/img/qq_img.png" title="QQ咨询"></a></span>
          <button type="button" name="button" @click="paperMes(index)">查看详情</button>
        </p>
        <!-- 修改价格的弹窗 -->
      <div class="show_w" v-show="isShow">
        <div class="center_w">
            <p>修改付款金额</p>
            <p>原实付金额：{{item.real_money/10000}}W</p>
            <p><i style="font-style: normal;font-size:12px;color:#A5A5A5;font-weight:bold;">修改为</i>实付金额： <input type="" name="" style="border:1px solid #ccc; height:32px; width:110px; color:#F15749; font-weight:bold;font-size:20px;" v-model="new_money" placeholder="0"> </p>
            <p @click="changeSubmit(item)">确认修改</p>
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
   <!-- 票据详情的弹窗的修改前-->
    <!--   <div class="intention_mes_details" ref="intention_mes_details">
        <div class="intention_mes_pic" ref="intention_mes_pic">
          <img src="../../static/img/banner1.jpg" alt="" ref="PaperIs">
        </div>
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
      </div> -->
 

        <!-- 票据详情的弹窗的修改后-->
      <div class="intention_mes_details" ref="intention_mes_details">
         <div class="top_w">
            <p>票据详情</p>
          </div>
        <div class="intention_mes_pic" ref="intention_mes_pic">
          <img src="../../static/img/banner1.jpg" alt="" ref="PaperIs">
        </div>

        <div class="intention_mes_message">
          <div class="message_left">
            <ul>
              <li style="height:100px;"><i style="font-style:normal; background:#F15749;color:#fff; font-size:12px;display:block;border-radius:3px;width:35px;height:20px;line-height:20px;margin-top:1px;">电银</i><span style="color:#F15749;font-weight:bold;">{{amount/10000}}w</span><br><i style="font-style:normal; color:#C0C0C0;font-size:13px;">报价金额</i></li>
              <li><i style="font-style:normal; font-weight:bold;">每10w加</i><br><span style="font-weight:normal; color:#C0C0C0;">{{xPerLakh}}</span></li>
              <li><span>{{transacDate}}</span><br><i style="font-style:normal; color:#C0C0C0;font-size:13px;">出票日期</i></li>
              <li><span>{{bank}}</span><br><i style="font-style:normal; color:#C0C0C0;font-size:13px;">承对方</i></li>
              <li><span>{{maturity}}</span><br><i style="font-style:normal; color:#C0C0C0;font-size:13px;">汇票到期</i></li>
              <li style="border-right:none;"><span>{{remain_days}}天</span><br><i style="font-style:normal; color:#C0C0C0;font-size:13px;">剩余天数</i></li>
            </ul>
          </div>
         
             
           
        </div>
   
      </div>
    </div>
    <div class="intention_mes_mask" v-show="intentionMaskShow" @click="closePics()">

    </div>



    <!--内容-->
    <!-- <div class="content_w">
      
      <div class="content_w_first">
        <ul>
          <li><a href="">电银</a></li>
          <li><a href="">中国银行**支行</a></li>
          <li><a href="">100W</a></li>
          <li><a href="">2018-07-30</a></li>
          <li><a href="">7天</a></li>
          <li>
            <a href="">年化:10%
             
            </a>
          </li>
          <li><a href="">待接单</a></li>
          <li style="border-right: none;">
            <button class="btn_w">下一步</button>
          </li>
        </ul>
      </div>
      
      <div class="content_w_second">
        <ul>
          <li><a href="">张家湾****贸易有限公司</a></li>
          <li><a href="">赵总</a></li>
          <li><a href="">13900323434</a></li>
          <li>
            <button class="btn_w">票据详情</button>
          </li>
        </ul>
      </div>

      
      <div class="content_w_first">
        <ul>
          <li><a href="">电银</a></li>
          <li><a href="">中国银行**支行</a></li>
          <li><a href="">100W</a></li>
          <li><a href="">2018-07-30</a></li>
          <li><a href="">7天</a></li>
          <li>
            <a href="">年化：10%</a>
            
          </li>
          <li><a href="">待接单</a></li>
          <li style="border-right: none;">
            
                <button class="btn_w">下一步</button>
          </li>
        </ul>
      </div>

      
      <div class="content_w_second">
        <ul>
          <li><a href="">张家湾****贸易有限公司</a></li>
          <li><a href="">赵总</a></li>
          <li><a href="">13900323434</a></li>
          <li>
            <button class="btn_w" >票据详情</button>
          </li>
        </ul>
      </div>

    </div> -->
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
        isShow:false,
        linka:"tencent://message/?uin=11577851&Site=pengpengpiao.cn&Menu=yes",
        new_money:null,
        currentPage : 1,
        pageSize : 5,
        total : 0,
        showPaginate : true
      }
    },
    methods:{
      getIntenTionList(){
        let _this=this;
        let Id=getCookie('Iud');
        console.log("待接单userid")
        console.log(Id)
        _this.axios.post(this.oUrl+'/bills/getBillsIntentions',{
            "uuid":Id,
            "IntentionType":'4',
            "filter_str":"待接单",
            "currentPage" : _this.currentPage,
            "pageSize" : _this.pageSize
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          console.log(res)
          _this.noteList=res.data;
        });
        _this.axios.post(this.oUrl+'/bills/getIntentionsCount',{
            "uuid":Id,
            "IntentionType":'4',
            "filter_str":"待接单"
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          if(res.data != '')
              _this.total = res.data;
          else
            _this.showPaginate = false;
        })
      },
      current_change(currentPage){
          this.currentPage = currentPage;
          this.getIntenTionList();
      },
      toggle:function(){
            this.isShow = !this.isShow;
     },
      paperMes(index){
        let _this=this;
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
      linkToA(index){
        /*<a href="'tencent://message/?uin='+{{item.contactsQQ}}+'&Site=pengpengpiao.cn&Menu=yes'" style="text-decoration:none">{{item.contactsQQ}}qq咨询</a>*/
        let _this=this;
        let Id=getCookie('Iud');
        _this.linka = "tencent://message/?uin="+_this.noteList[index].contactsQQ+"&Site=pengpengpiao.cn&Menu=yes"
        //alert(index)
      },
      closePics(){
        this.$refs.intention_mes_details.style.top='15%';
        this.$refs.intention_mes_details.style.opacity='0';
        setTimeout(()=>{
          this.intentionMaskShow=false;
          this.$refs.intention_mes_details.style.display='none';
        },200)
      },
      /*接单操作*/
      acceptOrder(index){
        let _this=this;
        let Id=getCookie('Iud');
        let billNumberLoca=_this.noteList[index].billNumber;
        console.log("接单操作订单号和用户id：")
        console.log(billNumberLoca)
        console.log(Id)
        _this.axios.post(this.oUrl+'/transaction/updateTransacIntentionStatus',{
            "billNumber":billNumberLoca,
            "intentionStatus":"已接单",
            "quoterId":Id
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          console.log("接单操作返回值：")
          console.log(res)
          _this.getIntenTionList();
          /*_this.noteList=res.data;*/
        })
      },
      /*修改价格*/
      changeSubmit(param){
        this.isShow = false;
        let billNumberC = param.billNumber
        let Id = getCookie("Iud")
        let _this = this;
        /*两次请求应为一个事物进行处理*/
        _this.axios.post(this.oUrl+'/transaction/updateTransacIntentionStatus',{
            "billNumber":billNumberC,
            "intentionStatus":"已接单",
            "quoterId":Id
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          console.log("修改价格操作返回值：")
          console.log(res)
          /*_this.getIntenTionList();*/
          /*_this.noteList=res.data;*/
        })
/*修改quote表中实付金额*/
        if (_this.new_money) {
          _this.axios.post(this.oUrl+'/quote/updateRealMoney',{
            "billNumber":billNumberC,
            "new_money":_this.new_money,
            "quoterId":Id
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          console.log("更改quote表中实际价格操作返回值：")
          console.log(res)
          _this.new_money = null;
          _this.getIntenTionList();
          
          /*_this.noteList=res.data;*/
        })
        }else{
          alert("请填写修改金额")
        }
        



      }

      /*end of methods*/
    },
    created(){
      this.getIntenTionList()
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
      p:nth-child(4){
        width:220px;
        height:40px;
        background:rgba(241,87,73,1);
        box-shadow:0px 2px 4px 0px rgba(249,108,108,0.5);
        border-radius:4px;
        color:#fff;
        line-height:40px;
        font-weight:bold;
        margin:0 auto;
        cursor: pointer;
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
  .person_intention_mes{
    margin-top: 3%;
    margin-left: 1%;
    .intention_mes_title{
      background: #F15749;
      min-height: 44px;
      line-height: 44px;
      font-weight: bold;
      color: #fff;
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
    .opera{
      border-left:1px solid #ccc;
    }
    .intention_mes{
      margin-top:8px;
      margin-bottom:8px;
      min-height: 60px;
      max-height:70px;
      line-height:70px;
      font-size: 14px;
      min-width: 95px;
    }
    .bankMes{
      border-left:1px solid #ccc;
      border-right:1px solid #ccc;
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
        width: 53%;
        min-height: 32px;
        font-size: 12px;
        border: 1px solid #F15749;
        color: #F15749;
        background: white;
        border-radius: 3px;
        background: #F15749;
        color: #fff;
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
        right: 2.5%;
        min-height: 33px;
        width: 7%;
        top: 14%;
        color: white;
        border-radius: 3px;
        background: #F15749;
      }
      .pople{
        margin-left: 80px;
        margin-right: 40px;
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
              padding: 0 30.2px;
              line-height: 50px;
              border-right: 1px solid #979797;
              margin-top: 31px;
            span{
              font-weight:bold;
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
  .el-message-box{
    width:500px !important;
    #calculator{
    width:450px;
    height:350px;
    background:url("../../static/img/jigou.png");
  }

  }


</style>
