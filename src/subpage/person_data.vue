<template lang="html">
  <div class="person_data">
    <div class="person_data_process">
      <img src="../../static/img/qiye.png" alt="">
    </div>
    <div style="background:#fff; width:80%;margin:0 auto;box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);">
        <p style="color:#FF0000;font-size:24px;font-weight:400;">企业信息认证中心</p>
        <p class="person_data_company">
          <span>企业信息</span>
        </p>
        <div class="company_mes">
          <p style="">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;公司名称&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model:value="companyName" ref="companyName"/></span>
          </p>
          <p class="">
            <span>联系人姓名&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model:value="contactsName" ref="contactName"/></span>
          </p>
          <p class="">
            <span>联系人电话&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model:value="contactsPhone" ref="contactPhone"/></span>
          </p>
          <p class="">
            <span>联系人邮箱&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model:value="contactsEmail" ref="contactEmail"/></span>
          </p>
        </div>
        <p class="person_data_company">
          <span>上传营业执照</span>
        </p>
        <div class="company_license">
          <div class="reprod">
            <img src="../../static/img/pic_icon.png" alt="">
            <p>点击上传营业执照</p>
            <input type="file" name="" accept="image/jpg" value="" @change="upLoadBusiness">
            <img v-bind:src="pic" alt=""  class="showPic"  ref="Business">
          </div>
        </div>
        <p class="person_data_company">
          <span>对公银行账户</span>
          </p>
        <div class="company_mes">
          <p>
            <span>账户名称&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model:value="bankAccountName" ref="bankId"></span>
            </p>
          <p class="">
            <span>开户银行&nbsp;&nbsp;&nbsp;
              <!-- <el-cascader
                :options="options"
                :value="valueCom"
                separator="/"
                change-on-select
              ></el-cascader> -->
              <input type="text" name="" v-model:value="banksName" ref="bankName" />
            </span>
          </p>
          <p class="">
            <span>开户地址&nbsp;&nbsp;&nbsp;
              <!-- <el-cascader
                :options="options"
                :value="valueCom"
                separator="/"
                change-on-select
              ></el-cascader> -->
              <input type="text" name="" v-model:value="bankAddr" ref="bankAddress" />
            </span>
          </p>
          <p class="">
            <span>银行账号&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model:value="bankAccount" ref="bankNumber"/></span>
          </p>
        </div>
        <p class="person_data_company">
          <span>设置联系QQ</span>
          </p>
        <div class="company_mes">
          <p>
            <span>请输入QQ号码&nbsp;&nbsp;<input type="text" v-model:value="contactsQQ" ref="QQ"/></span>
          </p>
        </div>
        <p class="saveMes">
          <button type="button" name="button" @click="submitCom()">确认</button>
          <button @click="cancel()">取消</button>
          </p>
      </div>
  </div>
</template>

