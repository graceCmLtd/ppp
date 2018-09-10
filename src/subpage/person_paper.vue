<!-- 用户发布的票据 -->
<template lang="html">
  <div class="person_paper">
    <div class="person_paper_pic">
      <img src="../../static/img/qiu.png" alt="">
    </div>
    <!--<p class="person_paper_num">该票据已通知<span>13</span>个票据买家，请耐心等待买家报价</p>-->
    <p class="person_paper_table">
      <!-- <router-link
        to="/release/paper/offerIn" tag="span"
        @click.native="offerIn()"
        :class="{paperAc:color==1}"
      >全部报价</router-link> -->
      <!-- <person-offerIn @click.native="offerIn()"
      :class="{paperAc:color==1}"
      >报价</person-offerIn> -->
      <!-- <person-offerin v-bind:billNum = "billNum" tag="span" @transb="getBillNum" :class="{paperAc:color==1}" >全部报价</person-offerin> -->
      <!-- <router-link
        to="/release/paper/offerBe" tag="span"
        @click.native="offerBe()"
        :class="{paperAc:color==2}"
      >审核中</router-link> -->
    </p>
    <!-- <div class="hadRelease">
      <router-view></router-view>
    </div> -->
    <div  class="person_paper_table" >
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab"
      >{{ tab }}</button>

      <person-offerin
        v-bind:is="currentTabComponent"
        class="tab"  v-bind:billNum = "billNum" @transb="getBillNum"
      ></person-offerin>
    </div>
    
    <div class="yibao_w" v-if="color == 1" >
      <!-- <personOfferIn></personOfferIn> -->
      <p class="person_paper_tableB">
        <span :class="{HadAc:colorB==3}" @click="havOffer()">已报价<span></span></span>
        <span :class="{HadAc:colorB==4}" @click="notOffer">未报价<span></span></span>
      </p>
      <div class="hadOffer" v-show="hadOffer">
        <el-row>
          <el-col :span="4"><div class="hadOffer_title">票据类型</div></el-col>
          <el-col :span="4"><div class="hadOffer_title">承兑银行</div></el-col>
          <el-col :span="4"><div class="hadOffer_title">金额</div></el-col>
          <el-col :span="4"><div class="hadOffer_title">到期日</div></el-col>
          <el-col :span="4"><div class="hadOffer_title">剩余天数</div></el-col>
          <el-col :span="4"><div class="hadOffer_title">报价</div></el-col>
          <!-- <el-col :span="4"><div class="hadOffer_title">{{billN}}</div></el-col> -->
          
        </el-row>
        <div class="person-offerIn" v-for = "item in noteL ">
          <el-row class="oferMes">
            <el-col :span="4"><div class="hadOffer_mes" id="page_w" style="border-right:1px solid #979797; margin-top: 6px;">{{item.billType}}</div></el-col>
            <el-col :span="4"><div class="hadOffer_mes" style="border-right:1px solid #979797; margin-top: 6px;">{{item.acceptor}}}</div></el-col>
            <el-col :span="4"><div class="hadOffer_mes" style="border-right:1px solid #979797; margin-top: 6px;">644w</div></el-col>
            <el-col :span="4"><div class="hadOffer_mes" style="border-right:1px solid #979797; margin-top: 6px;">{{item.maturity}}}</div></el-col>
            <el-col :span="4"><div class="hadOffer_mes" style="border-right:1px solid #979797; margin-top: 6px;">7天</div></el-col>
            <el-col :span="4"><div class="hadOffer_mes limit">
              <span>年化：</span>
              <span>每10w加：</span>
            </div></el-col>
          </el-row>

          <p class="hadOffer_opera">
            <span>北京海世界有限公司</span>
            <span>赵总</span>
            <span>13240891337</span>
            <button type="button" name="button" @click="paperMesper()">查看</button>
          </p>


        </div>
      </div>
      <div class="didOffer" v-show="didOffer">
        <el-row>
          <el-col :span="10"><div class="didOffer_title company">北京憧憬实业有限公司</div></el-col>
          <el-col :span="7"><div class="didOffer_title">尧经理</div></el-col>
          <el-col :span="7"><div class="didOffer_title">19895425446</div></el-col>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
  import {getCookie} from '@/assets/util'
  import personOfferin from '@/subpage/person_offerIn'
  export default {
    data(){
      return{
        color:1,
        colorB:3,
        hadOffer:true,
        didOffer:false,
        billN:'',
        billDetail:null,
        billNum:'',
        noteL:[Array],
        currentTab: 'offerin',
        tabs: ['offerin', 'offerbe']
      }
    },
    components:{
      personOfferin
    },
    /*props:{
      'noteL':[Array]
    },*/
    computed: {
    currentTabComponent: function () {
      return 'person-' + this.currentTab.toLowerCase()
    }
  },
    methods:{
      offerIn(){
        this.color=1;
        console.log("offerin ")
        console.log(this.noteL)
        //this.getBillNumber()
      },
      offerBe(){
        this.color=2;
      },
      havOffer(){
        this.colorB=3;
        this.hadOffer=true;
        this.didOffer=false;
        let _this=this;
        let Id=getCookie('Iud');
        console.log("billnumer is :")
        console.log(_this.billNum)
        console.log(billNum)
        /*this.axios.get(this.oUrl+'/quote/getByBillNumber?billNumber='+_this.billNum).then((res)=>{
          console.log("yibaojia")
          console.log(res)
          //_this.billN=res.data[0].billNumber;
        })*/
        _this.axios.post(this.oUrl+'/bills/getMyBillsQuoted',{
            "uuid":Id,
            "filter":1
          },
          {
            headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          //console.log(res)
          _this.billN=res.data[0].billNumber;
        })
      },
      notOffer(){
        this.colorB=4;
        this.hadOffer=false;
        this.didOffer=true
      },
      getBills(){
        let _this=this;
        let Id=getCookie('Iud');
        _this.axios.post(this.oUrl+'/bills/getMyBillsQuoted',{
            "uuid":Id,
            "filter":1
          },
          {
            headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          //console.log(res)
          _this.billN=res.data[0].billNumber;
        })
      },
      paperMesper(){//查看票据详情
        this.$router.push({
          name:'choseType',
          query:{
            bills:this.billN
          }
        })
      },
      getBillNum(billNum){
        //this.billN = this.billN+1;
      console.log("get billNumber in .....")
      console.log(billNum)
      this.billNum = billNum
      this.havOffer()
    }
    },
    
    created(){
      this.getBills()
    }
  }
