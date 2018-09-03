<template lang="html">
  <div class="release_paper">
    <!-- <Header/> -->
    <div class="release_paper_con">
      <p class="release_paper_title"><span>票据信息</span></p>
      <div class="release_paper_mes">
        <div class="mes_left">
          <p>票据号码<input type="text" vlaue="" placehoder="" ref="paperNumber"/></p>
          <p>票据金额<input type="text" vlaue="" placehoder="" ref="amount"/></p>
          <p class="release_paper_date">票据到期日
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <span class="time">剩余期限？天</span>
            </p>
          <p>承兑人全称<input type="text" vlaue="" placehoder="" ref="acceptor"/></p>
          <p>是否可签转<input type="text" vlaue="" placehoder=""/></p>
        </div>
        <div class="mes_right">
          <div class="paper_is">
            <span><img src="../../static/img/pic_icon.png" alt="" title="" /></span>
            <span>上传票据正面</span>
            <input type="file" accept="image/jpg" name="" value="">
          </div>
          <div class="paper_the">
            <span><img src="../../static/img/pic_icon.png" alt="" title="" /></span>
            <span>上传票据反面</span>
            <input type="file" accept="image/jpg" name="" value="">
          </div>
        </div>
      </div>
      <p class="release_paper_statement" style="color:#FF0000;">*平台担保手续费：担保费万分之5，比如每10万收费50元，每100万收费500元，5000元封顶</p>
      <p class="service">
        <input type="radio" style="width:20px;height:20px;" value="" :checked="checked" v-show="radioT" @click="radioTC($event)" ref="b"/>
        <input type="radio" style="width:20px;height:20px;"value="" checked="checked" v-show="radioB" @click="radioBC()" />
        同意平台担保交易协议</p>
        <p class="submit">
          <button type="button" name="button" @click="submitMes()">提交意向</button>
        </p>
    </div>
    <div class="release_paper_mask" v-show="PaperMaskShow" @click="closeMes()">

    </div>
    <div class="release_paper_prompt" ref="release_paper_prompt">
      <span class="logo">
        <img src="../../static/img/Logo.png" alt="">
      </span>
      <p class="release_paper_title">您的票据审核通过后会发送至买家请等待确认</p>
      <p class="release_paper_opera">
        <button type="button" name="button" @click="closeMes()">继续去资源市场</button>
        <button type="button" name="button">查看审核状态</button>
        <button type="button" name="button">查看意向</button>
      </p>
    </div>
    <Footer :height="minHeight"/>
  </div>
</template>

<script>
import {getCookie} from '@/assets/util'
export default {
  data(){
    return{
      minHeight:'20%',
      value1:null,
      radioT:true,
      radioB:false,
      checked:false,
      PaperMaskShow:false
    }
  },
  components:{
    Header:resolve=>{
      require(['@/components/header-all'],resolve)
    },
    Footer:resolve=>{
      require(['@/components/footer-all'],resolve)
    }
  },
  methods:{
    radioTC($event){
      this.radioT=false;
      this.radioB=true;
      $event.target.checked=false
    },
    radioBC(){
      this.radioT=true;
      this.radioB=false;
    },
    submitMes(){
      let _this=this;
      let paperNumber=_this.$refs.paperNumber.value;
      let amount=_this.$refs.amount.value;
      let acceptor=_this.$refs.acceptor.value;
      let Id=getCookie('Iud')
      if(paperNumber==''||amount==''||acceptor==''){
        alert('请先完善票面信息！')
      }else if(!this.radioB){
        alert('请选择同意担保交易协议！')
      }else{
        _this.axios.post(this.oUrl+'/bills/addbill',{
          "billInfo":{
        		"billNumber":paperNumber,
        		"billType":"国票",
        		"acceptor":acceptor,
        		"amount":amount,
        		"maturity":"2018-12-12",
        		"status":"审核中",
        		"releaseDate":"2018-08-08",
        		"releaserId":88888888,
        		"billPicsId":11111,
        		"transferable":true
      	 },
         "billPics":{
        		"billNumber":paperNumber,
        		"pic1":"dasdasdasdasd",
        		"pic2":"rthfghfghfg",
        		"updateDate":"2018-08-08"
        	},
          "userData":{
            "uuid":Id
          }
        },
        {headers:{
          'Content-Type':'application/json'
        }}
      ).then((res)=>{
        console.log(res)
        this.PaperMaskShow=true;
        this.$refs.release_paper_prompt.style.display="block";
        setTimeout(()=>{
          this.$refs.release_paper_prompt.style.top="30%";
          this.$refs.release_paper_prompt.style.opacity="1"
        },0)
        })
      }
    },
    closeMes(){
      this.$refs.release_paper_prompt.style.top="15%";
      this.$refs.release_paper_prompt.style.opacity="0";
      setTimeout(()=>{
        this.PaperMaskShow=false;
        this.$refs.release_paper_prompt.style.display="none";
      },200)
    }
  }
}
</script>

