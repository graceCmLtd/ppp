<template lang="html">
  <div class="footer_all" :style="{marginTop:height}">
    <div class="contact_us ">
      <div class="contact_us_left">
        <ul>
          <li style="color:black;font-size:17px;">关于我们</li>
          <li>平台简介</li>
          <li>公司信息</li>
          <li>企业文化</li>
        </ul>
        <ul>
          <li style="color:black;font-size:17px;">规则协议</li>
          <li>平台服务协议</li>
          <li>红利圈注册协议</li>
          <li>保证金协议</li>
        </ul>
        <ul>
          <li style="color:black;font-size:17px;">帮助中心</li>
          <li>常见问题</li>
          <li>新手指引</li>
          <li>意见反馈</li>
        </ul>
      </div>
      <div class="contact_us_right">
        <ul>
          <li  style="color:black;font-size:17px;">联系我们</li>
          <li>邮箱：tonightCta@gmail.com</li>
          <li>邮编：518000</li>
          <li>地址：深圳市南山区深圳湾科技生态园11栋A座14楼</li>
        </ul>
      </div>
    </div>
    <div class="about_us">
      <p>京&nbsp;ICP&nbsp;备&nbsp;200901001天津科技有限公司&nbsp;&nbsp;京ICP备2324354354号-1</p>
    </div>
  </div>
</template>

<script>
export default {
  props:['height']
}
</script>

<style lang="scss" scoped>
.footer_all{
  width: 100%;
  height:304px;
  background: #e5e5e5;
  min-width: 1378px;
  min-height: 304px;
  .contact_us{
    width: 100%;
    height:80%;
    box-sizing: border-box;
    position: relative;
    background: #e5e5e5;
    z-index: 10;
    .contact_us_left{
      width: 26%;
      height:100%;
      display: flex;
      justify-content: space-between;
      text-align: left;
      padding-top:2.5%;
      position: absolute;
      left:20%;
      ul{
        li{
          line-height: 40px;
          color:#999;
          font-size: 15px;
          cursor:pointer;
        }
      }
    }
    .contact_us_right{
      text-align: left;
      width: 25%;
      position: absolute;
      right:10%;
      top:16%;
      ul{
        li{
          color:#999;
          font-size: 15px;
          line-height: 40px;
        }
      }
    }
  }
  .about_us{
    width: 100%;
    height:20%;
    background: #09022c;
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
