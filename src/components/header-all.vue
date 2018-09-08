<template lang="html">
  <div class="header_all">
    <div class="logo">
      <img src="../../static/img/Logo.png" alt="" @click="page()">
    </div>
    <ul class="header_title">
      <router-link to="/page" tag="li" @click.native="pageAc()" :class="{active:color==1}">首页</router-link>
      <router-link to="/marketpa" tag="li" @click.native="market()" :class="{active:color==2}">票据市场</router-link>
      <router-link to="/resources" tag="li" @click.native="resources()" :class="{active:color==3}">资源市场</router-link>
      <router-link to="/releasepa" tag="li" @click.native="releasePa()" :class="{active:color==4}">我要贴现</router-link>
      <router-link to="/marketpa" tag="li" @click.native="buypaper()" :class="{active:color==5}">我要买票</router-link>
      <!--<router-link to="/person_offerIn" tag="li" @click.native="buypaper_w()" :class="{active:color==6}">个人中心</router-link>-->
          <router-link to="/release/offer/offerAll">
            <span  style="font-size:14px; width:100px; line-height:76px;">个人中心</span>
          </router-link>
    </ul>
    <div class="header_oper">
      <p class="enter" v-show="enter">
        <router-link to="/signIn" tag="span" class="signIn">注册</router-link>
        <router-link to="/signUp" tag="span" class="signUp">登录</router-link>
      </p>




      <p class="signSucc" v-show="signSucc">欢迎您,<span style="color:#f45643; padding-right: 20%; font-size: 10px;">{{nick}},</span>
        <span style="color:rgb(244, 86, 67);text-decoration:underline; font-size: 10px;" @click="cancellation()">退出</span>
      </p>

      <!-- <span class="user_icon"><img src="../../static/img/user.png" alt="" title="" /></span>
      <span class="mes_icon"><img src="../../static/img/mes.png" alt="" title="" /></span> -->
    </div>
  </div>
</template>

<script>
  import {getCookie} from '@/assets/util'
  import {delCookie} from '@/assets/util'
  export default {
    data(){
      return{
        color:1,
        enter:true,
        signSucc:false,
        nick:null
      }
    },


    methods:{
      page(){
        this.$router.push('/page')
      },
      pageAc(){
        this.color=1;
      },
      market(){
        this.color=2;
      },
      resources(){
        this.color=3;
      },
      releasePa(){
        this.color=4;
      },
      buypaper(){
        this.color=5;
      },
      cancellation(){//注销
        delCookie('Iud');
        delCookie('Too');
        delCookie('Nick');
        delCookie('isAu');
        window.location.reload();
      },
    },
    watch:{
      $route(to,from){
        if(getCookie('Iud')){
          this.nick=getCookie('Nick')
          this.enter=false;
          this.signSucc=true;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .active{
    background: #F15749;
    color:white;
  }
  .header_all{
    width: 100%;
    height:8%;
    min-height: 75px;
    min-width: 1631px;
    padding-left:15%;
    position: relative;
    z-index: 500;
    box-shadow:0px 0px 30px 0px rgba(188,188,188,0.5);

    .logo{
      width: 150px;
      height:70px;
      padding-top: 1%;
      cursor:pointer;
      position: absolute;
      left:15%;
      top:-3%;
      img{
        width: 100%;
        height:100%;
      }
    }
    .header_title{
      width: 37%;
      height:100%;
      display: flex;
      position: absolute;
      left: 30%;
      top:0;
      li{
        cursor:pointer;
        font-size: 16px;
        height:100%;
        line-height: 75px;
        width: 25%;
      }
    }
    .header_oper{
      width: 10%;
      height:50%;
      position: absolute;
      right:15%;
      top:30%;
      display: flex;
      justify-content: space-around;
      span{
        cursor:pointer;
        font-size: 14px;
        line-height: 22px;
        height:22px;
        width: 36px;
        /*margin-right: 14%;*/
      }
      .enter{
        width: 100px;
        height:24px;
        background: white;
        display: flex;
        border-radius:10px;
        margin-top:4px;
        span{
          width: 50%;
          height:100%;
          line-height: 24px;
          text-align: center;
          box-sizing: border-box;
          color:white;
          font-size: 12px;
        }
        .signIn{
          border:1px solid #ff512c;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          border-right:0;
          color:black;
        }
        .signUp{
          background: #ff512c;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }

      }
      .signSucc{
        width: 200px;
        font-size: 14px;
        margin-top:3%;
        text-align: left;
      }
      .user_icon{
        img{
          width: 25px;
          height:25px;
        }
      }
      .mes_icon{
        img{
          width: 25px;
          height:25px;
        }
      }
    }
  }
</style>
