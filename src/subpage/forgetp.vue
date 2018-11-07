<template lang="html">
  <div class="sgin_in">
    <div class="box">
      <p>有任何问题请联系客服</p>
      <p >电话:<i style="color: orangered;">15101699799</i><span style="margin-left: 3px; display: inline-block; width: 70px; height: 25px; font-weight: bold; text-align: center; line-height: 25px; color: #FFF; background: orange; border-radius: 5px;">QQ客服</span></p>
    </div>
    <!-- <Header/> -->
    <div class="sgin_in_con">
      <p class="sgin_in_title">找回/修改密码</p>
      <div class="signIn_mes">
        <ul class="signIn_message" style="margin-top: 30px;">

          <li style="margin-top: 20px;"><i style="font-style:normal;color: #FF0000;">*</i>
            手机号码:&nbsp;&nbsp;&nbsp;
            <input type="tel" maxlength="11" value="" v-model="Phone"/></li>
          

          <li style="margin-top: 20px;"><i style="font-style:normal; color: #FF0000;">*</i>手机验证码:&nbsp;&nbsp;<input type="text" value="" ref="PhoneCode" maxlength="6"/>

            <span v-show="show" @click="getCode()" style="width: 130px; height: 43px; display: inline-block; text-align: center; line-height: 43px; background: #F15749; color: #fff; margin-left: 20px; cursor: pointer; border-radius: 5px;">
            获取短信验证码</span>
            <span v-show="!show" class="count"  style="width: 130px; height: 43px; display: inline-block; text-align: center; line-height: 43px; background: #ccc; color: #fff; margin-left: 20px; border-radius: 5px; cursor: pointer;">{{count}} S</span></li>
            <div class="retrieve_password">
              <li style="margin-top: 20px; position: relative;">
                <i style="font-style:normal;color: #FF0000;">*</i>
                输入新密码:
                <input type="text" v-if="pwdType" v-model="eyetxt">
                <input type="password" placeholder="" v-model="eyetxt" v-else maxlength="16" v-model.lazy="passwordModel">
                <img src="" alt="">
                <img :src="seen ? seenImg : unseenImg" @click="changeType()" class="eye_img" style="position: absolute; top: 25%; left: 90%;"/>
                <span style="margin-left:50px; color:#FF0000;">{{passwordValidate.errorText}}</span>
              </li>

              <li style="margin-top: 20px; position: relative; width: 146%;"><i style="font-style:normal;color: #FF0000;">*</i>确认新密码:&nbsp;
                <input type="password" maxlength="16" value="" ref="pass"  v-model.lazy="passwordcheckModel"/><br>
                <span  style="margin-left:59px; color:#FF0000;">{{passwordCheckValidate.errorText}}</span>
              </li>
          </div>

        </ul>
      </div>
     <!--  <p class="ment"><input type="checkbox" name="vehicle" value="Bike">我已阅读<span style="color:#F15749; cursor: pointer;"  @click="open">《碰碰票服务条款及说明》</span></p> -->
      <p class="turnSignin"><button @click="sginIn()"
                                    v-loading="loadingSginIn"
                                    element-loading-text=""
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0,0,0,0.1)"
      >{{siginInText}}</button></p>
    </div>
    <div class="signIn_mask" v-show="signInMaskShow">

    </div>
    <div class="signIn_prompt" ref="signIn_prompt">
      <img src="../../static/img/feedback.png" alt="">
      <button type="button" name="button" @click="sginUp()">立即登录</button>
    </div>
  </div>
</template>

