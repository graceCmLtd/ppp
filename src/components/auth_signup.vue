<!-- 验证码登录 -->
<template lang="html">
  <div class="password_signup">
    <p class="phone">
      <span style="color:red;">*</span>手机号：&nbsp;&nbsp;<input  type="text" value="" placeholder="" v-model="Phone" maxlength="11" />
    </p>
    <p class="code"><span style="color:red;">*</span>验证码：&nbsp;&nbsp;<input type="password" value="" placeholder="" ref="pass" /></p>

     <!-- <button @click="getCode">获取验证码</button> -->

     <span v-show="show" @click="getCode()" style="width: 83px; height: 28px; display: inline-block; text-align: center; line-height: 30px; background: #F15749; color: #fff; font-size:11px;cursor: pointer; border-radius: 5px; position:relative; top:-75px; right:-182px;">
            获取短信验证码</span>
      <span v-show="!show" class="count"  style="width: 83px; height: 28px; display: inline-block; text-align: center; line-height: 30px; background: #ccc; color: #fff; margin-left: 20px; border-radius: 5px; cursor: pointer; position:relative; top:-75px; right:-170px;">{{count}} S</span>

      <p class="code"><span style="color:red;">*</span>&nbsp;&nbsp;<input type="text" value="" placeholder="" ref="pass" /><img :src="imageUrl" @click="getValidatePic"></p>

    <p class="turn">
      <button type="button" name="button" @click="sginIn()"
      v-loading="loadingSginUp"
      element-loading-text=""
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0,0,0,0.1)"
      >{{sginUpText}}</button>
    </p>

      <!-- <a href="" style="font-size:13px; color: #3a83e8;text-decoration:none; float: right; margin-left：10px;margin-right: 99px;">忘记密码?</a> -->
  </div>
</template>

<script>
import {setCookie} from '@/assets/util'
import {getCookie} from '@/assets/util'
export default {
  data(){
    return{
      back:false,
      loadingSginUp:false,
      sginUpText:'登录',
      show:true,
      Phone:'',
      count: '',
      timer: null,
      imageUrl:''
    }
  },
  methods:{
    sginIn(){
      let _this=this;
      let phone=_this.Phone;
      let pass=_this.$refs.pass.value;

      if(phone==''||pass==''){
        alert('请输入手机号或密码')
      }else{
        _this.sginUpText='';
        _this.loadingSginUp=true;
        _this.axios.post(_this.oUrl+'/loginBySms',
        {
          "user_phone":phone,
          "Sms":pass
        },
        {header:{
          'Content-Type':'application/json',
          'Authorization':getCookie('Too')
        }}
      ).then((res)=>{
        console.log(res)
        //console.log(this)
        _this.sginUpText='登录';
        _this.loadingSginUp=false;
        let token=res.data.ticket;
        let uid=res.data.uuid;
        let nick=res.data.user_phone;
        let isau=res.data.CompanyAuthentication;
        let role = res.data.role;
        setCookie('Too',token);
        setCookie('Iud',uid);
        setCookie('Nick',nick);
        setCookie('isAu',isau);
        if(role=="包装户"){
          setCookie('role',"vip")
        }else if(role=="普通用户"){
          setCookie('role','normal')
        }else{
          setCookie('role',"unknown")
        }
         _this.$router.push({name:"MarketPa"})
        if(_this.back){
          console.log("_this  back     ")
          console.log(window.history)
          console.log(this.$route)
          //_this.$router.push({name:"MarketPa"})
          window.history.back()
          setTimeout(()=>{
          window.history.back()
          },0)
        }else{
          console.log("else ,,,,,")
          //_this.$router.push({name:"MarketPa"})
          window.history.back()
          }
        })
      }

  },
  getQuery(){
    this.back=this.$router.query.back;
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
              'Content-Type':'application/json',
          'Authorization':getCookie('Too')
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
      getValidatePic(){
        this.fetch.httpGet({
          url:'/getValidatePic',
          responseType: 'arraybuffer'
        }).then((res) => {
          console.log(res)
            this.imageUrl = 'data:image/png;base64,' + btoa(
                new Uint8Array(res.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
              );
          })
        },
},
created(){
  //this.getQuery()
  this.getValidatePic()
}
}
</script>

<style lang="scss" scoped>
.password_signup{
  width: 100%;
  height:100%;
  padding-top:10%;
  .phone{
    width: 80%;
    margin:0 auto;
    position: relative;
    margin-bottom: 5%;
    input{
      border:1px solid #ccc;
      min-height: 22px;
      font-size: 15px;
    }
  }
  .code{
    width: 80%;
    margin:0 auto;
    input{
      border:1px solid #ccc;
      min-height: 22px;
      font-size: 15px;
    }
  }
  .turn{
    margin-top:2%!important;
    width: 60%;
    min-height: 35px;
    margin:0 auto;
    button{
      width: 100%;
      min-height:35px;
      border-radius:5px;
      font-size: 15px;
      background: #F15749;
      color:white;
    }
  }
}
</style>