<style lang="scss">
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 205px;
}
.el-input__inner{
  width: 200px;
  height:28px!important;
  border-radius: 0;
}
.el-input__icon{
  line-height: 0;
}
.release_paper{
  width: 100%;
  height:100%;
  .release_paper_con{
    width: 70%;
    height:60%;
    margin-left: 15%;
    padding-top:5%;
    margin:0 auto;
    .release_paper_title{
      width: 100%;
      border-bottom: 1px solid #999;
      text-align: left;
      span{
        font-size: 16px;
        padding-bottom:.5%;
        font-weight: bold;
        border-bottom: 4px solid #ff462c;
        letter-spacing:2px;
      }
    }
    .release_paper_mes{
      width: 100%;
      height:100%;
      display: flex;
      margin-top: 3%;
      .mes_left{
        width: 70%;
        height:100%;
        .release_paper_date{
          position: relative;
          .time{
            position: absolute;
            right:-100px;
            font-size: 15px;
            top:15%;
            color:red;
          }
        }
        p{
          width: 65%;
          text-align: right;
          margin-top: 2%;
          input{
            width: 200px;
            height:24px;
            border:1px solid black;
            font-size: 16px;
            margin-left:2%;
          }
          input::-webkit-input-placeholder{
            font-size: 14px;
            color:#ccc;
          }
        }
        .amount{
          padding-right:8.7%;
          box-sizing: border-box;
          input{
            width: 100px;
          }
        }
        .obtain{
          width: 100%;
          text-align: center;
          margin-top: 10%;
          button{
            width:150px;
            height:40px;
            background: #fc4027;
            color:white;
            font-size: 16px;
            border-radius: 5px;
          }
        }
      }
      .mes_right{
        width: 30%;
        height:100%;
        .paper_is{
          width: 50%;
          height:40%;
          background: #f7f7f7;
          padding-top:13%;
          position: relative;
          img{
            width: 30%;
            height:40%;
          }
          input{
            width: 100%;
            height:100%;
            position: absolute;
            top:0;
            left:0;
            cursor:pointer;
            opacity: 0;
          }
        }
        .paper_the{
          width: 50%;
          height:40%;
          background: #f7f7f7;
          padding-top:13%;
          margin-top: 10%;
          position: relative;
          img{
            width: 30%;
            height:40%;
          }
          input{
            width: 100%;
            height:100%;
            position: absolute;
            top:0;
            left:0;
            cursor:pointer;
            opacity: 0;
          }
        }
      }
    }
    .service{
      position: relative;
      // background: red;
      margin-top:3%;
      position: relative;
      input{
        position: absolute;
        top:-6%;
        left:42%;
        min-height: 21px;
      }
    }
    .submit{
      width:100%;
      height:40px;
      margin-top:3%;
      button{
        width: 26%;
        height:100%;
        background: linear-gradient(180deg,rgba(254,116,79,1),rgba(252,64,39,1));
        color:white;
        font-size: 16px;
        border-radius:8px;
      }
    }
  }
  .release_paper_mask{
    width: 100%;
    height:100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    top:0;
    left:0;
    z-index: 500;
  }
  .release_paper_prompt{
    width: 30%;
    height:30%;
    background: white;
    position: absolute;
    top:15%;
    left:50%;
    margin-left:-15%;
    z-index: 501;
    transition: all .5s;
    opacity: 0;
    display: none;
    .logo{
      width: 150px;
      height:70px;
      position: absolute;
      left:2%;
      top:5%;
      img{
        width: 100%;
        height:100%;
      }
    }
    .release_paper_title{
      width: 100%;
      height:60%;
      line-height: 300px;
      color:#666666;
    }
    .release_paper_opera{
      width: 100%;
      padding-top:8%;
      button{
        min-height: 36px;
        min-width: 141px;
        border-radius:5px;
        color:white;
        background: linear-gradient(180deg,rgba(254,126,89,1),rgba(252,72,45,1));
        margin-right: 20px;
      }
    }
  }
}
</style>
