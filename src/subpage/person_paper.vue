  <!-- 用户发布的票据 -->
<!-- 卖家页面 已报价未报价 -->
<template lang="html">
  <div class="person_paper">
    <!-- banner图 -->
    <div class="person_paper_pic">
      <img src="../../static/img/qiu.png" alt="">
    </div>
    <!--<p class="person_paper_num">该票据已通知<span>13</span>个票据买家，请耐心等待买家报价</p>-->
    <!--<p class="person_paper_table">
      <router-link
        to="/release/paper/offerIn" tag="span"
        @click.native="offerIn()"
        :class="{paperAc:color==1}"
      >全部报价</router-link>
      <person-offerIn @click.native="offerIn()"
      :class="{paperAc:color==1}"
      >报价</person-offerIn>
      <person-offerin v-bind:billNum = "billNum" tag="span" @transb="getBillNum" :class="{paperAc:color==1}" >全部报价</person-offerin>
      <router-link
        to="/release/paper/offerBe" tag="span"
        @click.native="offerBe()"
        :class="{paperAc:color==2}"
      >审核中</router-link>
    </p> -->
    <!-- <div class="hadRelease">
      <router-view></router-view>
    </div> -->

    <!-- 切换全部报价和审核中 -->
    <div  class="person_paper_table" >
      <div class="table_w_1">
        <button
          v-for="tab in tabs"
          v-bind:key="tab"
          v-bind:class="['tab-button', { active: currentTab === tab }]"
          v-on:click="currentTab = tab"
        >{{ names[tab] }}</button>
        </div>

      <person-offerin
        v-bind:is="currentTabComponent"
        class="tab"  v-bind:billNum = "billNum" @transb="getBillNum"
      ></person-offerin>

      <!-- <person-offerbe v-bind:is="currentTabComponent" 
        class="tab" v-bind:billNum = "billNum" @transb = "getBillNum" ></person-offerbe>
         -->
    </div>
    

    <!-- 右边的已报价和未报价的 -->
    <div class="yibao_w" v-if="color == 1 && currentTab == 'offerin' " >
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
            <el-col :span="4"><div class="hadOffer_mes" id="page_w" style="border-right:1px solid #979797; margin-top: 6px;">{{item.billType}}&nbsp;/&nbsp;{{item.billReferer}}</div></el-col>
            <el-col :span="4"><div class="hadOffer_mes" style="border-right:1px solid #979797; margin-top: 6px;">{{item.acceptor}}</div></el-col>
            <el-col :span="4"><div class="hadOffer_mes" style="border-right:1px solid #979797; margin-top: 6px;">{{item.amount}}</div></el-col>
            <el-col :span="4"><div class="hadOffer_mes" style="border-right:1px solid #979797; margin-top: 6px;">{{item.maturity}}</div></el-col>
            <el-col :span="4"><div class="hadOffer_mes" style="border-right:1px solid #979797; margin-top: 6px;">{{item.remain_days}}天</div></el-col>
            <el-col :span="4"><div class="hadOffer_mes limit">
              <span>年化：{{item.interest}}</span>
              <span>每10w加：{{item.xPerLakh}}</span>
            </div></el-col>
          </el-row>
          <p class="hadOffer_opera">
          <span>{{item.companyName}}</span>
          <span class="pople">{{item.contactsName}}</span>
          <span>电话:{{item.contactsPhone}}</span>
          <span @click="linkToA(index)"><a v-bind:href="linka" style="text-decoration:none">&nbsp;&nbsp;&nbsp;QQ咨询</a></span>
          <span>{{item.companyId}}</span>
          <button type="button" name="button" @click="paperMesper(item)">查看</button>
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

     <div class="yibao_w" v-if="color == 1 && currentTab == 'offerbe' " >
      <!-- <personOfferIn></personOfferIn> -->
     <!--  <p class="person_paper_tableB">
        <span :class="{HadAc:colorB==3}" @click="havOffer()">已报价<span></span></span>
        <span :class="{HadAc:colorB==4}" @click="notOffer">未报价<span></span></span>
      </p> -->
      <p class="person_paper_tableB">
        <span :class="{HadBc:colorB==3}">票据还未通过审核，请联系客服进行审核。客服电话：4008888888</span></p>
      <div class="hadOffer" v-show="hadOffer">
        
        <el-row>
          <el-col :span="4"><div class="hadOffer_title">票据类型</div></el-col>
          <!-- <el-col :span="4"><div class="hadOffer_title">票号</div></el-col> -->
          <el-col :span="4"><div class="hadOffer_title">承兑银行</div></el-col>
          <el-col :span="4"><div class="hadOffer_title">金额</div></el-col>
          <el-col :span="4"><div class="hadOffer_title">到期日</div></el-col>
          <el-col :span="4"><div class="hadOffer_title">剩余天数</div></el-col>
          <el-col :span="4"><div class="hadOffer_title">报价</div></el-col>
    <!--       <el-col :span="4"><div class="hadOffer_title">失败原因</div></el-col>
 -->          <!-- <el-col :span="4"><div class="hadOffer_title">{{billN}}</div></el-col> -->
          
        </el-row>

        <div class="person-offerIn" v-for = "item in noteL ">
          <el-row class="oferMes">

            <el-col :span="4"><div class="hadOffer_mes" id="page_w" style="border-right:1px solid #979797; margin-top: 6px;">{{item.billType}}&nbsp;/&nbsp;{{item.billReferer}}</div></el-col>
           <!--  <el-col :span="4"><div class="hadOffer_mes" id="page_w" style="border-right:1px solid #979797; margin-top: 6px;">{{item.billNumber}}</div></el-col> -->
            <el-col :span="4"><div class="hadOffer_mes" style="border-right:1px solid #979797; margin-top: 6px;">{{item.acceptor}}</div></el-col>

            <el-col :span="4"><div class="hadOffer_mes" style="border-right:1px solid #979797; margin-top: 6px;">{{item.amount}}</div></el-col>

            <el-col :span="4"><div class="hadOffer_mes" style="border-right:1px solid #979797; margin-top: 6px;">{{item.maturity}}</div></el-col>

            <el-col :span="4"><div class="hadOffer_mes" style="border-right:1px solid #979797; margin-top: 6px;">{{item.remain_days}}天</div></el-col>

            <el-col :span="4"><div class="hadOffer_mes limit">
              <span>年化：{{item.interest}}</span>
              <span>每10w加：{{item.failReason}}</span>
            </div></el-col>
          </el-row>

          <p class="hadOffer_opera">
            <span>{{item.companyName}}</span>
          <span class="pople">{{item.contactsName}}</span>
          <span>电话:{{item.contactsPhone}}</span>
          
          <span @click="linkToA(index)"><a v-bind:href="linka" style="text-decoration:none">&nbsp;&nbsp;&nbsp;QQ咨询</a></span>
            <span>{{item.companyId}}</span>
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
  import personOfferbe from '@/subpage/person_offerBe'
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
        tabs: ['offerin', 'offerbe'],
        names:[],
        linka:"tencent://message/?uin=11577851&Site=pengpengpiao.cn&Menu=yes"
      }
    },
    components:{
      personOfferin,
      personOfferbe
    },
    /*props:{
      'noteL':[Array]
    },*/
    computed: {
    currentTabComponent: function () {
      /*"offerin":"全部报价","offerbe":"审核中"*/
      this.names["offerin"] = "全部报价"
      this.names["offerbe"] = "审核中"
      
      return 'person-' + this.currentTab.toLowerCase()
      
    }
  },
    methods:{
      offerIn(){
        this.color=1;
        console.log("offerin ")
        console.log(this.noteL)
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
        
        _this.axios.post(this.oUrl+'/bills/getMyBillsQuoted',{
            "uuid":Id,
            "filter":2,
            "billNumber":_this.billNum
          },
          {
            headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          console.log(res)
          this.noteL = res.data
          _this.billN=res.data[0].billNumber;
        })
      },
      notOffer(){
        this.colorB=4;
        this.hadOffer=false;
        this.didOffer=true;
        let _this=this;
        let Id=getCookie('Iud');
        console.log("billnumer is :")
        console.log(_this.billNum)
        
        _this.axios.post(this.oUrl+'/bills/getMyBillsQuoted',{
            "uuid":Id,
            "filter":4,
            "billNumber":_this.billNum
          },
          {
            headers:{
              'Content-Type':'application/json'
            }}
        ).then((res)=>{
          console.log(res)
          this.noteL = res.data
          _this.billN=res.data[0].billNumber;
        })
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
      paperMesper(item){//查看票据详情
        console.log("paper detail info  item")
        console.log(item)
        this.$router.push({
          name:'choseType',
          query:{
            bills:this.billN,
            quoterId:item.quoterId
          }
        })
      },
      getBillNum(billNumber){
        //this.billN = this.billN+1;
      console.log("get billNumber in .....")
      console.log(billNumber)
      this.billNum = billNumber
      this.havOffer()
    }
    },
    
    created(){
      this.names["offerin"] = "全部报价"
      this.names["offerbe"] = "审核中"
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
  .HadBc{
    background: #F15749;
    color: #fff;
    height: 45px;
    line-height: 45px;
    text-align: left;
    font-weight: bold;
    width: 99%;
    padding-left: 10px;
  }
  .person_paper{
    width: 100%;
    height:100%;
    .person_paper_pic{
      width: 100%;
      height: 8%;
      text-align: left;
      img{
          height: 80px;
          width: 99%;
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
      width: 100%;
     
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
      width: 100%;
      margin-top:4%;

      .hadOffer_title{
        min-height: 34px;
        line-height: 34px;
        font-size: 16px;
        background: #F15749;
        color: #fff;
        font-family: bold;
      }
      .hadOffer_title_short{
        min-height: 34px;
        line-height: 34px;
        font-size: 12px;
        width:60px;
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
      .hadOffer_validate_normal{
        height:40px;

        min-height: 50px;
        line-height: 50px;
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
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    width: 75%;
    z-index: 999;
    background: #fff;
    float: right;
    position: relative;
    top: -452px;
    left: -1%;
}

  .tab-button {
    width: 125px;
    height: 45px;
    padding: 6px 10px;
    cursor: pointer;
    margin-bottom: -1px;
    margin-right: -1px;
    background:#fff;
    color:#333;
    border-bottom:1px solid #F15749;
}
.tab-button.active {
  background: #F15749;
  font-size:17px;
  font-weight:bold;
  color:#fff;
}
.tab {
  padding: 10px;
}
.table_w_1{
  width: 253px;
   border-bottom:4px solid #F15749;
   margin-bottom:2px;
   z-index:999;
}
</style>
