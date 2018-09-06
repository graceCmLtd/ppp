<template lang="html">
  <div class="sgin_in">
    <!-- <Header/> -->
    <div class="sgin_in_con">
      <p class="sgin_in_title">免费注册</p>
      <div class="signIn_mes">
        <ul class="signIn_title">
          <!--<li><span style="color:red;">*</span>用户名</li>-->
          <li><span style="color:red;">*</span>手机号码</li>
          <li><span style="color:red;">*</span>验证码</li>
          <li><span style="color:red;">*</span>手机验证码</li>
          <li><span style="color:red;">*</span>登录密码</li>
          <li><span style="color:red;">*</span>再次输入密码</li>
        </ul>
        <ul class="signIn_message">
          <li><input type="text" value="" ref="UserName"/></li>
          <li><input type="text" value="" ref="Phone"/></li>
          <li><input type="text" value="" ref="Code"/></li>
          <li><input type="text" value="" ref="PhoneCode"/><span>获取短信验证码</span></li>
          <li><input type="text" value=""/></li>
          <li><input type="text" value="" ref="pass"/></li>
        </ul>
      </div>
      <p class="ment"><input type="checkbox" name="vehicle" value="Bike">
        我已阅读
        <span style="color:red;" class="amgrent_w" ref="alert">《碰碰票协议》</span></p>

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
export default {
  data(){
    return{
      signInMaskShow:false,
      loadingSginIn:false,
      siginInText:'同意协议并注册'
    }
  },
  methods:{
    sginIn(){
      let _this=this;
      let name=_this.$refs.UserName.value;//用户名
      let phone=_this.$refs.Phone.value;//手机号码
      let code=_this.$refs.Code.value;//图形验证码
      let phoneCode=_this.$refs.PhoneCode.value;//手机验证码
      let pass=_this.$refs.pass.value;//密码
      let amgrent_w=_this.$refs.amgrent_w.value;
      if(name==''||phone==''||phone==''||phoneCode==''||pass==''||amgrent_w==''){
        alert('请先完善您的个人信息！')
      }else{
        _this.siginInText='';
        _this.loadingSginIn=true;
          _this.axios.post(_this.oUrl+'/register',
          {
            "login_name":name,
            "user_phone":phone,
            "user_passwd":pass,
            "code":phoneCode
          },
          {header:{
            'Content-Type':'application/json'
          }},
        ).then((res)=>{
          console.log(res)
          _this.siginInText='同意协议并注册';
          _this.loadingSginIn=false;
          _this.loadingSginIn=false;
          _this.signInMaskShow=true;
          _this.$refs.signIn_prompt.style.display='block';
          setTimeout(()=>{
            _this.$refs.signIn_prompt.style.opacity='1';
            _this.$refs.signIn_prompt.style.top='15%';
          })
        })
      }
    },

    sginUp(){
      this.$router.push({
        name:'Password',
        query:{
          back:true
        }
      })
    },
  }
}

</script>

<style lang="scss" scoped>
.sgin_in{
  width: 100%;
  height:100%;
  min-width: 1378px;
  /*background:rgba(242,242,242,1);*/
  .sgin_in_con{
    width: 26%;
    height: 52%;
    margin: 0 auto;
    margin-top: 1% !important;
    /*border: 1px solid red;*/
    border-radius: 4px;
    min-height: 750px;
    min-width: 1208px;
    background:white;
    .sgin_in_title{
      width: 100%;
      text-align: center;
      font-size: 20px;
      margin-top: 0;
      margin-bottom: 2%;
      /*background: linear-gradient(180deg,rgba(0,165,255,1),rgba(0,108,253,1));*/
      height:70px;
      line-height: 70px;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      color:#626262;
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
        width: 50%;
        text-align:left;
        margin-left:-6%;
        li{
          margin-bottom:4%;
          input{
            min-height: 24px;
            font-size: 14px;
            border:1px solid #ccc;
            width: 80%;
          }
        }
        li:nth-child(3){
          input{
            width: 50%;
          }
        }
        li:nth-child(4){
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
        }
      }
    }
    .ment{
      width: 100%;
      text-align: center;
      margin-top: 1%;
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
        width: 310px;
        height:38px;
        border-radius:5px;
        background: #ff462c;
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
