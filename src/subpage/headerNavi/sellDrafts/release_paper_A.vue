<!-- 正常发布票据 -->
<template lang="html">
  <div class="release_paper" @click="authCheck">
    <div class="release_paper_con">
      <p class="release_paper_title"><span>票据信息</span></p>
      <div class="release_paper_mes">
        <div class="mes_left">
          <p style="position: relative;">票据类型&nbsp;&nbsp;<select  ref="typeSelect" class="select_w" style=" border: 1px solid #000; outline: none;width: 287px;height: 27.97px;">
            <option value ="电银">电银</option>
            <option value ="纸银">纸银</option>
            <option value ="电商">电商</option>
            <option value ="纸商">纸商</option>
          </select>
          </p>
          <p>票据号码<input type="text" v-model:vlaue="billNum" placehoder="" ref="paperNumber" oninput="if(value.length > 30)value = value.slice(0, 30)" /></p>
          <p>票面总额<input type="text" vlaue="" placehoder="" ref="amount"/></p>
          <p class="release_paper_date" style="margin-left:-72px;">票据到期日
            <el-date-picker
              v-model="time"
              type="date"
              placeholder="选择日期"
              value-format="timestamp"
              @change="choseDate()"
            >
            </el-date-picker>
            <span class="time">剩余期限{{dayRe}}天</span>

          </p>
          <p>承兑人全称<input type="text" vlaue="" placehoder="" ref="acceptor"/></p>
          <!--<p>是否可签转<input type="text" vlaue="" placehoder=""/></p>-->
          <p class="obtain">
            <!-- 保存 -->
            <!-- <button type="button" name="button" @click="PaperSave()">保存</button> -->
            <button type="button" name="button" @click="submitMes()"
                    v-loading="loadingRele"
                    element-loading-text=""
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0,0,0,0.1)"
            >{{releText}}</button>
          </p>
        </div>
    

        <div class="mes_right">  
        
          <div class="paper_is">
            <div class="big_w" v-if="bigImg"  style="position:absolute; right:-7%; top: 84%; z-index: 999;" @click="imgScc"><img src="../../../../static/img/toggle.png"></div> 
            <div class="loading" style="" v-if="gifImg">
              <img src="../../../../static/img/loading.gif">
            </div> 
            <span><img :class="{'active':isChoose}" src="../../../../static/img/pic_icon_in.png" alt="" title="" ref="Is" /></span>
            <span style="margin-top: 61%;">上传票据正面</span>
            <input type="file" accept="image/jpeg" name="" value="" @change="upLoadIs">

          </div>

   
          <div class="paper_the">
            <div class="big_w" v-if="bigImgs"  style="position:absolute; right:-7%; top: 84%;z-index: 999;" @click="imgSccs"><img src="../../../../static/img/toggle.png"></div>
            <span><img :class="{'active':isChooses}" src="../../../../static/img/pic_icon.png" alt="" title="" ref="The" /></span>
            <span style="margin-top:61%;">上传票据反面</span>
            <input type="file" accept="image/jpeg" name="" value="" @change="upLoadThe">
          </div>
        </div>
      </div>
      <!-- <p class="service">
        <input type="radio" style="width:20px;height:20px;" value="" :checked="checked" v-show="radioT" @click="radioTC($event)" ref="b"/>
        <input type="radio" style="width:20px;height:20px;" value="" checked="checked" v-show="radioB" @click="radioBC()" />
        同意平台担保交易协议
      </p> -->
      
    </div>
    <div class="release_paper_mask" v-show="PaperMaskShow" @click="closeSave()">
    </div>
    <div class="save_paompt" ref="save_paompt">
      <img src="../../../../static/img/save_icon.png" alt="">
      <p class="save_title">保存成功</p>
      <p class="save_alt">您可以在我的票据-草稿里对该票据编辑发布</p>
      <p>
        <button type="button" name="button">
          <router-link to="/release/offer/offerAll">
             查看审核状态
            </router-link>
          </button>
      </p>
    </div>
    <el-dialog title="温馨提示" :visible.sync="authVisible"
      width="30%"  >
      <span v-model='count'>您还未进行企业认证，{{count}}秒后将自动跳转到认证页面</span>
    </el-dialog>

    <div class="release_prompt" ref="release_prompt">
      <img src="../../../../static/img/rele_icon.png" alt="">
      <p class="release_title">发布成功</p>
      <p class="release_alt">您的票据发布成功，请等待审核通过</p>
      <p>
        <button type="button" name="button" @click="closeSave()">继续发布票据</button>
        <!-- <button type="button" name="button">查看审核状态</button> -->
        <router-link to="/release/paper" tag="button">查看已发布的票据</router-link>
      </p>
    </div>
    
    <Footer :height="minHeight"/>
  </div>
