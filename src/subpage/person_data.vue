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
            <span>&nbsp;&nbsp;&nbsp;&nbsp;企业名称&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model:value="companyName" ref="companyName"/></span>
          </p>
          <p>上传多证合一营业执照或普通营业执照</p>
          <div class="company_license">
            <div class="reprod">
              <img src="../../static/img/pic_yingye.png" alt="">
              <!-- <p>点击上传营业执照</p> -->
              <input type="file" name="" accept="image/jpg" value="" @change="upLoadBusiness">
              <img v-bind:src="pic1" alt=""  class="showPic"  ref="Business">
            </div>
          </div>
          <div class="margin-top:20px;">
         <p><i style="font-style:normal;color:#FF4119;">选填-</i>组织机构代码证<i style="font-style:normal;color:#FF4119;">（普通营业执照必填）</i></p>
          <div class="company_license">
            <div class="reprod">
              <img src="../../static/img/pic-certificates.png" alt="">
              <!-- <p>点击上传营业执照</p> -->
              <input type="file" name="" accept="image/jpg" value="" @change="upLoadBusinessB">
              <img v-bind:src="pic2" alt=""  class="showPic"  ref="BusinessB">
            </div>
           </div>
         </div>

        <p>上传法人身份证</p>
        <div class="id_box">
           <div class="company_id" style="">
                  <div class="reprod_id" >
                    <img src="../../static/img/ida.png" alt="" >
                    <!-- <p>点击上传正面</p> -->
                    <input type="file" name="" accept="image/jpg" value="" @change="upLoadIdA">
                    <img v-bind:src="IDCardPic1" alt=""  class="showPic"  ref="IdA">
                  </div>
              </div>

           <div class="company_id">
              <div class="reprod_id" style="position:absolute;top:-100%;right:-3px;">   
                <img src="../../static/img/idb.png" alt="" >
                <!-- <p>点击上传反面</p> -->
                <input type="file" name="" accept="image/jpg" value="" @change="upLoadIdB">
                <img v-bind:src="IDCardPic2" alt=""  class="showPic"  ref="IdB">
              </div>
          </div>
      </div>


        </div>
       
        <p class="person_data_company">
          <span>业务授权</span>
        </p>
        <div class="company_mes" style="    position: relative;">
          <p>
           <span>联系人姓名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model:value="contactsName" ref="contactName"/></span>
          </p>
          <p class="">
            <span>联系人身份证证件号&nbsp;<input type="" name="" v-model:value="idCardNum" maxlength="18" ref="idCardNo"></span>
          </p>
          <p>
            <span>联系人QQ号码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model:value="contactsQQ" ref="QQ"/></span>

            </span>
          </p>
        </div>



        <p class="person_data_company">
          <span>绑定账户</span><i style="font-style:normal;color:#FF4329">（电票所在银行账户与电票背书账户）</i>
          </p>
        <div class="company_mes">
          <p>
            <span>开户银行&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="" v-model:value="banksName" ref="bankName" placeholder="请输入开户银行全称（具体到支行）" />
            </span>
          </p>
            <p>
            <span>开户行行号&nbsp;&nbsp;<input type="text" name=""  v-model:value="bankCode" ref="bankId" placeholder="请输入开户行行号" />
            </span>
          </p>
          <p>
            <span>开户行地址&nbsp;&nbsp;
              <select v-on:change="indexSelect01" v-model="province">
              <option value="" disabled selected>请选择省份</option>
              <option v-for="province in provinces" :value="province.name">{{province.name}}</option>
            </select>
            <select v-model="city">
              <option value="" disabled selected>城市或区县</option>
              <option v-for="city in citys" :value="city.name">{{city.name}}</option>
            </select>
            </span>
          </p>
          <p class="">
          <span>银行账号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text"  name="" v-model:value="bankAccount" ref="banksAccount" placeholder="请输入企业账号" /></span>
          </p>
        </div>     
        <p style="font-size:13px;">
          <input type="radio" name="" value="" checked="checked" @click="radioA()" v-show="TypeAgShowT">
          <input type="radio" name="" value="" :checked="checkedB" @click="radioB()" v-show="TypeAgShowB">
        我已阅读并同意<i style="font-style:normal; color:#FF4329;cursor: pointer;"   v-on:click="toggle()">《企业授权委托书》</i>授权经办人代表企业进行平台相关操作。
    </p>
    <p class="btn_w"  @click="submitCom()">完成授权并提交审核</p>
    <p class="tishi">
      <span style="font-weight:bold;">温馨提示:</span><br>
      卖方绑定的的电票所在银行账户即交易完成后的收款账户 买方绑定的电票背书账户即交易打款账户
      <div style="opacity: 0; height:120px;">  </div>
    </p>
    

      <div class="show_w" v-show="isShow">
        <p>
          <h2 style="text-align:center;">企业授权委托书</h2><br>致：    天津融宝支付网络有限公司（以下简称“融宝支付”）；<br>及格熙（海南）区块链科技有限公司（碰碰票运营方，以下简称“碰碰票”）<br> 兹授权我公司员工 先生/小姐 ，身份证号，手机号码  {{contactsPhone}} ，为平台交易员，代表我公司在碰碰票票据平台负责注册所需账户及提供 我公司多个账户、发布交易需求、电子合同签署等业务指令操作； <br><br>同时授权我公司员工先生/小姐，身份证号，手机号码  {{contactsPhone}} ，为资金经办人，代表我公司使用融宝支付负责办理我公司提供多个账户的资金查询、划转、账户提款等资金和财务指令操作。 <br><br><strong>我单位接受碰碰票、融宝支付及任何相关方为我单位联合 提供的票据见证、资金代管、资金汇划、电子合同签署及存证、数字签名等服务， 我单位无条件不可撤销地委托并授权碰碰票、融宝支付做票据业务项下流转资金的代管、划转等事项； 我单位无条件不可撤销地同意并接受碰碰票、融宝支付及相关方为我单位提供的数字证书发放、 电子合同在线签署及存证等综合服务。</strong> 我公司同意并授权融宝支付与碰碰票协助办理相关手续，授权有效期与我公司在碰碰票注册的账户之有效期限相同或以另行书面变更授权为准。上述员工在碰碰票和融宝支付以及电子合同签署等进行的所有操作行为均已经取得我公司书面授权，所有操作行为均视为我公司操作行为，由此产生的所有经济和法律风险均由我公司自行承担，与碰碰票、融宝支付及任何相关方无关。<br><br> 本授权书自我公司签章之日起生效，在碰碰票、融宝支付及兴业银行等未收妥我公 司变更被授权员工的书面授权书之前或我公司在 碰碰票注册的账户无效、被注销之前持续有效。<br><br> 我公司已经知悉并无条件、不可撤销地同意： <br><br>根据碰碰票公布已经我公司同意的业务操作流程规定，任一操作环节完成之时起须在20分钟内完成下一操作环节，若我公司超过 20 分钟未在碰碰票完成下一操作环节的，我公司充分授权同意并认可 碰碰票、融宝支付任一方或者多方基于票据状态与资金代管实际情况进行后续操作处理，直至交易结束。由此产生的全部经济和法律结果均由我公司全部承担，与进行后续操作的碰碰票、融宝支付及任何相关第三方无关。 <br><br><strong>特别声明：本授权书原件一份，融宝支付、碰碰票任一方持有的扫描件与原件均具有同等法律效力。</strong><br><br> 特此授权。<br>日期： {{new Date()|date}}
        </p>
        <span class="off" @click="hiddenShow()">X</span>
      </div>
  </div>
