<!-- 急速发票 -->
<template lang="html">
  <div class="rapidly_w">
    <div class="rapidly_w_1">
      <div class="rapidly_on">
          <p style="position: relative;"><i>票据类型</i>&nbsp;&nbsp;<select  ref="typeSelect" class="select_w" style=" border: 1px solid #979797; outline: none;width: 281px;height:30px;">
            <option value ="电银">电银</option>
            <option value ="纸银">纸银</option>
            <option value="电商">电商</option>
            <option value="纸商">纸商</option>
          </select>
          </p>
            <div class="big_w" v-if="bigImg" style="position:absolute; left:-29%;"  @click="imgScc"><img src="../../static/img/toggle.png"></div> 
            <p style="text-align:left; margin-left:67px;"><i>票据正面</i></p>
         
            <img :class="{'active':isChoose}" src="../../static/img/pic_icon.png" alt="" title="请选择图片" ref="Is"  style="width:300px; height:200px;" />
            <span style="text-align:center; position:relative; left: -180px;">票据正面</span>
            <input type="file" accept="image/jpeg" name="" value="" @change="upLoadIs"  style="position:relative;left:20px;top:-111px;opacity: 0; cursor:pointer;">

          <div class="big_w" v-if="bigImgs" style="position:absolute; left:-29%;"  @click="imgSccs"><img src="../../static/img/toggle.png"></div> 
          <p style="text-align:left; margin-left:67px;"><i>票据反面</i></p>        
            <img :class="{'active':isChooses}" src="../../static/img/pic_icon_in.png" alt="" title="请选择图片" ref="The"  style="width:300px; height:200px;" />
            <span style="text-align:center; position:relative;  left: -180px;">票据反面</span>
            <input type="file" accept="image/jpeg" name="" value="" @change="upLoadThe" style="position:relative;left:20px;top:-111px;opacity: 0; cursor:pointer;">


          <p>
            <i>手机号</i> <input type="text" value="" maxlength="11"  ref="PhoneCode" v-model="Phone"></p>
           <p>
            <i>短信验证码</i> <input type="text" value="" style="width:180px;">
            <span v-show="show" @click="getCode()" class="get_w" >获取验证码</span>
            <span v-show="!show" class="count"  style="">{{count}} s</span>
          </p>
          <p class="fabu_w_1" style="color:#fff;">发布</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCookie} from '@/assets/util'
  export default {
      data(){
        return {
          Phone:null,
          count: '',
          time:null,
          show: true,
          releText:'发布',
          isChoose:false,
          isChooses:false,
          bigImg:false,
          bigImgs:false,

        }  
      },
      components:{

      },
      methods:{
        choseDate(){
          let phone=_this.Phone;
          let phoneCode=_this.$refs.PhoneCode.value;//手机验证码

        },
        upLoadIs(e){
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
            _this.$refs.Is.src=base64;
            window.localStorage.setItem('Is',base64),
            _this.bigImg=true;
            _this.$refs.big_w="block";
          }
        }
      },
      upLoadThe(e){
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
            _this.$refs.The.src=base64;
            window.localStorage.setItem('The',base64),
            _this.bigImgs=true;
            _this.$refs.big_w="block";
          }
        }
      },
        // 获取验证码
        getPhoneSms(){
        //let Phone = this.phone
        /*let _this = this
        let Phone=_this.Phone;*/
        //console.log("the phone number is ")
        //console.log(this.Phone)
        this.fetch.myPost('/getPhoneSms',{
            "phone":this.Phone
          },
          {headers:{
              'Content-Type':'application/json',
          'Authorization':getCookie('Too')
            }}
        ).then((res)=>{
          //console.log(res)
          //this.noteList=res.data;
        })
      },
       getCode(){
        //console.log("get code xxxxxxxxxxxxxx")
        this.getPhoneSms();
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
     imgScc:function () {                     
          this.isChoose = !this.isChoose  
       },
      imgSccs:function () {                     
          this.isChooses = !this.isChooses  
      }
    }
  }
</script>

<style lang="scss">
 .big_w{
    width:20px;
    height:20px;
    cursor:pointer;
  }
  .rapidly_w{
    width: 100%;
    height:100%;
    margin:0 auto;
    .rapidly_w_1{
      width:999px;
      height:819px;
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
      margin:10px auto;
      .rapidly_on{
        width:500px;
        height:800px;
        margin:0 auto;
        margin-top: 30px;
        padding-top: 30px;
        position:relative;
        p{
          font-size:18px;
          font-weight:bold;
          color:rgba(51,51,51,1);
          line-height:44px;
          i{
           font-style: normal;
           text-align:left;
           margin-left:1px;
          }
          input{
          width:281px;
          height:28px;
          border:1px solid #979797;
          }

        }

          img {    
           transform: scale(1);         
           transition: all ease 0.5s; 
         } 
           img.active {     
           transform: scale(1.5);         
           position: absolute;         
           z-index: 100;
           
        }   

      }
    }
  }
  .get_w{
     width:88px;
     height:30px;
     border-radius:3px;
     font-style: normal;
     background:#F15749;
     color:#fff;
     display:inline-block; 
     line-height:30px;
     font-weight:normal;
     margin-left:2px;
     font-size:12px;
     text-align:center;
     cursor:pointer;
    }
  .count{
      width: 88px;
      height: 30px; 
      display: inline-block; 
      text-align: center;
      line-height: 30px; 
      background: #ccc; 
      color: #fff; 
      margin-left: 20px;
      border-radius: 5px; 
      cursor: pointer;
    }
    .fabu_w_1{
      width:350px;
      height:45px;
      background:rgba(241,87,73,1);
      box-shadow:0px 2px 4px 0px rgba(241,87,73,0.5);
      border-radius:7px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:28px;
      font-size:20px;
      margin:30px auto;
      cursor:pointer;

    }
</style>