<script>
import {getCookie} from '@/assets/util'
export default {
  data(){
    return{
      pic : '',
      companyName:'',
      contactsName:'',
      contactsPhone:'',
      contactsEmail:'',
      contactsQQ:'',
      bankAccountName:'',
      banksName:'',
      bankAccount:'',
      bankAddr:''
    }
  },
  methods:{
    upLoadBusiness(e){
      let _this=this;
      if (e.target.files[0]) {
      let file = e.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function() {
        img.src = this.result
      }
      let img = new Image,
        width = 1024, //image resize   压缩后的宽
        quality = 0.8, //image quality  压缩质量
        canvas = document.createElement("canvas"),
        drawer = canvas.getContext("2d");
        img.onload = function() {
          canvas.width = width;
          canvas.height = width * (img.height / img.width);
          drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
          let base64 = canvas.toDataURL("image/jpeg", quality); //压缩后的base64图片
          _this.$refs.Business.src=base64;
          window.localStorage.setItem('Business',base64);
        }
      }
    },
    submitCom(){
      let id=getCookie('Iud');
      if(this.pic==''){
        let _this=this;
        let comName=_this.$refs.companyName.value;//公司名称
        let contactName=_this.$refs.contactName.value;//联系人姓名
        let contactPhone=_this.$refs.contactPhone.value;//联系人电话
        let contactEmail=_this.$refs.contactEmail.value;//联系人邮箱
        let bankId=_this.$refs.bankId.value;//银行账户名称
        let banNumber=_this.$refs.bankNumber.value;//银行账号
        let bankName=_this.$refs.bankName.value;//银行名称
        let bankRess=_this.$refs.bankAddress.value;//开户地址
        let qq=_this.$refs.QQ.value;//联系人QQ
        let busPic=window.localStorage.getItem('Business');//营业执照
        if(comName==''||contactName==''||contactPhone==''||contactEmail==''||bankId==''||banNumber==''||qq==''){
          alert('请先完善公司信息! ')
        }else if(busPic==''){
          alert('请先上传营业执照！')
        }else{
          _this.fetch.myPost('/addCompany',{
            "companyInfo":{
              "companyName":comName,
              "contactsId":id,
              "contactsName":contactName,
              "contactsPhone":contactPhone,
              "contactsEmail":contactEmail,
              "contactsQQ":qq,
              "bankAccountName":bankId,
              "bankAccount":banNumber,
              'bankName':bankName,
              "signUpAddr":bankRess,
              'picId':123
            },
            "companyPics":{
              "picContent":busPic,
              "contactsId":id
              }
          },{
            headers:{
              'Content-Type':'application/json',
          'Authorization':getCookie('Too')
            }
          }
        ).then((res)=>{
          console.log(res);
          window.localStorage.clear();
          alert("认证信息提交成功,待审核...... ");
          _this.$router.push('/release/data'); 
        })
        }
      }else{
        console.log("---123");
        let busPic=window.localStorage.getItem('Business');
        this.fetch.myPost('/updateCompany',{
            "companyInfo":{
              "companyName":this.companyName,
              "contactsId":id,
              "contactsName":this.contactsName,
              "contactsPhone":this.contactsPhone,
              "contactsEmail":this.contactsEmail,
              "contactsQQ":this.contactsQQ,
              "bankAccountName":this.bankAccountName,
              "bankAccount":this.bankAccount,
              'bankName':this.banksName,
              "signUpAddr":this.bankAddr,
            },
            "companyPics":{
              "picContent":busPic,
              "contactsId":id
              }
          },{
            headers:{
              'Content-Type':'application/json',
          'Authorization':getCookie('Too')
            }
          }
        ).then((res)=>{
          console.log(res)
          window.localStorage.clear()
          alert("认证信息提交成功,待审核......");
          this.$router.push('/release/data'); 
        });
      }
    },
    cancel(){
      this.$router.push('/release/data');
    },
    loadInfo(){
        /*this.pic = this.$route.query.data.pic;
        this.companyName = this.$route.query.data.companyName;
        this.contactsName = this.$route.query.data.contactsName;
        this.contactsPhone = this.$route.query.data.contactsPhone;
        this.contactsEmail = this.$route.query.data.contactsEmail;
        this.contactsQQ = this.$route.query.data.contactsQQ;
        this.bankAccountName = this.$route.query.data.bankAccountName;
        this.banksName = this.$route.query.data.bankName;
        this.bankAccount = this.$route.query.data.bankAccount;
        this.bankAddr = this.$route.query.data.bankAddr;*/
        let contactsId = getCookie("Iud");
        this.fetch.httpGet({
          url:'/getCompany',
          params:{
            contactsId:contactsId
          }
        }).then((res)=>{
            console.log(res.data);
            if(res.data != ''){
              this.companyName=res.data[0].companyName;
              this.contactsName=res.data[0].contactsName;
              this.contactsPhone=res.data[0].contactsPhone;
              this.contactsEmail=res.data[0].contactsEmail;
              this.contactsQQ=res.data[0].contactsQQ;
              this.bankAccountName=res.data[0].bankAccountName;
              this.banksName=res.data[0].bankName;
              this.bankAccount=res.data[0].bankAccount;
              this.bankAddr = res.data[0].signUpAddr;
              this.role=res.data[0].role;
            }
        });
        this.fetch.httpGet({
          url:'/getPicsOfCom',
          params:{
            contactsId:contactsId
          }
        }).then((res)=>{
            console.log(res.data);
            if(res.data != ''){
              this.pic = res.data[0].picContent;
            }
        });
    }
  },
  created(){
      this.loadInfo();
  }
}
</script>

<style lang="scss">
.person_data{
  width: 100%;
  height:100%;
  .person_data_process{
    width: 100%;
    height:25%;
    img{
      width: 100%;
      height:100%;
    }
  }
  .person_data_company{
    width: 82%;
    border-bottom:1px solid #999;
    margin-left: 18%;
    text-align: left;
    span{
      padding-bottom:1%;
      border-bottom: 4px solid #FF452C;
      font-weight: bold;
      font-size: 16px;
      color:#FF452C;
      letter-spacing:2px;
    }
  }
  .company_mes{
    width: 82%;
    height:auto;
    padding-top:7%;
    padding-bottom:7%;
    margin-left: 18%;
    text-align: center;
    .el-input--suffix{
      width: 262px!important;
      margin-right: 5px;
    }
    .el-input__inner{
      height:30px;
      border-radius: 0;
      width: 261px;
    }
    p{
      width: 100%;
      text-align: center;
      color:#333333;
      margin-bottom: 2%;
      input{
        border:1px solid #979797;
        height:24px;
        width: 260px;
      }
      select{
        border:1px solid #979797;
        height:30px;
        width: 260px;
        margin-left:-2%;
      }
    }
  }
  .company_license{
    width: 82%;
    margin-left: 18%;
    height:378px;
    text-align: center;
    position: relative;
    .reprod{
      width: 60%;
      height:75%;
      min-width: 390px;
      position: absolute;
      left:50%;
      margin-left: -30%;
      top:55%;
      margin-top:-18%;
      border:1px solid #ccc;
      line-height: 210px;
      .showPic{
        width: 100%;
        height:100%;
        position: absolute;
        top:0;
        left:0;
      }
      img{
        width: 20%;
        height:25%;
        position: absolute;
        top:25%;
        left:40%;
      }
      p{
        position: absolute;
        top:30%;
        left:36%;
        color:#999;
      }
      input{
        width: 100%;
        height:100%;
        position: absolute;
        left:0;
        top:0;
        background: red;
        cursor:pointer;
        opacity: 0;
        z-index: 1;
      }
    }
  }
  .saveMes{
    height:28px;
    margin: 0 auto;
    text-align: center;
    margin-bottom:5%;;
    button{
      width: 10%;
      height:100%;
      background: rgb(241, 87, 73);
      font-size: 14px;
      color:white;
      border-radius: 5px;
    }
  }
}
</style>