</div>

</template>

<script>
import {getCookie} from '@/assets/util'
export default {
  data(){
    return{
      TypeAgShowT:false,
      TypeAgShowB:true,
      checkedB:false,
      pic1 : '',
      pic2 : '',
      IDCardPic1 : '',
      IDCardPic2 : '',
      companyName:'',
      contactsName:'',
      contactsPhone:'',
      contactsEmail:'',
      contactsQQ:'',
      bankAccountName:'',
      banksName:'',
      bankAddr:'',
      idCardNum:'',
      bankAccountName:'',
      bankAccount:'',
      bankCode:'',
      isShow:false,
      provinces:[],
      citys:[],
      indexNum:0,
      province:"",
      city:""
    }
  },
  methods:{
     radioA(){
      this.TypeAgShowT=false;
      this.checkedB=false;
      this.TypeAgShowB=true;
    },
    radioB(){
      this.TypeAgShowT=true;
      this.checkedB=false;
      this.TypeAgShowB=false;
    },
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
    upLoadBusinessB(e){
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
          _this.$refs.BusinessB.src=base64;
          window.localStorage.setItem('BusinessB',base64);
        }
      }
    },

    upLoadIdA(e){
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
          _this.$refs.IdA.src=base64;
          window.localStorage.setItem('IdA',base64);
        }
      }
    },
     upLoadIdB(e){
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
          _this.$refs.IdB.src=base64;
          window.localStorage.setItem('IdB',base64);
        }
      }
    },
    submitCom(){
      let id=getCookie('Iud');
      if(this.pic==''){
        let _this=this;
        let comName=_this.$refs.companyName.value;//公司名称
        let busPic1=window.localStorage.getItem('Business');//多证合一营业执照
        let busPic2=window.localStorage.getItem('BusinessB');//组织机构代码证
        let IDPic1=window.localStorage.getItem('IdA');//法人身份证正面照
        let IDPic2=window.localStorage.getItem('IdB');//法人身份证反面照
        let contactName=_this.$refs.contactName.value;//联系人姓名
        let contactPhone=getCookie('Nick');//联系人电话
        let idCardNo=_this.$refs.idCardNo.value;//联系人身份证号码
        let qq=_this.$refs.QQ.value;//联系人qq
        let bankName=_this.$refs.bankName.value;//开户银行
        let bankId=_this.$refs.bankId.value;//开户行行号
        let bankRess=_this.province+'-'+_this.city;//开户地址
        let bankAccount=_this.$refs.banksAccount.value;//银行账号
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
              "contactsQQ":qq,
              "contactIDCardNo":idCardNo,
              "bankAccount":bankAccount,
              'bankName':bankName,
              "bankCode":bankId,
              "signUpAddr":bankRess,
              'picId':123
            },
            "companyPics":{
              "pic1Content":busPic1,
              "pic2Content":busPic2,
              "pic1IDCard":IDPic1,
              "pic2IDCard":IDPic2,
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
          _this.$router.push('/page'); 
        })
        }
      }else{
        console.log("---123");
        let busPic1=window.localStorage.getItem('Business');//多证合一营业执照
        let busPic2=window.localStorage.getItem('BusinessB');//组织机构代码证
        let IDPic1=window.localStorage.getItem('IdA');//法人身份证正面照
        let IDPic2=window.localStorage.getItem('IdB');//法人身份证反面照
        console.log(this.companyName+'-'+this.contactsPhone+'-'+this.bankCode)
        this.fetch.myPost('/updateCompany',{
            "companyInfo":{
              "companyName":this.companyName,
              "contactsId":id,
              "contactsName":this.contactsName,
              "contactsPhone":this.contactsPhone,
              "contactsQQ":this.contactsQQ,
              "contactIDCardNo":this.idCardNum,
              "bankAccount":this.bankAccount,
              'bankName':this.banksName,
              "bankCode":this.bankCode,
              "signUpAddr":this.province+'-'+this.city,
              'picId':123
            },
            "companyPics":{
              "pic1Content":this.pic1,
              "pic2Content":this.pic2,
              "pic1IDCard":this.IDCardPic1,
              "pic2IDCard":this.IDCardPic2,
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
          this.$router.push('/page'); 
        });
      }
    },
    cancel(){
      this.$router.push('/release/data');
    },
    loadInfo(){
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
              this.idCardNum=res.data[0].contactIDCardNo;
              this.contactsQQ=res.data[0].contactsQQ;
              this.banksName=res.data[0].bankName;
              this.bankCode=res.data[0].bankCode;
              this.bankAccount=res.data[0].bankAccount;
              this.province = res.data[0].signUpAddr.split("-")[0];
              this.city = res.data[0].signUpAddr.split("-")[1];
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
              this.pic1 = res.data[0].pic1Content;
              this.pic2 = res.data[0].pic2Content;
              this.IDCardPic1 = res.data[0].pic1IDCard;
              this.IDCardPic2 = res.data[0].pic2IDCard;
            }
        });
    },

    toggle:function(){
          this.isShow = !this.isShow;
        },
    hiddenShow:function () {
          var that = this;
              that.isShow = false;
       },
    getProvince(){
      this.fetch.httpGet({
        url:'/areas/getProvince'
      }).then(res => {
        console.log("获取到的省份")
        if(res.data.length > 0){
          res.data.splice(0,1);
          this.provinces = res.data;
          this.indexSelect01();
        }
        
      });
    },
    getCity(){
      this.fetch.myPost('/areas/getCityByPid',
        {
            "id":this.provinces[this.indexNum].id,
            "name":this.provinces[this.indexNum].name,
            "pid":this.provinces[this.indexNum].pid
        }
      ).then(res => {
          if(res.data.length > 0){
              this.citys = res.data
          }
      });
    },
    indexSelect01(){
        for (let i = 0;i<this.provinces.length;i++) {
          if (this.provinces[i].name == this.province){
            this.indexNum = i;
            break
          }
        }
        this.getCity(); 
    }  
  },
   filters:{
        date:function(data){
            return data.getFullYear()+'年'+(data.getMonth()+1)+'月'+data.getDate()+'日'
         }
      },
    created(){
        this.loadInfo();
        this.getProvince();
    }
}
</script>

