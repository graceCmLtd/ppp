<!-- 我是卖家订单中心  全部订单 -->
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
          <el-col :span="3"><div class="intention_mes">{{item.amount/10000}}w</div></el-col>
          <el-col :span="3"><div class="intention_mes date">{{item.maturity}}(剩{{item.remain_days}}天)</div></el-col>
       <!--    <el-col :span="3"><div class="intention_mes">{{item.remain_days}}天</div></el-col> -->
        <!--   <el-col :span="3"><div class="intention_mes amountMes">
            <span class="interest">年化：<span>{{item.interest}}%</span></span>
            <span class="premium">每10w加：<span>{{item.xPerLakh/1000}}k</span></span>
          </div></el-col> -->
          <el-col :span="3"><div class="intention_mes">{{item.real_money/10000}}w</div></el-col>
          <el-col :span="3"><div class="intention_mes">{{item.intentionStatus}}</div></el-col>
          <el-col :span="3">
            <div class="intention_mes"  v-if="item.intentionStatus==='待接单'||item.intentionStatus==='已接单,待支付'||item.intentionStatus==='已失效'">...</div>
            <div class="intention_mes" id="payment" @click="toggleupload(item)" v-if="item.intentionStatus==='已支付,待背书'">上传背书凭证</div>

     <!--        <div class="intention_mes" id="payment" v-if="item.intentionStatus==='已签收'"><router-link :to="{path:'/release/forward',query:{item:item}}">提现  </router-link></div>
 -->
            <div class="intention_mes"  id="color_w" v-if="item.intentionStatus==='已背书,待签收'" v-on:click="toggle()">提醒买家</div>
            <div class="intention_mes" id="payment" v-if="item.intentionStatus==='已签收'">
            <router-link :to="{path:'/release/forward',query:{item:item}}">
              提现  
            </router-link>
          </div>

          </el-col>

          <!-- <el-col :span="3"><div class="intention_mes operaMes">
            <button type="button" name="button">确认交易</button>
          </div></el-col> -->
        </el-row>
        <p class="person_intention_contact">
          <span>订单号：{{item.transacType}}</span>
          <span>公司名称：{{item.companyName}}</span>
          <span>买家联系人：{{item.contactsName}}</span>
          <span>电话:{{item.contactsPhone}}</span>
          <span @click="linkToA(index)"><a v-bind:href="linka" style="text-decoration:none"><img  style="width:95px; height:25px;" src="../../static/img/qq_img.png" title="QQ咨询"></a></span>

          <span class="time_w">倒计时：<i style="font-style: normal; color:#F15749;">10:10:10</i></span>
          <button type="button" name="button" @click="paperMes(index)">订单详情</button>
 


        </p>
      </div>
      <!-- 上传背书凭证 -->
      <div class="show_w" v-show="isShow">
          <div class="center_w">
            <p>上传背书凭证</p>
            <p>请上传您已背书的照片或截图</p>
            <p class="cut_w" ><input type="file" accept="image/jpg" name="" @change="upLoadIs"  value="" alt="" ><span class="Is"><img :src="pic1.src" width="280px" height="160px"></span></p>
            
            <!-- <p :src="pic1">{{pic1}}</p> -->
            <p>
              
              <a @click="submitImg()">确认上传</a>
              <a @click="hiddenShow()" style="background:#ccc;">取消</a>
            </p>
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

      <div class="intention_mes_details" ref="intention_mes_details">
        <div class="top_w">
            <p>票据详情</p>
        </div>
       <!-- 修改后的票据详情弹窗 -->
        <div class="intention_mes_message">
      
          <div class="message_left">
            <ul>
              <li>订单号：<span>{{orderId}}</span></li>
              <li>银行监管账号：<span>{{bankAccount}}</span></li>
              <li>票据总额：<span>{{amount/10000}}w</span></li>
              <li>承对方：<span>{{bank}}</span></li>
              <li>买方：<span>{{companyName}}</span></li>
              <li>贴现利率：<span>{{interest}}%</span></li>
              <li>实收金额：<span>{{real_money/10000}}W(含平台担保交易500)</span></li>
            </ul>
            </div>
        </div>
       <div class="intention_mes_pic" ref="intention_mes_pic">
          <img src="../../static/img/banner1.jpg" alt="" ref="PaperIs">
        </div>
      </div>

    </div>
    <div class="intention_mes_mask" v-show="intentionMaskShow" @click="closePics()">

    </div>

   <!-- 提醒买家的标志 -->
        <div class="shows_w" v-show="issShow"  @click="hiddenShow()">已提醒买家付款 
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
        orderId:null,
        bankAccount:null,
        companyName:null,
        interest:null,
        real_money:0,
        linka:"tencent://message/?uin=11577851&Site=pengpengpiao.cn&Menu=yes",
        //由于这里不需要待接单状态的数据，所以分页也要进行相应的变换
        count1 : 0,
        count2 : 0,//待接单条数
        total : 0,//页面显示的总条数
        currentPage : 1,
        pageSize : 5,
        showPaginate : true,
        current_item:[],
        isShow:false,
        issShow:false,
        pic1:new Image
      }
    },
    methods:{
      getIntenTionList(){
        let _this=this;
        let Id=getCookie('Iud');
        //var count1 = 0;
        //var count2 = 0;
        /*卖家IntentionType状态1或3*/
        _this.axios.post(this.oUrl+'/bills/getBillsIntentions',{
            "uuid":Id,
            "IntentionType":'1',
            //"filter_str":"待接单",
            "currentPage" : _this.currentPage,
            "pageSize" : _this.pageSize
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          for(var i=0;i<res.data.length;i++){
            if(res.data[i].intentionStatus === '待接单')
               res.data.remove(i);
          }
          console.log(res.data);
          _this.noteList=res.data;
        });
        _this.axios.post(this.oUrl+'/bills/getIntentionsCount',{
            "uuid":Id,
            "IntentionType":'1',
            //"filter_str":"待接单",
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          if(res.data != ''){
              _this.count1 = res.data;
          //return count1;
          _this.axios.post(_this.oUrl+'/bills/getIntentionsCount',{
              "uuid":Id,
              "IntentionType":'3',
              "filter_str":"待接单"
          },
          {headers:{
              'Content-Type':'application/json'
          }}
          ).then((res)=>{
              if(res.data != '')
                _this.count2 = res.data;
              _this.total = _this.count1-_this.count2;
              if(_this.total <= 0)
                _this.showPaginate = false;
          });

          }
        });
        
          
          //_this.total = count1-count2;
          /*if(_this.total === 0)
            _this.showPaginate = false;*/
      },
      current_change(currentPage){
        this.currentPage = currentPage;
        this.getIntenTionList();
      },
      upLoadIs(e){
        let _this=this;
        if (e.target.files[0]) {
          let file = e.target.files[0]
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function() {
            img.src = this.result
            _this.pic1 = img
          }
          let img = new Image,
            width = 1024, //image resize   压缩后的宽
            quality = 0.8, //image quality  压缩质量
            canvas = document.createElement("canvas"),
            drawer = canvas.getContext("2d");
          img.onload = function() {
            canvas.width = width;
            canvas.height = width * (img.height / img.width);
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            let base64 = canvas.toDataURL("image/jpeg", quality); //压缩后的base64图片
            //_this.$refs.Is.src=base64;
            window.localStorage.setItem('Is',base64);
            //_this.ocrImage(base64);

          }
        }
        if(_this.time != null){
              _this.choseDate();
          }
      },
      /**/
      toggleupload:function(item){
         this.isShow = !this.isShow;
         this.current_item = item;
      },
      // 提醒卖家付款
        toggle:function(){
            this.issShow = !this.issShow;
        },
        hiddenShow:function () {
                  var that = this;
                  that.issShow = false;
                  that.isShow = false;

        }, 
      /*确认*/
       submitImg(){
          alert("已背书，待签收，图片保存待实现")
         this.axios.post(this.oUrl+"/transaction/updateTransacIntentionStatus",{
          billNumber:this.current_item.billNumber,
          intentionStatus:"已背书,待签收"
        },{headers:{
          'Content-Type':'application/json'
        }}).then((res)=>{
          console.log(res)
          this.isShow = false;
          this.getIntenTionList();
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
        let billNumberLoca=_this.noteList[index].billNumber;
        _this.axios.get(_this.oUrl+'/bills/getbill?billNumber='+billNumberLoca).then((res)=>{
          console.log(res)
          _this.orderId=_this.noteList[index].transacType;
          _this.bankAccount = _this.noteList[index].bankAccount;
          _this.companyName=_this.noteList[index].companyName;
          _this.interest=_this.noteList[index].interest;
          _this.real_money=_this.noteList[index].real_money;
          _this.amount=_this.noteList[index].amount;
          _this.xPerLakh=_this.noteList[index].xPerLakh;
          _this.transacDate=_this.noteList[index].transacDate;
          _this.bank=_this.noteList[index].acceptor;
          _this.releaseDate=_this.noteList[index].releaseDate;
          _this.maturity = _this.noteList[index].maturity;
          _this.remain_days = _this.noteList[index].remain_days;
          _this.axios.get(_this.oUrl+'/bills/getBillPics?billNumber='+billNumberLoca).then((res)=>{
            console.log(res)
            if(res.data != '')
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
      closePics(){
        this.$refs.intention_mes_details.style.top='15%';
        this.$refs.intention_mes_details.style.opacity='0';
        setTimeout(()=>{
          this.intentionMaskShow=false;
          this.$refs.intention_mes_details.style.display='none';
        },200)
      }
    },
    created(){
      this.getIntenTionList()
    }
  }
</script>

<style lang="scss" scoped>
.shows_w{
    width:190px;
    height:40px;
    background:#fff; 
    position:absolute; 
    left:83%;
    top:39%;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    line-height:40px;
    border-radius:5px;
    cursor:pointer;
    color:#333;

   }
#color_w{
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
#color_w:hover{
  background:#ccc;
}
#payment{
    min-height: 28px;
    width: 7%;
    color: white;
    border-radius: 3px;
    background: #48C1F3;
    line-height: 30px;
    margin-top: 32px;
    margin-left: 44px;
    box-shadow:0px 2px 4px 0px rgba(72,193,243,1);
    font-size:13px;
    cursor: pointer;
}
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
  left: 16%;
}
.top_w{
  width:700px;
  height:40px;
  border-bottom:1px solid #F15749;
  text-align:left;
  line-height:40px;
  p{
    font-size:15px;
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
    margin-top: 3%;
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
        position: absolute;
        right: 21%;
        min-height: 28px;
        width: 6%;
        top: 20%;
        color:white;
        border-radius:3px;
        background: #F15749;
        line-height:28px;
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

.center_w{
    width:400px;
    height:350px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
    border-radius:4px;
    margin:0 auto;
    margin-top:52px;
    line-height:40px;
    position:fixed;
    z-index:999;
    top: 30%;
    right: 35%;
      p:nth-child(1){
        font-size:22px;
        font-weight:bold;
        color:#F15749;
      }
      p:nth-child(2){
        color:#666;
        font-size:13px;
      }
      p:nth-child(3){
        width:350px;
        height:200px;
        background:#eee;
        margin:0 auto;
        border-radius:4px;
        cursor:pointer;
      }
      p:nth-child(4) a{
        width:130px;
        height:35px;
        background:#F15749;
        color:#fff;
        line-height:35px;
        display:inline-block;
        border-radius:4px;
        margin: 14px 10px;
        font-family:"微软雅黑";
        font-weight:bold;
        cursor:pointer;
      }
  }
</style>
