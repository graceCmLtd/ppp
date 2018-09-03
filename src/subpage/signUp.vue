<template lang="html">
  <div class="signUp">
    <div class="signup_con">
      <div class="sginU">
        <ul class="signup_way">
          <router-link to="/signUp/password" @click.native="pass()" :class="{active:color==1}" tag="li">密码登入</router-link>
          <router-link to="/signUp/auth" @click.native="auth()" :class="{active:color==2}" tag="li">手机登入</router-link>
        </ul>
        <div class="way_mes">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      color:1
    }
  },
  methods:{
    pass(){
      this.color=1;
    },
    auth(){
      this.color=2;
    }
  }
}
</script>

<style lang="scss" scoped>
.active{
  background: linear-gradient(180deg,rgba(255,120,81,1),rgba(255,67,40,1));
  color:white;
}
.signUp{
  width: 100%;
  height:100%;
  min-width: 1631px;
  background: url('../../static/img/sginUpBg.png');
  background-size: 100% 100%;
  .signup_con{
    width: 40%;
    height:50%;
    position: absolute;
    left:55%;
    top:30%;
    padding-left:8%;
    .sginU{
      width: 456px;
      height:305px;
      border-radius:12px;
      box-shadow: 10px 15px 30px rgba(0,0,0,.5);
    }
    .signup_way{
      width: 100%;
      height: 55px;
      background: white;
      display: flex;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      border-bottom:0;
      box-sizing: border-box;
      li{
        width: 50%;
        height:100%;
        line-height: 55px;
        cursor:pointer;
      }
      li:nth-child(1){
        border-top-left-radius: 12px;
      }
      li:nth-child(2){
        border-top-right-radius: 12px;
      }
    }
    .way_mes{
      width: 456px;
      min-height: 250px;
      margin:0 auto;
      box-sizing: border-box;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      background: white;
    }
  }
}
</style>
