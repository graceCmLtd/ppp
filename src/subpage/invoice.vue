<!-- 正常发布票据 -->
<template lang="html">
  <div class="release_paper">
    <div class="release_paper_con">
      <div class="release_paper_mes">
        <div class="mes_left">
          <p style="position: relative;">
            票据类型&nbsp;&nbsp;<select  ref="typeSelect" class="select_w" style=" border: 1px solid #000; outline: none;width: 201.99px; height: 27.97px;">
            <option value ="电银">电银</option>
            <option value ="纸银">纸银</option>
            <option value="电商">电商</option>
            <option value="纸商">纸商</option>
          </select>
          </p>
       <!--    <div class="mes_right" style="margin-top:13px;margin-bottom:13px;">
              <div class="paper_is">
                <span style="position:absolute; top:-3px; left: 21px; font-weight:bold;">票据正面</span><br>
                <span style="margin-right:50px;"><img src="../../static/img/pic_icon_in.png" alt="" title="" ref="Is" /></span><br>
                <input type="file" accept="image/jpeg" name="" value="" @change="upLoadIs">
              </div>
              <div class="paper_the">
                <span style="position:absolute; top:-3px; left: 21px; font-weight:bold;">票据反面</span>
                <span><img src="../../static/img/pic_icon.png" alt="" title="" ref="The" /></span>  
                <input type="file" accept="image/jpeg" name="" value="" @change="upLoadThe">
              </div>
          </div> -->

          <p>手机号<input type="text" vlaue="" placehoder="" maxlength="11" ref="PhoneCode"/></p>
          <p>短信验证码<input type="text" vlaue="" placehoder="" style="width:130px; margin-left:10px;" />
            <span v-show="show" @click="getCode()" class="get_w" >获取验证码</span>
            <span v-show="!show" class="count"  style="">{{count}} s</span>
          </p>
          <p class="obtain">
            <button type="button" name="button" @click="submitMes()"
                    v-loading="loadingRele"
                    element-loading-text=""
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0,0,0,0.1)"
            >{{releText}}</button>
          </p>
        </div>
      </div>
    </div>
    <div class="release_paper_mask" v-show="PaperMaskShow" @click="closeSave()">

    </div>
    <div class="save_paompt" ref="save_paompt">
      <img src="../../static/img/save_icon.png" alt="">
      <p class="save_title">保存成功</p>
      <p class="save_alt">您可以在我的票据-草稿里对该票据编辑发布</p>
      <p>
        <button type="button" name="button">查看审核状态</button>
      </p>
    </div>
    <div class="release_prompt" ref="release_prompt">
      <img src="../../static/img/rele_icon.png" alt="">
      <p class="release_title">发布成功</p>
      <p class="release_alt">您的票据发布成功，请等待审核通过</p>
      <p>
        <button type="button" name="button" @click="closeSave()">继续发布票据</button>
        <button type="button" name="button">查看我的票据</button>
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
        show: true,
        count: '',
        radioT:true,
        radioB:false,
        checked:false,
        PaperMaskShow:false,
        loadingRele:false,
        releText:'发布',
        dayRe:'？',
        typeSelect:'',
     
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
    methods:{
      choseDate(){
        let date=new Date();
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        let day=date.getDate();
        let phoneCode=_this.$refs.PhoneCode.value;//手机验证码
        if(month>=1&&month<=9){
          month='0'+month
        };
        let rele=year+'/'+month+'/'+day
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
// 获取验证码
     getPhoneSms(){
        //let Phone = this.phone
        /*let _this = this
        let Phone=_this.Phone;*/
        console.log("the phone number is ")
        console.log(this.Phone)
        this.axios.post(this.oUrl+'/getPhoneSms',{
            "phone":this.Phone
          },
          {headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          console.log(res)
          //this.noteList=res.data;
        })
      },
      getCode(){
        console.log("get code xxxxxxxxxxxxxx")
        this.getPhoneSms();
        const TIME_COUNT = 60;
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
            window.localStorage.setItem('Is',base64)
          }
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
          }
        }
      },
      submitMes(){
        let _this=this;
        if(!getCookie('Iud')){
          this.$router.push('/signUp/password')
        }else{
          let paperNumber=_this.$refs.paperNumber.value;
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
          }else if(!Is){
            alert('请先上传票据正面图片！')
          }else if(!The){
            alert('请先上传票据反面图片！')
          }else{
            _this.loadingRele=true;
            _this.releText=''
            _this.axios.post(this.oUrl+'/bills/addbill',{
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
                  "billReferer":"traditional"
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
                  'Content-Type':'application/json'
                }}
            ).then((res)=>{
              console.log(res)
              if(res.data.statusCode==='fail'){
                _this.releText='发布';
                alert('该票已有发布记录！')
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
      }
    }
  }
</script>

<style lang="scss">

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
    margin:0 auto;
    .release_paper_con{
      width: 100%;
      height:60%;
      margin:0 auto;
      padding-top:5%;
      .release_paper_title{
        width: 100%;
        border-bottom: 2px solid #F15749;
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
          width: 100%;
          height:100%;
          .release_paper_date{
            position: relative;
            .time{
              position: absolute;
              right: -122px;
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
              width: 200px;
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
              margin-top: 6%;
              position: relative;
              margin: 0 auto;
            button{
              width: 296px;
              height: 40px;
              background: #F15749;
              color: white;
              font-size: 16px;
              border-radius: 5px;
              margin-left: -30px;
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
          .paper_is{
            width: 50%;
            height:40%;
            padding-top:18%;
            position: relative;
            margin:0 auto;
            img{
              width: 100%;
              height:100%;
              position: absolute;
              top:0;
              left:0;
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
            width: 50%;
            height:40%;
            padding-top: 19%;
            margin-top: 19%;
            position: relative;
            margin:0 auto;
            margin-top: 10px;
            img{
              width: 100%;
              height:100%;
              position: absolute;
              top:0;
              left:0;
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
          background: linear-gradient(180deg,rgba(254,126,89,1),rgba(252,72,45,1));
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
  .get_w{
      width:88px;
      height:30px;
      border-radius:3px;
      font-style: normal;
      background:#F15749;
      color:#fff;
      display:inline-block; 
      line-height:30px;
      font-weight:normal;
      margin-left:2px;
      font-size:12px;
      text-align:center;
      cursor:pointer;
    }
    .count{
      width: 88px;
      height: 30px; 
      display: inline-block; 
      text-align: center;
      line-height: 30px; 
      background: #ccc; 
      color: #fff; 
      margin-left: 20px;
      border-radius: 5px; 
      cursor: pointer;
    }
</style>
