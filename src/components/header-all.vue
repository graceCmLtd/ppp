<template lang="html">
 <div>
  <!-- 最顶部 -->
  <div id="mall_header">
    <div class="topbar">
    <div class="w1180">
        <div class="toplink">
            <a href="http://pengpengpiao.cn"><img style="width:15px;height:11px;" src="../../static/img/home.png">  碰碰票首页</a>
            <span id="topbar_greet" style="font-size:14px;">欢迎来到碰碰票</span>
            <!-- <a href="" id="topbar_login_btn">请登录</a>
            <a href="" id="topbar_register">免费注册</a> -->
        </div>
        <div >
          <div class="topmenu">
            <a target="_blank" href="">客服电话：<i style="font-style:normal;color:#fff;">4001-521-889 </i></a>
          </div>
          <div class="topmenu" v-if="isSinIn" >
            <a href=""  id="topbar_my_top">
            <router-link to="/release/offer/offerAll">
              个人中心
            </router-link>
          </a>
            <a target="_blank" href="" class="red-point" v-if="showPoint"> <router-link to="/My_news">
              我的消息
            </router-link>
            </a>
            <a target="_blank" href="" v-else="showPoint"> <router-link to="/My_news">
              我的消息
            </router-link>
            </a>
          </div>
          
            
        </div>
    </div>
</div>
</div>
<!-- 头部 -->
  <div class="header_all" style="background-color:#fff;">
    <div class="logo">
      <img src="../../static/img/Logo.png" alt="" @click="page()">
    </div>
    <ul class="header_title">
      <router-link to="/page" tag="li" active-class="active">首页</router-link>
      <router-link to="/marketpa" tag="li" active-class="active">票据市场</router-link>
      <router-link to="/resources" tag="li" active-class="active">资源市场</router-link>
      <router-link to="/releasepa" tag="li" active-class="active">我要贴现</router-link>
      <router-link to="/buyBillPa" tag="li" active-class="active">我要买票</router-link>
      <!--<router-link to="/person_offerIn" tag="li" @click.native="buypaper_w()" </div>:class="{active:color==6}">个人中心</router-link>-->
      
    </ul>
    <div class="header_oper">
      <p class="enter" v-show="enter">
        <router-link to="/signIn" tag="span" class="signIn">注册</router-link>
        <router-link to="/signUp" tag="span" class="signUp">登录</router-link>
      </p>

      <p class="signSucc" v-show="signSucc">欢迎您,<span style="color:#f45643; padding-right: 20%; font-size: 10px;">{{nick}},</span>
        <span style="color:rgb(244, 86, 67);text-decoration:underline; font-size: 10px;" @click="cancellation()">退出</span>
        <!-- <router-link style="color:rgb(244, 86, 67);text-decoration:underline; font-size: 10px;" @click="cancellation()" to="/signUp">另一个退出</router-link> -->
      </p>

      <!-- <span class="user_icon"><img src="../../static/img/user.png" alt="" title="" /></span>
      <span class="mes_icon"><img src="../../static/img/mes.png" alt="" title="" /></span> -->
    </div>
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
        nick:null,
        isSinIn:false,
        showPoint:false
      }
    },


    methods:{
      page(){
        this.$router.push('/page')
      },
      
      receive_msg(){
        let Id = getCookie('Iud');
        console.log(Id);
        let _this = this;
        const h = _this.$createElement;
        if(typeof GoEasy !== 'undefined'){ 
          var goEasy = new GoEasy({
            appkey:'BC-a9752c0d240f407298d5346075fb6de4',
            onConnected:function(){ 
                console.log("Connect to GoEasy success."); 
            } , 
            onDisconnected:function(){ 
                console.log("Disconnect to GoEasy server."); 
            } , 
            onConnectFailed:function(error){ 
                console.log("Connect to GoEasy failed, error code: "+ error.code+" Error message: "+ error.content); 
            } 
          });
        }
        console.log("vvvvvvvv")
        //console.log(goEasy.subscribe)
        goEasy.subscribe({
            channel: Id,
        onMessage: function (message) {
          if(message){
              _this.showPoint = true;
              console.log(message);
              let msg_content = JSON.parse(message.content);
              _this.$notify({
                title: '新消息',
                message: msg_content.msgContent,
                duration: 30000
              });
          }
              
        },
        onSuccess:function(){
          console.log("success")
          //alert("success")
        },
        onFailed:function(error){
          console.log("fail")
          //alert(error)
        }
        });
      },
      getMsg(){
        let id = getCookie("Iud");
        let _this = this;
        _this.axios.get(this.oUrl+'/msg/getUserMsg?receiverId='+id+'&currentPage=1&pageSize=10').then((res)=>{
            console.log(res.data[0].flag);
            if(res.data[0].flag === 0)
              _this.showPoint = true
        });
      },
      cancellation(){//注销
        delCookie('Iud');
        delCookie('Too');
        delCookie('Nick');
        delCookie('isAu');
        delCookie('role');
       // window.location.reload();
       this.$router.push('/signUp')
       window.location.reload();
      },
    },
    created(){
      if (getCookie("Iud") && getCookie('Iud') != "null") {
        this.nick=getCookie('Nick')
        this.enter=false;
        this.signSucc=true;
        this.isSinIn = true;
      }
      this.receive_msg();
      this.getMsg();

    },
    watch:{
      $route(to,from){
        if(getCookie('Iud') && getCookie('Iud') != "null"){
          this.nick=getCookie('Nick')
          this.enter=false;
          this.signSucc=true;
          if (getCookie("Iud")) {
            this.isSinIn = true;
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .red-point{
     position: relative;
  }
  .red-point::before{
    content: " ";
    border: 3px solid #F15749;/*设置红色*/
    border-radius:3px;/*设置圆角*/
    position: absolute;
    z-index: 1000;
    right: 14px;
    margin-right: -8px;
  }

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
    box-shadow:2px 2px 5px rgba(188,188,188,0.5);
    .logo{
      width: 150px;
      height:70px;
      padding-top: 1%;
      cursor:pointer;
      position: absolute;
      left: 9%;
      top: -8%;
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




#mall_header .topbar {
    background-color: #474F5A;
    height: 30px;
    line-height: 30px;
    color: #fff;
    z-index: 999;
}
#mall_header a{
  text-decoration:none;
  font-size:14px;
  color:#323232;
}
#mall_footer .w1180, #mall_header .w1180 {
    width: 1180px;
    margin: 0 auto;
    overflow: visible;
}
#mall_header .w1180 .toplink {
    float: left;
}

#mall_header .w1180 .toplink a, #mall_header .toplink span {
    color: #fff;
    margin-right: 10px;
}
#mall_header .w1180 .topmenu {
    float: right;
    text-align: right;
    color: #fff;
}
#mall_header .topmenu a, #mall_header .topmenu span {
    color: #fff;
    margin: 0 10px;
}
#mall_header .topbar i.tel {
    width: 16px;
    height: 16px;
    background-position: -336px -16px;
}

#mall_header .topbar i {
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
    position: relative;
    top: -2px;
}


</style>
