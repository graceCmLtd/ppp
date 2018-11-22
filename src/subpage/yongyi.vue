<template lang="html">
  <div class="yongyi_cn">
    <div class="yongyi_cn1">
     <p class="release_paper_title"><span>三方备付</span></p>
      <div class="content_1">
        <p style="text-align:left"><span style="font-weight:bold;">订单编号:&nbsp;&nbsp;</span>596859613456950695</p>
        <div style="height:311px;">
        <div class="yongyi_left">
          <p style="margin-left:36px;"><img src="../../static/img/yongyi.png"></p>
          <p><span>付款金额:&nbsp;&nbsp;</span>97,000,00<i style="color:#F15749;font-style:normal;">（含手续费）</i></p>
          <p><span>账户:&nbsp;&nbsp;</span>62394893*********049</p>
          <p><span>开户行:&nbsp;&nbsp;</span>甬易支付有限公司客户备付金账户</p>
          <p><span>户名:&nbsp;&nbsp;</span>中国光大银行*****支行</p>
          <p><i style="color:#F15749;font-style:normal;">（请仔细核对信息）</i></p>
        </div>
        <div class="yongyi_right">
          <div class="yongyi_cont">
            <h4 class="yongyi_cont_title">账户使用说明</h4>
            <p>该账户系**支付公司客户备付金账户**支付公司成立于****，具备国家颁布的三方支付牌照。买方资金由**支付进行担保支付，在您签收票据后资金将划付给票据卖家，如交易取消资金将原路退回。（<i style="color:#F15749;font-style:normal;">注意：如若是因为票据存在回头，瑕疵等问题不做为退款理由！</i>）需提前确认票据情况，请知悉。</p>
          </div>
        </div>
       </div>
      </div>
      <!-- 背书凭证 -->
       <div class="recite_box">
          <img  v-bind:src="pic" alt=""  class="showPic"  ref="Business" :class="{'active':isChoose}" src="../../static/img/icon.png" @click="imgScc">
          <p class="upload">上传打款凭证</p>
          <input type="file" name="" accept="image/jpg" value="" @change="upLoadBusiness">
          <span class="btn"><a href="">我已打款</a><a href="" style="background:#CCCCCC;">取消</a></span>
        </div>
    </div>
  </div>

</template>

<script>

 export default {
    data(){
      return{
       pic : '',
       isChoose:false,
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
      imgScc:function () {                     
        this.isChoose = !this.isChoose     
     },
   }

 }
</script>

<style lang="scss" scoped>
  .yongyi_cn{
    width: 100%;
    height:100%;
    margin:0 auto;
    .yongyi_cn1{
     width: 1000px;
     height:800px;
     background:#fff;
     box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
     margin:46px auto;
    .release_paper_title{
        width: 100%;
        border-bottom: 2px solid #F15749;
        text-align: left;
        span{
          font-size: 16px;
          padding-bottom: .5%;
          font-weight: bold;
          background: #F15749;
          letter-spacing: 2px;
          color: #fff;
          font-weight: bold;
          width: 110px;
          height: 37px;
          text-align: center;
          line-height: 37px;

        }
      }
     .content_1{
       width:800px;
       padding-top:20px;
       margin:0 auto;
       .yongyi_left{
        float:left;
        text-align:left;
        margin-left:12%;
        line-height: 33px;
        margin-top: 15px;
         span{
          font-weight:bold;
         }
       }
       .yongyi_right{
          float:right;
          width:350px;
          height:280px;
          background:linear-gradient(180deg,rgba(255,125,85,1) 0%,rgba(255,111,77,1) 100%);
          box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
          border-radius:4px;
          .yongyi_cont{
            width:300px;
            height:240px;
            background:rgba(255,255,255,1);
            border-radius:4px;
            margin:20px auto;
            .yongyi_cont_title{
              line-height:40px;
              border-bottom:1px solid #F15749;
              margin: 2px;
            }
            p{
              text-align:left;
              padding:15px;
              color:#666666;
              font-family:MicrosoftYaHei;
            }
          }
       }

     }

   .recite_box{
      width:350px;
      height:230px;
      margin:0 auto;
      cursor: pointer;
      position: relative;
      .upload{
        width: 272px;
        height: 37px;
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 37px;
        background: #F15749;
        border-radius: 5px;
        margin: 8px auto;
        cursor: pointer;
      }

      img{
        width:300px;
        height:250px;
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
        position: absolute;
        bottom: -28%;
        left: 51px;
        background: red;
        cursor:pointer;
        border:1px solid black;
        z-index:1;
        opacity: 0;  
      }
      .btn a{
        display: inline-block;
        width: 124px;
        height: 34px;
        line-height: 34px;
        background: #f15749;
        border-radius: 2px;
        margin: 13px 22px;
        font-weight:bold;
      }
   }



    }
  }
</style>
