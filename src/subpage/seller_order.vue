<!-- 基本信息 -->
<template lang="html">
  <div class="person_prise">
    <div class="person_prise_pic">
      <img src="../../static/img/qiye.png" alt="">
    </div>
    <div class="person_prise_con">
      <p style="color:#FF0000;font-size:24px;font-weight:400;">我的企业信息</p>
      <p class="prise_title">
        <span>企业信息</span>
      </p>
      <div class="prise_mes">
        <ul class="left">
          <li style="font-weight:bold;">企业名称</li>
          <li style="font-weight:bold;">审核状态</li>
        </ul>
        <ul class="right">
          <li><input type="text" v-model:value="companyName" placeholder="" disabled style="background:#fff; height: 30px; width: 310px;"></li>
          <li><input type="text" v-model:value="role" placeholder="" disabled style="background:#fff; height: 30px; width: 310px;"></li>

        </ul>
      </div>
      <p>上传多证合一营业执照或普通营业执照</p>
      <div class="prise_pic">
        <div class="prise_upload">
          <img v-bind:src="pic1" style="width:360px;height:240px;">
        </div>
      </div>

      <p style="padding-top: 25px;"><i style="font-style:normal;color:#FF4119;">选填-</i>组织机构代码证<i style="font-style:normal;color:#FF4119;">（普通营业执照必填）</i></p>
      <div class="prise_pic">
        <div class="prise_upload">
          <img v-bind:src="pic2" style="width:360px;height:240px;">
        </div>
      </div>
   <div style="margin-top:20px;">
      <p style="padding-top: 25px;"> 上传法人身份证</p>
    
        <div class="prise_pic_a">
          <span class="prise_upload">
            <img v-bind:src="IDCardPic1" style="width:300px;height:240px;">
          </span>
          <span class="prise_upload">
            <img v-bind:src="IDCardPic2" style="width:300px;height:240px;">
          </span>
        </div>

  </div>
<!-- 业务授权 -->
      <p class="prise_title">
        <span>业务授权</span>
      </p>
      <div class="bank_mes">
        <ul class="bank_left">
          <li style="font-weight:bold;">联系人姓名</li>
          <li style="font-weight:bold;">联系人身份证证件号</li>
          <li style="font-weight:bold;">联系人QQ号码</li>
        </ul>
        <ul class="bank_right">
          <li><input type="text" v-model:value="contactsName" placeholder="" disabled style="background:#fff; height: 30px; width: 310px;"></li>
          <li><input type="text" placeholder="" v-model:value="idCardNum" disabled style="background:#fff; height: 30px; width: 310px;"></li>
          <li><input type="text" v-model:value="contactsQQ" placeholder="" disabled style="background:#fff; height: 30px; width: 310px;"></li>
          <div style="opacity: 0; height:20px;">  </div>
        </ul>

      </div>

      <p class="prise_title" style="margin-top:-2%;">
        <span>绑定账户</span><i style="font-size:12px;font-style:normal;color:#FF4119;">（电票所在银行账户与电票背书账户）</i>
      </p>
      <div class="bank_mes">
        <ul class="bank_left">
          <li style="font-weight:bold;">开户银行</li>
          <li style="font-weight:bold;">开户行行号</li>
          <li style="font-weight:bold;">银行账号</li>
        </ul>
        <ul class="bank_right">
          <li><input type="text" v-model:value="banksName" placeholder="" disabled style="background:#fff; height: 30px; width: 310px;"></li>
          <li><input type="text" v-model:value="bankCode" placeholder="" disabled style="background:#fff; height: 30px; width: 310px;"></li>
          <li><input type="text" v-model:value="bankAccount" placeholder="" disabled style="background:#fff; height: 30px; width: 310px;"></li>
         <div style="opacity: 0; height:120px;">  </div>
        </ul>

      </div>
     <!-- 
      <button @click="updateInfo()"  style="width:420px;height:45px;background:#F15749;box-shadow:0px 2px 4px 0px rgba(241,87,73,0.5);border-radius:8px; color:#fff;">认证/修改</button> -->
    </div>
  </div>
</template>
<script>
import {getCookie} from '@/assets/util'
export default {

    data(){
    return{
      pic1 : '',
      pic2 : '',
      IDCardPic1 : '',
      IDCardPic2 : '',
      companyName : '',
      contactsName : '',
      contactsPhone : '',
      contactsEmail : '',
      contactsQQ : '',
      idCardNum:'',
      bankCode:'',
      bankAccountName : '',
      banksName : '',
      bankAccount : '',
      bankAddr : '',
      role : '',
      isChoose:false,
    }
  },

    methods:{
      getCompany(){
        let contactsId = getCookie("Iud");
        this.fetch.httpGet({
          url:'/getCompany',
          params:{
            contactsId:contactsId
          }
        }).then((res)=>{
            //console.log(res.data);
            if(res.data != ''){
              this.companyName=res.data[0].companyName;
              this.contactsName=res.data[0].contactsName;
              this.idCardNum=res.data[0].contactIDCardNo;
              this.contactsQQ=res.data[0].contactsQQ;
              this.banksName=res.data[0].bankName;
              this.bankCode=res.data[0].bankCode;
              this.bankAccount=res.data[0].bankAccount;
              this.role = res.data[0].role;
            }
        });
        this.fetch.httpGet({
          url:'/getPicsOfCom',
          params:{
            contactsId:contactsId
          }
        }).then((res)=>{
            //console.log(res.data);
            if(res.data != ''){
              this.pic1 = res.data[0].pic1Content;
              this.pic2 = res.data[0].pic2Content;
              this.IDCardPic1 = res.data[0].pic1IDCard;
              this.IDCardPic2 = res.data[0].pic2IDCard;
            }
        });
      }
      
    },
    created(){
      this.getCompany()
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
     width: 99%;
     height: 80px;
    }
  }
  .person_prise_con{
    width: 80%;
    height:100%;
    margin: 0 auto;
    background: rgba(255,255,255,1);
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
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
      margin-left: 1%;
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
        width: 360px;
        height: 240px;
        margin: 0 auto;
        position: relative; 
        text-align: center;
        cursor: pointer;
        img{
        width: 100%;
        height:100%;
        transform: scale(1);          
        transition: all ease 0.5s; 
        }
        img.active {     
         transform: scale(1.5);    
         position: absolute;          
         z-index: 100;
         left:-3%;
        }  
        input{
          width: 100%;
          height:100%;
          opacity: 0;
          cursor:pointer;
        }
      }
    }
    .prise_pic_a{
      width:80%;  
      margin:0 auto;
      .prise_upload{
        width: 300px;
        height: 200px;
        margin: 28px 37px;

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