</template>

<script>
  import {getCookie} from '@/assets/util'
  export default {
    data(){
      return{
        minHeight:'10%',
        time:null,
        billNum: '',
        radioT:true,
        radioB:false,
        checked:false,
        PaperMaskShow:false,
        loadingRele:false,
        releText:'发布',
        dayRe:'？',
        typeSelect:'',
        authVisible:false,
        count: '',
        timer: null,
        isChoose:false,
        isChooses:false,
        bigImg:false,
        bigImgs:false,
        gifImg:false,
      }
    },
    components:{
      Header:resolve=>{
        require(['@/components/header-all'],resolve)
      },
      Footer:resolve=>{
        require(['@/components/footer-all'],resolve)
      }
    },
    watch:{//这里创建一个监听，当time发生变化时就调用choseDate()方法
      time(val,oldVal){
        //console.log("time"+val,oldVal);
        if(val != null){
          this.choseDate();
        }
      }
    },
    methods:{
      choseDate(){
        let date=new Date();
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        let day=date.getDate();
        if(month>=1&&month<=9){
          month='0'+month
        };
        let rele=year+'-'+month+'-'+day
        let timeRe = new Date(rele).getTime();
        let remaining=this.time-timeRe;
        this.dayRe=Math.floor(remaining/86400000)
      },
      PaperSave(){
        if(!getCookie('Iud')){
          this.$router.push('/signUp/password');
        }else{
          this.PaperMaskShow=true;
          this.$refs.save_paompt.style.display="block";
          setTimeout(()=>{
            this.$refs.save_paompt.style.opacity='1';
            this.$refs.save_paompt.style.top='30%'
          })
        }
      },
      closeSave(){
        this.$refs.save_paompt.style.opacity='0';
        this.$refs.save_paompt.style.top='15%'
        setTimeout(()=>{
          this.PaperMaskShow=false;
          this.$refs.save_paompt.style.display="none";
        },200)
        this.$refs.release_prompt.style.opacity='0';
        this.$refs.release_prompt.style.top='15%'
        setTimeout(()=>{
          this.PaperMaskShow=false;
          this.$refs.release_prompt.style.display="none";
        },200)
      },
      PaperRele(){
        this.PaperMaskShow=true;
        this.$refs.release_prompt.style.display="block";
        setTimeout(()=>{
          this.$refs.release_prompt.style.opacity='1';
          this.$refs.release_prompt.style.top='30%'
        })
      },
      upLoadIs(e){
        let _this=this;
        if (e.target.files[0]) {
          let file = e.target.files[0]
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function() {
            img.src = this.result
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
            _this.ocrImage(base64);
            _this.bigImg=true;
            _this.$refs.big_w="block";
            _this.gifImg=true;
            _this.$refs.loading="block";

          }
        }
        if(_this.time != null){
            _this.choseDate();
          }
      },
      upLoadThe(e){
        let _this=this;
        if (e.target.files[0]) {
          let file = e.target.files[0]
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function() {
            img.src = this.result
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
            _this.$refs.The.src=base64;
            window.localStorage.setItem('The',base64)
            _this.bigImgs=true;
            _this.$refs.big_w="block";
          }
        }
      },
      // radioTC($event){
      //   this.radioT=false;
      //   this.radioB=true;
      //   $event.target.checked=false
      // },
      // radioBC(){
      //   this.radioT=true;
      //   this.radioB=false;
      // },
      authCheck(){
        let _this = this;
        console.log("authCheck....")
        if (getCookie('role')=="vip" || getCookie('role') == "normal") {
          
          return true;
        }else if(getCookie("isAu") === "true"){
          console.log("ddd22"+getCookie("isAu"));
          this.authVisible = true;
          //this.$router.push({name:"Prise"})
          _this.getCode();
          var t;
          clearTimeout(t);
          t = setTimeout(function(){
            _this.authVisible = false;
            
            _this.$router.push({name:"Servicer"})
          },5000)
          
        }else if(getCookie("isAu") === "false"){
          console.log("fff11");
          this.authVisible = true;
          //this.$router.push({name:"Prise"})
          _this.getCode();
          var t;
          clearTimeout(t);
          t = setTimeout(function(){
            _this.authVisible = false;
            
            _this.$router.push({name:"Data"})
          },5000)
        }
      },
      getCode(){
        console.log("get code xxxxxxxxxxxxxx")
        //this.getPhoneSms();
        const TIME_COUNT = 5;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
      submitMes(){
        let _this=this;
        if(!getCookie('Iud')){
          this.$router.push('/signUp/password')
        }else if(this.authCheck()){
          //let paperNumber=_this.$refs.paperNumber.value;
          let paperNumber=_this.billNum;
          let amount=_this.$refs.amount.value;
          let acceptor=_this.$refs.acceptor.value;
          let Is=window.localStorage.getItem('Is');//票据正面图片
          let The=window.localStorage.getItem('The');//票据反面图片
          let Id=getCookie('Iud');
          let typeSelect = _this.$refs.typeSelect.value;
          console.log("this  refs  aldfjkad")
          console.log(_this.$refs)
          if(paperNumber==''||amount==''||acceptor==''||_this.time==null){
            alert('请先完善票面信息！')
          }else if(!Is && !The){
            //alert('请先上传票据正面图片！')
            alert('请先上传票据图片！')
          }/*else if(!The){
            //alert('请先上传票据反面图片！')
          }*/else{
            _this.loadingRele=true;
            _this.releText=''
            _this.fetch.myPost('/bills/addbill',{
                "billInfo":{
                  "billNumber":paperNumber,
                  "billType":typeSelect,
                  "acceptor":acceptor,
                  "amount":amount,
                  "maturity":_this.time,
                  "status":"审核中",
                  "releaseDate":"2018-08-08",
                  "releaserId":Id,
                  "billPicsId":11111,
                  "transferable":true,
                  "billReferer":"传统渠道"
                },
                "billPics":{
                  "billNumber":paperNumber,
                  "pic1":Is,
                  "pic2":The,
                  "updateDate":"2018-08-08"
                },
                "userData":{
                  "uuid":Id
                }
              },
              {headers:{
                  'Content-Type':'application/json',
                  'Authorization':getCookie('Too')
                }}
            ).then((res)=>{
              console.log(res)
              if(res.data.statusCode==='fail'){
                _this.releText='发布';
                alert('该票已有发布记录！');
                window.location.reload();
              }else{
                _this.loadingRele=false;
                _this.releText='发布';
                _this.loadingRele=false;
                _this.PaperRele();
                window.localStorage.clear();
                _this.$refs.The.src='';
              }
            }).catch((err)=>{
              console.log(err)
            })
          }
        }
      },
      ocrImage(path){
          let _this = this;
          var url = this.oUrl + "/bills/ocrImage";
          var data = {"image":path};
          _this.fetch.httpPost({
            url:'/bills/ocrImage',
            data:data
          }).then(function(res){
              if(res.data.time == "" || res.data.billNumber== ""){
                  _this.time = null;
                  _this.gifImg=false;
                 
                
              }
              var date = new Date(res.data.time); //时间对象
              _this.time = date.getTime(); //转换成时间戳
              _this.billNum = res.data.billNumber;
              _this.gifImg=false
             

          });
          
      },
    imgScc:function () {                     
      this.isChoose = !this.isChoose     
     },
    imgSccs:function () {                     
      this.isChooses = !this.isChooses    
     },

    }
  }
</script>

<style lang="scss">
.loading{
  position:absolute; 
  right: 40%;
  top: 35%;
  z-index: 999;
  width:40px;
  height:40px;
}
  .big_w{
    width:20px;
    height:20px;
    cursor:pointer;
    line-height:20px;
  }
  .el-input__inner{
    width: 200px;
    height:28px!important;
    border-radius: 0;
  }
  .el-input__icon{
    line-height: 0;
  }
  .release_paper{
    width: 100%;
    height:100%;
    min-width: 1166px;
    min-height: 900px;
    .release_paper_con{
      width: 70%;
      height: 67%;
      margin: 0px auto;
      padding-top: 0%;
      background: rgba(255,255,255,1);
      box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
      margin-top: 100px;

      .release_paper_title{
        width: 100%;
        border-bottom: 2px solid #F15749;
        text-align: left;
        span{
          font-size: 16px;
          padding-bottom: .5%;
          font-weight: bold;
          background: #F15749;
          letter-spacing: 2px;
          color: #fff;
          font-weight: bold;
          width: 110px;
          height: 37px;
          text-align: center;
          line-height: 37px;

        }
      }
      .release_paper_mes{
        width: 100%;
        height:100%;
        display: flex;
        margin-top: 3%;
        position: relative;
        .mes_left{
          width: 70%;
          height:100%;
          .release_paper_date{
            position: relative;
            .time{
              position: absolute;
              right: -173px;
              font-size: 15px;
              top: 15%;
              color: red;
            }
            .select_w{
              position: absolute;
            }
          }
          p{
            width: 65%;
            text-align: right;
            margin-top: 2%;
            font-weight: bold;
            input{
              width: 287px;
              height:24px;
              border:1px solid black;
              font-size: 16px;
              margin-left:2%;
            }
            input::-webkit-input-placeholder{
              font-size: 14px;
              color:#ccc;
            }
          }
          .amount{
            padding-right:8.7%;
            box-sizing: border-box;
            input{
              width: 100px;
            }
          }
          .obtain{
              width: 100%;
              text-align: center;
              height: 40px;
              margin-top: 9%;
              position: relative;
              margin-left: -76px;
            button{
              width: 290px;
              height: 40px;
              background: #F15749;
              color: white;
              font-size: 16px;
              border-radius: 5px;
              margin-left: -36px;
            }
            button:nth-child(1){
              position: absolute;
              top:0;
              left:40%;
            }
            button:nth-child(2){
              margin-left: 250px;
            }
          }
        }
        .mes_right{
          width: 30%;
          height:100%;
          .paper_is{
            width: 92%;
            height: 40%;
            padding-top:13%;
            position: relative;
            text-align: center;
            cursor: pointer;
            img{
              width: 100%;
              height:100%;
              position: absolute;
              top:0;
              left:0;
              transform: scale(1);          
              transition: all ease 0.5s; 
            }
             img.active {     
                 transform: scale(2);    
                 position: absolute;          
                 z-index: 100;
                 left:-3%;
                } 
            input{
              width: 100%;
              height:100%;
              position: absolute;
              top:0;
              left:0;
              cursor:pointer;
              opacity: 0;
            }
          }
          .paper_the{
            width: 92%;
            height: 40%;
            padding-top:13%;
            margin-top: 1%;
            position: relative;
            img{
              width: 100%;
              height:100%;
              position: absolute;
              top:0;
              left:0;
              transform: scale(1);          
              transition: all ease 0.5s; 
            }
            img.active {     
                 transform: scale(1.5);    
                 position: absolute;          
                 z-index: 100;
                 left:-3%;
                } 
            input{
              width: 100%;
              height:100%;
              position: absolute;
              top:0;
              left:0;
              cursor:pointer;
              opacity: 0;
            }
          }
        }
      }
      .service{
        position: relative;
        // background: red;
        margin-top:3%;
        position: relative;
        input{
          position: absolute;
          top:-6%;
          left:42%;
          min-height: 21px;
        }
      }
    }
    .release_paper_mask{
      width: 100%;
      height:100%;
      background: rgba(0,0,0,.5);
      position: fixed;
      top:0;
      left:0;
      z-index: 500;
    }
    .save_paompt{
      width:22%;
      height:24%;
      min-width: 362px;
      min-height: 190px;
      position: absolute;
      top:15%;
      background: white;
      left:50%;
      margin-left:-11%;
      border:1px solid #FC4228;
      z-index: 501;
      padding-top:.5%;
      display: none;
      opacity: 0;
      transition: all .5s;
      img{
        width: 51px;
        height:51px;
      }
      .save_title{
        width: 100%;
        color:#FF0000;
        font-size: 20px;
        margin-top: 2%;
      }
      .save_alt{
        width: 100%;
        font-size: 14px;
        margin-top:5%;
        margin-bottom:5%;
      }
      p{
        button{
          width: 120px;
          height:35px;
          background: linear-gradient(180deg,rgba(254,126,89,1),rgba(252,72,45,1));
          border-radius:5px;
          color:white;
        }
      }
    }
    .release_prompt{
      width: 34%;
      height: 29%;
      min-width: 396px;
      min-height: 200px;
      position: absolute;
      top:15%;
      background: white;
      left:50%;
      margin-left:-11%;
      border:1px solid #FC4228;
      z-index: 501;
      padding-top:.5%;
      display: none;
      opacity: 0;
      transition: all .5s;
      img{
        width: 51px;
        height:51px;
      }
      .release_title{
        width: 100%;
        color:#FF0000;
        font-size: 20px;
        margin-top: 2%;
      }
      .release_alt{
        width: 100%;
        font-size: 14px;
        margin-top:5%;
        margin-bottom:5%;
      }
      p{
        button{
          width: 120px;
          height:35px;
          background: #F15749;
          border-radius:5px;
          color:white;
        }
        button:nth-child(2){
          margin-left: 10px;
          margin-right: 10px;
        } 
      }
    }
  }
</style>
