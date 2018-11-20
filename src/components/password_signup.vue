<!-- 密码登录 -->
<template lang="html">
  <div class="password_signup">
    <p class="phone">
      <span style="color:red;">*</span>手机号：&nbsp;&nbsp;<input  type="text" value="" placeholder="" ref="phoneNumber" maxlength="11" />
    </p>
    <p class="code"><span style="color:red;">*</span>密码：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" value="" placeholder="" ref="pass" /></p>
    <p class="code"><span style="color:red;">*</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" value="" placeholder="" ref="pass" /><img :src="imageUrl" @click="getValidatePic"></p>
    <p class="turn">
      <button type="button" name="button" @click="sginIn()"
      v-loading="loadingSginUp"
      element-loading-text=""
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0,0,0,0.1)"
      >{{sginUpText}}</button>
    </p>
      <a> 
       <router-link to="/forgetp"  style="font-size:13px; color: #3a83e8;text-decoration:none; float: right; margin-left：10px; margin-right: 99px;">忘记密码? 
       </router-link>
     </a>
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
      imageUrl:''
    }
  },
  methods:{
    sginIn(){
      let _this=this;
      let phone=_this.$refs.phoneNumber.value;
      let pass=_this.$refs.pass.value;
      if(phone==''||pass==''){
        alert('请输入手机号或密码')
      }else{
        _this.sginUpText='';
        _this.loadingSginUp=true;
        _this.axios.post(_this.oUrl+'/login',
        {
          "user_phone":phone,
          "user_passwd":pass
        },
        {header:{
          'Content-Type':'application/json',
          'Authorization':getCookie('Too')
        }}
      ).then((res)=>{
        console.log(res.data)
        if(res.data.status === "success"){
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
            if(_this.back){
              console.log("_this  back     ")
              console.log(window.history)
              console.log(this.$route)
              window.history.back()
              setTimeout(()=>{
              window.history.back()
              },0)
            }else{
              console.log("else ,,,,,")
              console.log(this.$route)
              console.log(window.history)
              window.history.back()
              }
          }else if(res.data.status === "fail"){
              alert(res.data.errorMsg);
              window.location.reload();
          }
        
        })
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
  getQuery(){
    this.back=this.$route.query.back;
  }
},
created(){
  this.getQuery(),
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
    margin-top:10%!important;
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
