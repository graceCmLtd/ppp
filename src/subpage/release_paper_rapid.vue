<template lang="html">
  <div class="release_paper_rapid">
    <div class="fill_mes">
      <ul class="tit">
        <li>票据类型</li>
        <li>票据正面</li>
        <li>票据反面</li>
        <li>手机号</li>
        <li>短信验证码</li>
      </ul>
      <ul class="alt">
        <li>
          <select class="" name="">
            <option value="">纸银</option>
            <option value="">电银</option>
          </select>
        </li>
        <li class="Is">
          <input type="file" accept="image/jpg" name="" value="">
        </li>
        <li class="The">
          <input type="file" accept="image/jpg" name="" value="">
        </li>
        <li style="margin-top:5%;">
          <input type="text" name="" value="">
        </li>
        <li style="margin-top:6%;">
          <input type="text" name="" value="">
          <span>获取验证码</span>
        </li>
      </ul>
    </div>
    <p class="release_rapid">
      <button type="button" name="button" @click="rapidRelease()">发布</button>
    </p>
    <div class="release_rapid_mask" v-show="rapidMask" @click="closeRele()" >

    </div>
    <div class="release_rapid_prompt" ref="release_rapid_prompt">
      <img src="../../static/img/Logo.png" alt="">
      <p class="srapid_prompt_uccess">发布成功</p>
      <p>客服将尽快与您联系</p>
      <p class="srapid_prompt_chose">
        <button type="button" name="button" @click="closeRele()">确定</button>
        <button type="button" name="button">发布票据给更多买家</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      rapidMask:false
    }
  },
  methods:{
    rapidRelease(){
      this.rapidMask=true;
      this.$refs.release_rapid_prompt.style.display='block';
      setTimeout(()=>{
        this.$refs.release_rapid_prompt.style.opacity='1';
        this.$refs.release_rapid_prompt.style.top='30%';
      })
    },
    closeRele(){
      this.$refs.release_rapid_prompt.style.opacity='0';
      this.$refs.release_rapid_prompt.style.top='15%';
      setTimeout(()=>{
        this.rapidMask=false;
        this.$refs.release_rapid_prompt.style.display='none';
      },200)
    }
  }
}
</script>

<style lang="scss" scoped>
.release_paper_rapid{
  width: 100%;
  height:100%;
  font-size: 15px;
  padding-top:6%;
  min-width: 900px;
  .fill_mes{
    width: 100%;
    display: flex;
    .tit{
      width: 50%;
      text-align: left;
      li{
        padding-left:70%;
        margin-bottom: 8%;
      }
      li:nth-child(3){
        margin-top: 33%;
      }
      li:nth-child(4){
        margin-top: 33%;
      }
    }
    .alt{
      width: 50%;
      text-align: left;
      li{
        select{
          width: 40%;
          outline: none;
          min-height: 24px;
        }
        input{
          width: 40%;
          border:1px solid #ccc;
          min-height: 22px;
          font-size: 15px;
        }
      }
      li:last-child{
        position: relative;
        input{
          width: 25%;
        }
        span{
          width: 14%;
          padding-left:.5%;
          box-sizing: border-box;
          font-size: 12px;
          background:linear-gradient(180deg,rgba(255,120,83,1),rgba(255,67,41,1));
          min-height: 24px;
          line-height: 24px;
          margin-top: -1%!important;
          border-radius:3px;
          color:white;
          cursor:pointer;
          position: absolute;
          right:60%;
          top:20%;
        }
      }
      .Is{
        width: 150px;
        height:150px;
        background-color: #ccc;
        margin-top: 7%;
        input{
          width: 100%;
          height:100%;
          cursor:pointer;
          opacity: 0;
        }
      }
      .The{
        width: 150px;
        height:150px;
        background-color: #ccc;
        margin-top: 5%;
        input{
          width: 100%;
          height:100%;
          cursor:pointer;
          opacity: 0;
        }
      }
    }
  }
  .release_rapid{
    button{
      min-width: 36%;
      min-height: 34px;
      background:linear-gradient(180deg,rgba(255,121,86,1),rgba(254,68,43,1));
      color:white;
      border-radius: 8px;
      margin-left: 5%;
    }
  }
  .release_rapid_mask{
    width: 100%;
    height:100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    top:0;
    left:0;
    z-index: 500;
  }
  .release_rapid_prompt{
    width: 500px;
    height:250px;
    position: absolute;
    top:15%;
    margin-left: -250px;
    left:50%;
    background: white;
    z-index: 501;
    opacity: 0;
    display: none;
    transition: all .5s;
    img{
      width: 150px;
      height:60px;
      position: absolute;
      left:2%;
      top:5%;
    }
    p{
      color:#FF0000;
    }
    .srapid_prompt_uccess{
      margin-top:20%;
      font-size: 20px;
    }
    .srapid_prompt_chose{
      width: 100%;
      margin-top:6%;
      padding-left:5%;
      button{
        min-height: 30px;
        border-radius:5px;
        background: linear-gradient(180deg,rgba(254,126,89,1),rgba(252,72,45,1));;
        color:white;
      }
      button:nth-child(1){
        width: 80px;
        margin-right: 40px;
      }
      button:nth-child(2){
        margin-left: 10px;
      }
    }
  }
}
</style>