</script>

<style lang="scss" scoped>
  .paperAc{
    color:#ffffff;
    width:141px;
    height:50px;
    background:#F15749;
    text-align: center;
    line-height: 50px;
    font-weight: bold;
  }
  .HadAc{
    background: #F15749;
    color: #fff;
    width: 171px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-weight: bold;
  }

  .person_paper{
    width: 100%;
    height:100%;
    .person_paper_pic{
      width: 100%;
      height: 8%;
      margin-top: 2%;
      text-align: left;
      margin-left: 1%;
      img{
        width: 1096px;
        height: 80%;
        margin-left: -54px;
      }
    }
    .person_paper_num{
      width: 90%;
      color:#FF0000;
      margin-top: 4%;
      font-size: 17px;
      position: relative;
      top: 48px;
      left: 203px;
    }
    .person_paper_table{
      width: 300px;
      margin-left: 1%;
      text-align: left;
      border-bottom: 1px solid #F15749;
      margin-top: 2%;
      span{
        /*color:#3C3C3C;*/
        font-size: 17px;
        cursor:pointer;
      }
      span:nth-child(2){
        margin-left:66px;
      }
    }
    .person_paper_tableB{
      width: 90%;
      margin-left: 4%;
      text-align: left;
      border-bottom: 1px solid #F15749;
      /*margin-top: 12%;*/

      span{
        font-size: 17px;
        cursor:pointer;
      }
      span:nth-child(2){
        margin-left: 86px;
      }
    }
    .hadOffer{
      width: 90%;
      margin-left:4%;
      margin-top:4%;

      .hadOffer_title{
        min-height: 34px;
        line-height: 34px;
        font-size: 16px;
        background: #F15749;
        color: #fff;
        font-family: bold;
      }
      .oferMes:nth-of-type(even){
        background: #f7f7f7;
      }
      .hadOffer_mes{
        height:70px;
        min-height: 70px;
        line-height: 70px;
        font-size: 14px;
      }
      .limit{
        line-height: 0;
        display: flex;
        flex-direction: column;
        span{
          width: 100%;
          height:35px;
          line-height: 35px;
        }
      }
      .hadOffer_opera{
        width: 100%;
        height: 51px;
        line-height: 57px;
        font-size: 14px;
        text-align: center;
        background: #EFF8FF;
        position: relative;
        margin-top: 8px;
        span:nth-child(1){
          margin-left: -80px;
        }
        span:nth-child(2){
          margin-left:50px;
          margin-right: 50px;
        }
        button{
          width: 70px;
          min-height: 26px;
          position: absolute;
          right:2%;
          top:30%;
          background: #F15749;
          border-radius: 5px;
          color:white;
        }
      }
    }
    .didOffer{
      width: 90%;
      margin-left:4%;
      margin-top:4%;
      .didOffer_title{
        min-height: 30px;
        line-height: 30px;
        font-size: 16px;
      }
      .company{
        text-align: left;
        padding-left:25%;
      }
    }
  }
  .yibao_w{
    position: relative;
    top: -294px;
    left: 315px;
    /*border: 1px solid;*/
    box-shadow:0px 2px 10px 0px rgba(0,0,0,0.2);
  }
  .tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
