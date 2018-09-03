<!-- 用户个人企业资料 -->
<template lang="html">
  <div class="person_prise">
    <div class="person_prise_pic">
      <img src="../../static/img/process.png" alt="">
    </div>
    <div class="person_prise_con">
      <p class="prise_title">
        <span>企业信息</span>
      </p>
      <div class="prise_mes">
        <ul class="left">
          <li>公司名称</li>
          <li>联系人姓名</li>
          <li>联系人电话</li>
          <li>联系人邮箱</li>
        </ul>
        <ul class="right">
          <li>****科技有限公司</li>
          <li>范冰冰</li>
          <li>139****0099</li>
          <li>64564647@qq.com</li>
        </ul>
      </div>
      <p class="prise_title">
        <span>营业执照</span>
      </p>
      <div class="prise_pic">
        <div class="prise_upload">
          <input type="file" accept="image/jpeg" name="" value="">
        </div>
      </div>
      <p class="prise_title" style="margin-top:-2%;">
        <span>对公银行账户</span>
      </p>
      <div class="bank_mes">
        <ul class="bank_left">
          <li>账户名称</li>
          <li>开户行</li>
          <li>银行账号</li>
        </ul>
        <ul class="bank_right">
          <li>****科技有限公司</li>
          <li>中国建设银行**分行</li>
          <li>6217000783248325845</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>

<style lang="scss" scoped>
.person_prise{
  width: 100%;
  height: 100%;
  .person_prise_pic{
    width: 100%;
    height:30%;
    img{
      width:100%;
      height:100%;
    }
  }
  .person_prise_con{
    width: 100%;
    height:100%;
    .prise_title{
      width: 94%;
      margin-left: 6%;
      border-bottom:1px solid #ccc;
      text-align: left;
      span{
        border-bottom:4px solid #FF4329;
        padding-bottom:.5%;
        color:#FF4329;
      }
    }
    .prise_mes{
      width: 96%;
      margin-left: 6%;
      display: flex;
      padding-top:3%;
      .left{
        width: 50%;
        text-align: left;
        li{
          padding-left:70%;
          margin-bottom: 4%;
          font-size: 14px;
        }
      }
      .right{
        width: 50%;
        text-align: left;
        li{
          font-size: 14px;
          margin-bottom: 3.8%;
        }
        li:nth-child(2){
          margin-bottom: 4.5%;
        }
        li:nth-child(3){
          margin-bottom: 4.8%;
        }
      }
    }
    .prise_pic{
      width:96%;
      margin-left: 6%;
      height:30%;
      padding-top:4%;
      .prise_upload{
        width: 35%;
        height:80%;
        margin: 0 auto;
        border:1px solid #ccc;
        input{
          width: 100%;
          height:100%;
          opacity: 0;
          cursor:pointer;
        }
      }
    }
    .bank_mes{
      width: 96%;
      margin-left: 6%;
      display: flex;
      padding-top:3%;
      .bank_left{
        text-align: left;
        font-size: 14px;
        width: 50%;
        li{
          padding-left: 70%;
          margin-bottom: 4%;
        }
      }
      .bank_right{
        text-align: left;
        width: 50%;
        font-size: 14px;
        li{
          margin-bottom: 4%;
        }
        li:nth-child(2){
          margin-bottom: 4.5%;
        }
      }
    }
  }
}
</style>