<style lang="scss">
  .show_w{
    width:600px;
    height:400px;
    overflow-y:scroll;
    text-align:left;
    border:1px solid black;
    background:#fff;
    position:fixed;
    top:20px;
    left: 36%;
    font-style:"微软雅黑";
    .off{
     position:absolute;
     right: 8px;
     top: 9px;
     color:red;
     cursor:pointer;
     font-size:16px;
    }
  }
  .btn_w{
    width:350px;
    height:40px;
    background:rgba(241,87,73,1);
    box-shadow:0px 2px 4px 0px rgba(241,87,73,0.5);
    border-radius:8px;
    line-height:40px;
    color:#fff;
    margin:0 auto;
    margin-top:24px;
    cursor:pointer;
  }
  .tishi{
    width:300px;
    margin:0 auto;
    font-size:13px;
    text-align:left;
    margin-top:30px;
    color:red;
  }
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
      padding-top:3%;
      padding-bottom:7%;
      text-align: center;
      margin: 0 auto;
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
        font-weight:bold;
        input{
          border:1px solid #979797;
          height:24px;
          width: 260px;
        }
        select{
          border:1px solid #979797;
          height:30px;
          width:127px;
          margin-left:-2%;
          margin:0 2px;
          cursor:pointer;
        }
      }
    }
  .company_license{
    width: 82%;
    margin-left: 18%;
    height:300px;
    text-align: center;
    position: relative;
    .reprod{
      width: 50%;
      height: 75%;
      min-width: 390px;
      position: absolute;
      left: 16%;
      /* margin-left: -25%; */
      top: 46%;
      margin-top: -17%;

      .showPic{
        width: 100%;
        height:100%;
        position: absolute;
        top:0;
        left:0;
      }
      img{
        width: 390px;
        height: 225px;

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
  .id_box{
    width:78%;
    height:228px;
    margin: 0 auto;
   .company_id{
    width: 100%;
    height:300px;
    text-align: center;
    position: relative;
    .reprod_id{
      width: 45%;
      height: 75%;
      position:absolute;
      float:left;
      img{
        width:50%;
        height:75%;
      }

      .showPic{
        width: 100%;
        height:100%;
        position: absolute;
        top:0;
        left:0;
      }
      img{
        width: 298px;
        height: 223px;
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