<script>
 import {getCookie} from '@/assets/util'
  export default {
    data(){
       oldNum:0   
      return{
        signInMaskShow:false,
        loadingSginIn:false,
        siginInText:'确认修改密码并登录',
        Phone:"",
        show: true,
        count: '',
        timer: null,
        seen:'',
        unseenImg:"../../static/img/close.png",//看不见
        seenImg:"../../static/img/open.png",//看得见密码
        eyetxt:"",
        pwdType:false, //此时文本框隐藏，显示密码框
        passwordcheckModel:'',
        passwordModel:''
      }
    },
    methods:{
      sginIn(){
        let _this=this;
        //let name=_this.$refs.UserName.value;//用户名
        let phone=_this.Phone;//手机号码
        //let code=_this.$refs.Code.value;//图形验证码k
        let phoneCode=_this.$refs.PhoneCode.value;//手机验证码
        let pass=_this.$refs.pass.value;//密码
        //let amgrent_w=_this.$refs.amgrent_w.value;
        //||amgrent_w==''
        if(phone==''||phoneCode==''||pass==''){
          alert('请先完善您的个人信息！')
        }else{
          _this.siginInText='';
          _this.loadingSginIn=true;
          _this.axios.post(_this.oUrl+'/register',
            {
              "login_name":"default",
              "user_phone":phone,
              "user_passwd":pass,
              "code":phoneCode
            },
            {header:{
                'Content-Type':'application/json'
              }},
          ).then((res)=>{
            console.log(res)
            if (res.data.status == 'success') {
              _this.siginInText='同意协议并注册';
              _this.loadingSginIn=false;
              _this.loadingSginIn=false;
              _this.signInMaskShow=true;
              _this.$refs.signIn_prompt.style.display='block';
              setTimeout(()=>{
                _this.$refs.signIn_prompt.style.opacity='1';
                _this.$refs.signIn_prompt.style.top='15%';
              })
            }else if(res.data.errorMsg == "the phone sms is wrong"){
              alert("手机验证码错误")
            }else{
              alert("注册失败")
            }

          })
        }
      },
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
      sginUp(){
        this.$router.push({
          name:'Password',
          query:{
            back:true
          }
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
      changeType:function(){
        this.seen = !this.seen;//小眼睛的变化
        this.pwdType=!this.pwdType;//跟着小眼睛变化，密码框隐藏显示文本框，内容就显示了
      }
    },
    computed:{
       passwordValidate: function() {
        var errorText;

        if(!/^[0-9A-Za-z]{6,15}$/.test(this.passwordModel)) {
            errorText = '密码少于6位'
        } else {
            errorText = ''
        }
        if(!this.passwordFlag) {
            errorText = ''
            this.passwordFlag = true
        }
        return {
            errorText
        }
      },
        passwordCheckValidate: function() {
        var errorText;
        if(!/^[0-9A-Za-z]{6,15}$/.test(this.passwordcheckModel)) {
            errorText = '密码少于6位'
        }else if(this.passwordcheckModel !==this.passwordModel ){
            errorText = '两次密码不匹配'
        }
        else {
            errorText = ''
          }
        if(!this.passwordFlag) {
                  errorText = ''
                  this.passwordFlag = true
              }
        return {
            errorText
        }
    },


    Phone: {
      set: function(value) {
          this.msg = value;
        
      },
      get: function() {
          return this.msg.replace(/[^0-9]+/g,'')
      }
    },
    
},

  
    created(){
      let token = getCookie("Too");
      if (token) {
      console.log("else ,,,,,")
          console.log(this.$route)
          console.log(window.history)
          window.history.back()
           window.history.back()
      }
    }
  }

</script>

<style lang="scss" scoped>
  .sgin_in{
    width: 100%;
    height:100%;
    min-width: 1378px;
    /*background:rgba(242,242,242,1);*/
        .box{
      position: absolute;
      top: 44%;
      right: 13%;
      font-weight:bold;
      text-align:left;
      line-height:30px;
      }
    .sgin_in_con{
      width: 26%;
      height: 52%;
      margin: 0 auto;
      margin-top: 3% !important;
      /*border: 1px solid red;*/
      border-radius: 4px;
      min-height: 750px;
      min-width: 1208px;
      background:white;
      .sgin_in_title{
        font-size:25px;
        border-bottom:1px solid #ccc;
        line-height:60px;
      }
      .signIn_mes{
        width: 100%;
        height:56%;
        margin:0 auto;
        display: flex;
        padding-top:4%;
        .signIn_title{
          width: 50%;
          height:100%;
          text-align: right;
          li{
            padding-right:18%;
            margin-bottom: 7.2%;
          }
        }
        .signIn_message{
          font-size: 16px;
          width: 50%;
          text-align:left;
          margin-left:25%;
          li{
            margin-bottom:4%;
            input{
              min-height: 24px;
              font-size: 14px;
              border:1px solid #ccc;
              width: 80%;
              height: 40px;
            }
          }
          li:nth-child(2){
            input{
              width: 55%;
            }
          }
          /*li:nth-child(4){
            input{
              width: 44%;
            }
            span{
              background: #FF452C;
              padding:.5%;
              font-size: 12px;
              border-radius:3px;
              color:white;
              margin-left:.5%;
              cursor:pointer;
            }
          }*/
        }
      }
      .ment{
        width: 100%;
        text-align: center;
        margin-left: -97px;
        input{
          width: 12px;
          height:12px;
        }
      }
      .turnSignin{
        width: 100%;
        text-align: center;
        margin-top: 4%;
        button{
          width: 341px;
          height:38px;
          border-radius:5px;
          background: rgb(241, 87, 73);
          color:white;
        }
      }
    }
    .signIn_mask{
      width: 100%;
      height:100%;
      background: rgba(0,0,0,.5);
      position: fixed;
      top:0;
      left:0;
      z-index: 500;
    }
    .signIn_prompt{
      width: 580px;
      height:500px;
      position: absolute;
      top:5%;
      left:50%;
      margin-left:-290px;
      z-index: 501;
      display: none;
      opacity: 1;
      transition: all .5s;
      img{
        width: 100%;
        height:100%;
      }
      button{
        position: absolute;
        width: 100px;
        height:30px;
        border-radius:5px;
        top:75%;
        left:50%;
        margin-left:-50px;
        background: linear-gradient(180deg,rgba(254,116,79,1),rgba(252,64,39,1));
        color:white;
      }
    }
  }
</style>
