<!-- 用户个人企业资料 -->
<template lang="html">
  <div class="person_prise">
    <div class="person_prise_pic">
      <img src="../../static/img/Authentication.png" alt="">
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
          <li>联系人QQ</li>
          <li>联系人邮箱</li>
        </ul>
        <ul class="right">
          <!--<li>****科技有限公司</li>-->
          <li><input type="text" ref="companyName" placeholder="请输入你的公司名" style="border: 1px solid #ccc; height: 30px; width: 310px;"></li>
          <!--<li>范冰冰</li>-->
          <li><input type="text" ref="contactsName" placeholder="请输入你的姓名" style="border: 1px solid #ccc; height: 30px; width: 310px; "></li>
          <!--<li>139****0099</li>-->
          <li><input type="text" ref="contactsPhone" placeholder="请输入你的手机号" style="border: 1px solid #ccc; height: 30px; width: 310px; "></li>
          <!--<li>64564647@qq.com</li>-->
          <li><input type="text" ref="contactsEmail" placeholder="请输入你的邮箱" style="border: 1px solid #ccc; height: 30px; width: 310px; "></li>
          <li><input type="text" ref="contactsQQ" placeholder="请输入你的QQ号" style="border: 1px solid #ccc; height: 30px; width: 310px; "></li>
          

        </ul>
      </div>
      <p class="prise_title">
        <span>营业执照</span>
      </p>
      <div class="prise_pic">
        <div class="prise_upload">
          <span style="color:#ccc;">去选中你的营业执照吧</span>

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
          <!--<li>****科技有限公司</li>-->
          <!--<li>中国建设银行**分行</li>-->
          <!--<li>6217000783248325845</li>-->
          <li><input type="text" ref="bankAccountName" placeholder="请输入你的账户名称" style="border: 1px solid #ccc; height: 30px; width: 310px; "></li>
          <li><input type="text" ref="bankName" placeholder="请输入你的开户行" style="border: 1px solid #ccc; height: 30px; width: 310px; "></li>
          <li><input type="text" ref="bankAccount" placeholder="请输入你的账号（卡号）" style="border: 1px solid #ccc; height: 30px; width: 310px; "></li>

        </ul>
      </div>

      <button @click="submitInfo()"  style="width: 200px;height: 30px; background: #F15749; color: #fff; margin-top: 20px;">提交验证</button>
    </div>
  </div>
</template>
<script>
import {getCookie} from '@/assets/util'
export default {

    methods:{
      submitInfo(){
        let contactsId = getCookie("Iud");
        console.log(contactsId)
        this.axios.post(this.oUrl+'/addCompany',{
        "companyInfo":{
              "companyName":this.$refs.companyName.value,
              "contactsId":contactsId,
              "contactsPhone":this.$refs.contactsPhone.value,
              "contactsEmail":this.$refs.contactsEmail.value,
              "contactsQQ":this.$refs.contactsQQ.value,
              "bankAccountName":this.$refs.bankAccountName.value,
              "bankAccount":this.$refs.bankAccount.value,
              "bankName":this.$refs.bankName.value,
              "picId":4342424,
              "signUpAddr":"双井支行",
              "updateDate":"2018-07-29"
        },
        "companyPics":{
          
          "picContent":"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
          "updateDate":"2018-08-02",
          "contactsId":contactsId
        }
      },
      {headers:{
        'Content-Type':'application/json'
      }}
      ).then((res)=>{
        this.noteListLed=res.data;
        console.log("add company info ......")
        console.log(this.noteListLed)
      })
      }
    }
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
      width: 100%;
      height: 100%;
      margin-left: 10px;
      margin-top: 10px;
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
          padding-left: 70%;
          margin-bottom: 4%;
          font-size: 14px;
          line-height: 36px;
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
          margin-bottom: 4%;line-height: 35px;
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
