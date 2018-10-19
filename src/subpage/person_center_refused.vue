<!-- 我是卖家订单中心  待背书页面 -->
<template lang="html">
  <div class="person_intention_all">
    <div class="person_intention_mes">
      <el-row>
        <el-col :span="3"><div class="intention_mes_title">票据类型</div></el-col>
        <el-col :span="6"><div class="intention_mes_title">承兑银行</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">票面金额</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">到期日</div></el-col>
      <!--   <el-col :span="3"><div class="intention_mes_title">剩余天数</div></el-col> -->
        <el-col :span="3"><div class="intention_mes_title">交易金额</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">状态</div></el-col>
        <el-col :span="3"><div class="intention_mes_title">操作</div></el-col>
      </el-row>
      <div class="" style="min-width:216px;" v-for="(item,index) in noteList" :key="index" v-model="timerArr">
        <el-row>
          <el-col :span="3"><div class="intention_mes">{{item.billType}}&nbsp;/&nbsp;{{item.billReferer}}</div></el-col>
          <el-col :span="6">
            <div class="intention_mes bankMes"
                 
            >{{item.acceptor}}</div></el-col>
          <el-col :span="3"><div class="intention_mes">{{item.amount/10000}}w</div></el-col>
          <el-col :span="3"><div class="intention_mes date">{{item.maturity}}(剩{{item.remain_days}}天)</div></el-col>
          <el-col :span="3"><div class="intention_mes">{{item.real_money/10000}}w</div></el-col>
          <el-col :span="3"><div class="intention_mes">{{item.intentionStatus}}</div></el-col>
          <el-col :span="3"><div class="intention_mes" id="payment" v-on:click="toggle(item)">上传背书凭证</div></el-col>         
        </el-row>
        <div class="show_w" v-show="isShow">
          <div class="center_w">
            <p>上传背书凭证</p>
            <p>请上传您已背书的照片或截图</p>
            <p class="cut_w" ref="Is"><input type="file" accept="image/jpg" name="" @change="upLoadIs"  value="" alt=""><span class="Is"><img :src="pic1.src" width="280px" height="160px"></span></p>
            <p>
              <a @click="submitImg()">确认上传</a>
              <a @click="hiddenShow()" style="background:#ccc;">取消</a>
            </p>
          </div>
        </div>

        <p class="person_intention_contact">
          <span>订单号：{{item.transacType}}</span>
          <span>公司名称：{{item.companyName}}</span>
          <span>买家联系人：{{item.contactsName}}</span>
          <span>电话:{{item.contactsPhone}}</span>
          <span @click="linkToA(index)"><a v-bind:href="linka" style="text-decoration:none"><img  style="width:95px; height:25px;" src="../../static/img/qq_img.png" title="QQ咨询"></a></span>


            <span class="time_w" v-if="!timerArr[index]">倒计时：<i style="font-style: normal; color:#F15749;">0:0:0</i></span>

            <span class="time_w" v-else >倒计时：<i style="font-style: normal; color:#F15749;"  >{{num(timerArr[index].minutes)}}:{{num(timerArr[index].seconds)}}</i></span>
 
           <button type="button" name="button" @click="paperMes(index)">订单详情</button>
 

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
        <div class="top_w">
            <p>订单详情</p>
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
              <li>实收金额：<span>{{real_money}}W(含平台担保费)</span></li>
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
        currentPage : 1,
        pageSize : 5,
        total : 0,
        isShow:false,
        showPaginate : true,
        current_item:[],
        pic1:new Image,
        timerArr:[],
        m:'',
        s:''
      }
    },
    methods:{
      getIntenTionList(){
        let _this=this;
        let Id=getCookie('Iud');
        /*卖家IntentionType状态1或3*/
        _this.axios.post(this.oUrl+'/bills/getBillsIntentions',{
            "uuid":Id,
            "IntentionType":"3",
            "filter_str":"已支付,待背书",
            "currentPage" : _this.currentPage,
            "pageSize" : _this.pageSize
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          console.log(res)
          _this.noteList=res.data;
          _this.updateTimer();
        });
        _this.axios.post(this.oUrl+'/bills/getIntentionsCount',{
            "uuid":Id,
            "IntentionType":'3',
            "filter_str":"已支付,待背书"
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          if(res.data != '')
            _this.total = res.data;
            
          else
            _this.showPaginate = false;
        });
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
      /*订单详情*/
      paperMes(index){
        let _this=this;
        let billNumberLoca=_this.noteList[index].billNumber;
        _this.axios.get(_this.oUrl+'/bills/getbill?billNumber='+billNumberLoca).then((res)=>{
          console.log(res)
          _this.orderId=_this.noteList[index].transacType;
          _this.bankAccount = _this.noteList[index].bankAccount;
          _this.companyName=_this.noteList[index].companyName;
          _this.interest=_this.noteList[index].interest;
          _this.real_money=((_this.noteList[index].real_money-_this.noteList[index].real_money*5/10000)/10000).toFixed(2);
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
      },
      /*上传背书凭证弹框*/
      toggle:function(item){
         this.isShow = !this.isShow;
         this.current_item = item;
      },
      hiddenShow:function () {
          var that = this;
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
        //let imgIs = window.localStorage.;
        this.axios.post(this.oUrl+"/transaction/addBackEndPics",{
          orderId:this.current_item.transacType,
          pic1:window.localStorage.getItem("Is"),
          pic2:"sss"
        },{headers:{
          'Content-Type':'application/json'
        }}).then((res)=>{
          console.log(res)
          //this.isShow = false;
          //this.getIntenTionList();
        })
       },
       /*更新倒计时数组*/
       updateTimer(){
          let _this = this;
          //var temp ={};
          var date = new Date().getTime()/1000;
          var timeout = 1200;
          console.log("date ")
          console.log(date)
          for (let i = 0; i < _this.noteList.length; i++) {
            let temp ={}
            let a = date - _this.noteList[i].updateTimeStamp
           
            if(a >1200.0){
              console.log(i+"  timeout ")
              temp["minutes"]= 0;
              temp["seconds"]= 0;
              temp["flag"] = false;
            }else{
              temp["minutes"]=Math.floor(20 - (date - _this.noteList[i].updateTimeStamp)/60);
              temp["seconds"]=Math.round(60 - (date - _this.noteList[i].updateTimeStamp)%60);
              temp["flag"] = false;
            }
            _this.timerArr[i] = temp;
            console.log("shenemgui ")
            console.log(_this.timerArr[i])
            
          }
          
          console.log("minuete ")
          console.log(_this.timerArr)
       },
       /*倒计时*/
      num(n) {
        return n < 10 ? '0' + n : '' + n
      },
       timer () {
        var _this = this
         var count =0;
        var time = window.setInterval(function () {
          //let t1 = {}
          for (var index = 0; index < _this.timerArr.length; index++) {
            //console.log("timer")
            //console.log(_this.timerArr[index])
            if (_this.timerArr[index].seconds === 0 && _this.timerArr[index].minutes > 0) {
              // Vue.set
              let t1 = {}
              t1["seconds"] = 59;
              t1["minutes"] = _this.timerArr[index].minutes -1;
              t1["flag"] =  false;
              _this.timerArr.splice(index,1,t1)
            } else if (_this.timerArr[index].minutes === 0 && _this.timerArr[index].seconds === 0 && _this.timerArr[index].flag) {
              count ++;
              _this.timerArr[index].seconds = 0
              console.log(index +"： index  倒计时结束")
              console.log(count)
              console.log(_this.timerArr.length)
              if(count >= _this.timerArr.length)
              {
                console.log(count)
                window.clearInterval(time)
                count =0
              }
              //window.clearInterval(time)
            } else if(_this.timerArr[index].minutes > 0 || _this.timerArr[index].seconds > 0) {
              let t1 = {}
              t1["seconds"] = _this.timerArr[index].seconds;
              t1["minutes"] = _this.timerArr[index].minutes ;
              _this.timerArr.splice(index,1,t1)
              _this.timerArr[index].seconds -= 1 
            }else{
                _this.timerArr[index].flag = true;
            }
          }
        }, 1000)
      },
      /*上传正面图片*/
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
            _this.$refs.Is.src=base64;
            window.localStorage.setItem('Is',base64);
            //_this.ocrImage(base64);

          }
        }
        if(_this.time != null){
              _this.choseDate();
          }
      },
    },
    created(){
      this.getIntenTionList()
    },
    mounted(){
      this.timer();
    }
  }
</script>

<style lang="scss" scoped>
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
    line-height:40px;
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
        right:25%;
        min-height: 28px;
        width: 6%;
        top:30%;
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


</style>
