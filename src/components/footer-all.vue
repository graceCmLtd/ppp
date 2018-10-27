<template lang="html">
  <div class="footer_all" :style="{marginTop:height}">
    <div class="contact_us ">

      <ul class="header">
        <li>
           <router-link to="/footside/about">
               关于我们
           </router-link>
        </li>
        <li>    
           <router-link to="/footside/help">
             帮助中心
           </router-link>
         </li>
        <li>
          <router-link to="/footside/clause">
            碰碰票服务条款及说明 
          </router-link>
        </li>
        <li>
          <router-link to="/footside/security">
          安全保障
          </router-link>
        </li>
        <li> 
          <router-link to="/footside/cooperation">
          合作专区  
        </router-link>
        </li>
      </ul>
      <p style="margin-top: 60px;">客服热线：4001-521-889 （时间：9:00——18:00）</p>
      <p style="margin-top: 10px;">电子邮箱：info@pengpengpiao.com</p>
      <p style="margin-top: 20px;">琼&nbsp;ICP&nbsp;备&nbsp;<a href="http://www.miitbeian.gov.cn" style="color: white;">18003430</a>号 格熙（海南）区块链科技有限公司</p>
    </div>
    <div class="about_us">
      <p>本站声明：请仔细阅读用户协议，本站所载文章，数据仅供参考，使用前请审核，风险自负。</p>
    </div>
  </div>
</template>

<script>
  export default {
    props:['height']
  }
</script>

<style lang="scss" scoped>
  *{
    list-style: none;
    padding: 0;
    margin: 0;
    clear: both;
  }
  .footer_all{
    width: 100%;
    height:304px;
    background: #333333;
    min-height: 304px;
    margin: 0 auto;
    .contact_us{
      height: 80%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      position: relative;
      background: #333333;
      z-index: 10;
      text-align: center;
      max-width: 1200px;
      margin: 0 auto;
      .header{
        padding-top: 30px;
        display: flex;
        flex-direction: row;
        li{
          flex: 1;
          font-size: 17px;
          color: #fff;
          cursor: pointer;
        }
      }
      p{
        color: #fff;
      }
    }
    .header li:hover{
      text-decoration:underline;
    }
    .about_us{
      width: 100%;
      height:20%;
      background: #101010;
      line-height: 60px;
      color:white;
      position: relative;
      z-index: 10;
      p{
        width: 80%;
        text-align: center;
        font-size: 14px;
        position: absolute;
        left:50%;
        margin-left: -40%;
      }
    }
  }
</style>
